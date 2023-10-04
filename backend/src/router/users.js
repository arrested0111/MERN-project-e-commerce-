import express from "express"
import userController from "../controller/usercontroller.js"
import Uploads from "../midddleware/uploads.js";

let userRouter = express.Router()
let uploadInstance = new Uploads()
let upload = uploadInstance.fileUpload('uploads/users')

let userInstance = new userController();


userRouter.get("/", userInstance.index);
userRouter.post("/",upload.single('image'),userInstance.store);


export default userRouter;