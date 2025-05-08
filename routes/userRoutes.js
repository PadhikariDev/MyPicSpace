import { Router } from "express";
import User from "../models/databaseSchema.js";

const router = Router();


//get signup
router.get("/signup", (req, res) => {
    res.render("signup", { successMessage: null, errorMessage: null });
})
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


export default router;
