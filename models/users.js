import mongoose from "mongoose"
const UserSchema=new mongoose.Schema({
    UserName:String,
    UserEmail:String,
    Password:String,
    role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
}
})

export default mongoose.model("Users",UserSchema)