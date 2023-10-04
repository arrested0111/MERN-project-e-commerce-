import Authcontroller from "../controller/auth/AuthController.js";
import express from "express";

let authRouter= express.Router();
let aInstance = new Authcontroller();
let authconroller = new Authcontroller();


authRouter.get("/",authconroller.getAuthUser);
authRouter.get("/login-user", authconroller.getLoginUser)
authRouter.post("/",aInstance.login)
authRouter.post('/reset-password', aInstance.resetPassword);
authRouter.post('/reset-password-confirm', aInstance.resetPasswordConfirm);


export default authRouter;