import { json } from "express";
import user from "../models/user.js"
import Auth from "../midddleware/auth.js";


class userController{

  async index(req, res) {

    const token = req.headers.authorization;
    if (token) {
        let response = Auth.verifyToken(token);
        if (response) {
            const users = await user.find();
            return res.json(users);
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

  



  async store(req, res){
    try{
      let imageName = '';
            if (req.file) {
                imageName = req.file.filename;
            }
            let username = req.body.username;
            let email = req.body.email;
            let errorType = {
                username: '',
                email: '',
            }
            let totalUserName = await user.find({username: username}).countDocuments();
            if (totalUserName > 0) {
                errorType.username = 'Username already exists';
            }
            let totalUserEmail = await user.find({email: email}).countDocuments();
            if (totalUserEmail > 0) {
                errorType.email = 'Email already exists';
            }
            if (errorType.username || errorType.email) {
                return res.status(200).json({error: errorType});
            }
     const users = await user.create({...req.body, image:imageName});
    return res.status(200).json({success:'user created successfully'});
    }catch(e){
      return res.status(400).json({error:e.message});
    }
   }

}
export default userController;