const bcrypt = require("bcrypt");
const User = require("../models/user.model");

//signup route handler
exports.signup = async (req, res) => {
    try {
        //recieve datafrom the body of request
        const { name, email, password, role } = req.body;
        //check if user already exist
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json(
                {
                    success: false,
                    message: "user already exist"
                }
            )
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json(
                {
                    success: false,
                    message: error.message
                }
            )
        }

        //create entry for user
        const user = await User.create(
            {
                name, email, password: hashedPassword, role
            }
        )

        return res.status(200).json(
            {
                success: true,
                message: "user created"
            }
        )


    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json(
            {
                success: false,
                message: "user cannot be registered. Please try again later"
            }
        )
    }
}