import { Router } from "express";
import User from "../models/databaseSchema.js";
import upload from "../middleware/upload.js";

const router = Router();


//get signup
router.get("/signup", (req, res) => {
    res.render("signup", { successMessage: null, errorMessage: null });
})
//get login
router.get("/login", (req, res) => {
    res.render("login", { errorMessage: null })
})

//get home 
router.get("/home", (req, res) => {
    res.render("home", {
        profilePic: null, // or some default path like "/uploads/default.jpg"
    });
});


// POST /api/signup
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("Received body:", req.body);

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.render("signup", {
                errorMessage: "Email is already taken",
                successMessage: null
            });
        }

        const createUser = new User({ username, email, password });
        await createUser.save();

        res.render("signup", { successMessage: "User created successfully", errorMessage: null });
    } catch (error) {
        console.error("Error in /signup:", error);
        res.status(500).send("Server error.");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
        return res.render("login", {
            errorMessage: "Invalid email or password",
        });
    }

    // Check if the password matches the one stored in the database
    if (user.password !== password) {
        return res.render("login", {
            errorMessage: "Invalid email or password",
        });
    }
    res.render("home", { email, profilePic: '/uploads/default.jpg' });
})



router.post("/upload-profile-pic", upload.single("profilePic"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const profilePicPath = "/uploads/" + req.file.filename;

    // You could store profilePicPath in your database here

    // For now, redirect back to homepage and show the image
    res.render("home", {
        email: "user@example.com", // Replace with actual session user
        profilePic: profilePicPath,
    });
});



export default router;
