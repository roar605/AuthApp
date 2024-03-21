//auth , isStudent , isAdmin
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        //extract jwt token
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({
                success: true,
                message: "Token missing"
            })
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something while wrong"
        })
    }
}


exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Token is only for students"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "user role is not matching"
        })
    }
}


exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Token is only for admin"
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "user role is not matching"
        })
    }
}
