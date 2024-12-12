import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    //generating token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    //sending token to user cookie,the login will upto 7 days the token will expire after 7days
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days in millisecond
        httpOnly: true,  // prevent XSS attacks
        sameSite: "strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", //use secure cookies in production 
    });

    return token;
};