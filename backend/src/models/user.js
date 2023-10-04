import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


let usersSchema = new mongoose.Schema(  {
  name: {
    type: String,
    required: true
},
username: {
    type: String,
    required: true,
    unique: true
},
email: {
    type: String,
    required: true,
    unique: true
},
gender: {
    type: String,
    enum: ['male', 'female'],
    required: true
},
password: {
    type: String,
    required: true
},

language: {
    type: [String],
    required: true
},
country: {
    type: String,
    required: true
},

role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
},
image: {
    type: String,
},
status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive"
},
createdAt: {
    type: Date,
    default: Date.now
},
updatedAt: {
    type: Date,
    default: Date.now
}
 }, {

  versionKey:false



 });
 usersSchema.pre("save", async function(next){
  if(!this.isModified("password")){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password,salt)
 });
 usersSchema.methods.matchpassword = async function(enteredpassword){
  return await bcrypt.compare(enteredpassword,this.password);
 }

 usersSchema.methods.getSignedJwtToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE_IN
  })
 }

 usersSchema.methods.toJSON=function(){
  let obj = this.toObject();
  delete obj.password;
  return obj;
 }


export default mongoose.model('user',usersSchema);