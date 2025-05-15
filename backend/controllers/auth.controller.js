import { User } from "../models/user.model.js";
import zod from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateToken } from "../lib/utils.js";
import { cloudinary } from "../lib/cloudinary.js";


const signupBody = zod.object({
    email: zod.string().email(),
    fullName: zod.string(),
    password: zod.string()
})

const signup = async (req, res) => {
    const { success, data } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const { email, password, fullName } = data;

    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already taken" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashedPassword,
            fullName
        });

        generateToken(user._id, res);

        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName,
                profilePic: user.profilePic
            }
        });

    } catch (err) {
        console.error("Signup error:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const { success } = loginBody.safeParse(req.body)
        if (!success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(411).json({
                message: "Email doesnt exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(411).json({
                message: " Email already taken / Incorrect inputs"
            })
        }

        generateToken(user._id, res)

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                profilePic: user.profilePic
            }
        })

    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "User logged out succefully" })
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export { signup, login, logout, updateProfile, checkAuth };