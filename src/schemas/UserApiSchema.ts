import mongoose from "mongoose"

const user = new mongoose.Schema(
  {
    
    
    user: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    
    
  }
)

const userSchema = mongoose.model("users", user)

export default userSchema