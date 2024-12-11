import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
        },
        fullName:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
            minLength: 6,
        },
        profilePic:{
            type: String,
            default: "",
        },
    },
    { timestamp: true}
);

const User = mongoose.model("User",userSchema);

export default User;  
/*<-- here the "User" will be singular with first letter capital otherwise mongodb won't Allow inside model  
1.User -->correct
2.user -->incorrect
3.users -->incorrect
*/
   
 