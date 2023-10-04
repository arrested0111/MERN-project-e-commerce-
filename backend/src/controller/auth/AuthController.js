import Auth from "../../midddleware/auth.js";
import user from "../../models/user.js";
import ForgetPassword from "../../models/ForgetPassword.js";
import Mail from "../../config/mail.js"
import dotenv from "dotenv";




dotenv.config();


class Authcontroller{

  async getLoginUser(req, res) {
    const token = req.headers.authorization;
    if (token) {
        let response = Auth.verifyToken(token);
        if (response) {
            let users = await user.findOne({_id: response.id});
            res.status(200).json({
                success: true,
                user: users
            });

        } else {
            res.status(200).json({
                error: "Token is not valid"
            });
        }
    }
}



async getAuthUser(req, res) {
    const token = req.headers.authorization;
    if (token) {
        let response = Auth.verifyToken(token);
        if (response) {
            res.status(200).json({
                success: true
            });

        } else {
            res.status(200).json({
                error: "Token is not valid"
            });
        }


    } else {
        res.status(200).json({
            error: "No token found"
        });
    }


}


  async login(req,res) {
   let {username ,password} =req.body;
   let users = await user.findOne({username:username});
   if(users){
    let isMatch = await users.matchpassword(password);
    if(isMatch){
      let token = await users.getSignedJwtToken()
      res.status(200).json({
        success: true,
        token:token,
        user:users
      });
    }else{
      res.status(200).json({error:"password is incorrect"})
    }

   }else{
    return res.status(200).json({error:"user not found"})
   }

    }

    async resetPassword(req, res) {
        let errorType = {
            email: '',
        }
        let {email} = req.body;
        let findData = await user.find({email: email}).countDocuments();
        if (findData > 0) {
            let isToken = await ForgetPassword.find({email: email}).countDocuments();
            console.log(isToken)
            if (isToken > 0) {
                errorType.email = "Email already sent";
                return res.status(200).json({error: errorType});
            }
            let mail = new Mail();
            let serverEmail = process.env.SMTP_EMAIL;
            let token = Math.floor(100000 + Math.random() * 900000);
            let message = `
            <h1>Reset Password</h1>
            <p>Click on the link to reset your password</p>
            <a href="http://localhost:3000/reset-confirm/${token}">Reset Password</a>
            `;
            mail.send(email, serverEmail, "Reset Password", message);
            await ForgetPassword.create({email: email, token: token});
            res.status(200).json({
                success: "Email sent successfully please check your email",
                error: ''
            });

        } else {
            errorType.email = "Email not found";
            res.status(200).json({error: errorType});
        }

    }

    async resetPasswordConfirm(req, res) {
        let {token, password} = req.body;
        let totalToken = await ForgetPassword.find({token: token}).countDocuments();
        let findEmailAndToken = await ForgetPassword.find({token: token});
        if (totalToken > 0) {
            let findUser = await user.findOne({email: findEmailAndToken[0].email});
            if (findUser) {
                findUser.password = password;
                await findUser.save();
                await ForgetPassword.deleteOne({token: token});
                res.status(200).json({success: "Password reset successfully"});
            } else {
                res.status(200).json({error: "User not found"});
            }

        } else {
            res.status(200).json({error: "Token not found"});
        }


    }

    
  }

export default Authcontroller;