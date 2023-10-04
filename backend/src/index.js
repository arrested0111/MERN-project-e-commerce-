import http from "http"
import express from "express"
import dotenv from "dotenv"
import webRouter from "./router/index.js";
import Connection from "./config/connection.js";
import cors from "cors";
import Seeder from "./seeder/index.js";



dotenv.config();


const app = express()
const server = http.createServer(app)


app.use(express.static('public'));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())


Connection().then((res)=>{
  console.log(res.message);
}).catch((err)=>{
  console.log(err.message)
})

new Seeder().run()

app.use("/", webRouter)






let port = process.env.PORT || 9000



server.listen(port,()=>{
  console.log(`server running on port ${port}`)
})