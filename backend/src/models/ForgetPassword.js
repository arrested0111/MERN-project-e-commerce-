import mongoose from "mongoose";

const ForgotPasswordSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
  
});

export default mongoose.model("ForgotPassword", ForgotPasswordSchema);