import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"                                         // after 7 days the user have to login again
    });

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,                        // converted ito miliseconds
        httpOnly: true,                                         // prevent XSS attacks cross-site scripting attacks
        sameSite: "strict",                                     // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development"
    });

    return token;
}

export default generateToken;