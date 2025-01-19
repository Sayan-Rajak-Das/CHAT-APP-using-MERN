import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the decoded user ID
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;  // Attach the user object to the request
        next();  // Proceed to the next middleware or route handler

    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
};

export default protectRoute;
