const express = require("express");
const router = express.Router();

const { login, signup } = require("../controllers/auth.controller.js");
const { auth, isStudent, isAdmin } = require("../middlewares/auth.middleware.js");

router.post("/login", login);
router.post("/signup", signup);


//testing middleware auth
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to testing route"
    })
})

//protected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected route of student"
    })
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected route of admin"
    })
})


module.exports = router;