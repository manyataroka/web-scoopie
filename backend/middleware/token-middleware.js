import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

//Middleware to verify JWT token
export function authenticateToken(req, res, next) {
    //Skip token verification for the login route
    if (req.path === '/login') {
        return next();
    }
    //Get the token from the Authorization header
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401)
        .send({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403)
            .send("Invalid or expired token.");
        }
    
        req.user = decoded; // Attach decoded payload to request object
        next(); // Proceed to the next middleware or route handler
    });
}