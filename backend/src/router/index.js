import express from 'express';
import userRouter from './users.js';
import authRouter from './auth.js';

let webRouter= express.Router()

// webRouter.get("/",(req, res)=>{
//   res.send("hello someone")
// });

webRouter.use("/user",userRouter)
webRouter.use("/auth",authRouter)




export default webRouter;