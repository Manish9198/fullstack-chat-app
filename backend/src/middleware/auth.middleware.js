import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Middleware to protect routes and ensure only authenticated users can access them
export const protectRoute = async(req, res, next) => { 
    try{
         // Check if cookies are present
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({ message: "Unauthorized - No Token Provided"});    
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        }
        // Find the user in the database and exclude the password field
        const user = await User.findById(decoded.userId).select("-password");

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Attach the user object to the request object for use in the next middleware or route handler
        req.user =  user;

        next(); 
    } catch(error){
        console.log("Error in protectRoute middleware: ", error.message);
        res.status(500).json({ message: "Internal server error" });
    } 
};
