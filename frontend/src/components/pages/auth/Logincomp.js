import React from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver}from "@hookform/resolvers/yup";
import Frontendfooter from "../../layout/frontendfooter";
import Frontendheader from "../../layout/frontendheader";
import Frontendmenu from "../../layout/frontendmenu";
import { useLoginUserMutation } from "../../../store/reducer/authSlice";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";




let loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});



function Logincomp(){

  const [loginUser] = useLoginUserMutation();
  const {register, handleSubmit,formState:{errors}}= useForm({
    resolver:yupResolver(loginSchema)
  });

  
let rStyle = {
  color:"#f60000",
  }
     
  let loginForm = (data) => {
    loginUser(data).unwrap().then((response) => {
        if (response.success) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            window.location.href = "/admin";
      }else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'opps..',
          text: response.error,
          showConfirmButton: true,
          
        })
      }
      
     }).catch((error)=>{
      console.log(error);
     });

     }

    

  return(
    <>
    <React.Fragment></React.Fragment>
      <Frontendheader/>
      <Frontendmenu/>
      <div className="container">
        <div className="raw">
          <div className="col-md-12">
            <h1>Login page</h1>
            <hr/>
            <form action="" onSubmit={handleSubmit(loginForm)}>
     <div className="form-group mb-3">
      <label htmlFor="name">username:
      {errors.username&& <a style ={rStyle}>{errors.username.message}</a>}
      </label>
      <input type='text'

        {...register("username")}

      name="username" id="usernmae" className="form-control" placeholder="username" required/>
     </div>
     <div className="form-group mb-3">
      <label htmlFor="password">password:
      {errors.password && <a style ={rStyle}>{errors.password.message}</a>}
      </label>
      <input type='password'

        {...register("password")}

      name="password" id="password" className="form-control" placeholder="password" required/>
     </div>
     <div className="form-group mb-3">
      <button className="btn btn-success">Login</button>
      <Link to={"/reset-password"} className="btn btn-danger float-end">Forgot Password</Link>

     </div>

     </form>
          </div>
        </div>
      </div>
      <Frontendfooter/>
    </>
  )
}
export default Logincomp;