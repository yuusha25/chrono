import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Route untuk mendapatkan semua pengguna
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving users", error });
  }
});

// Route untuk mendapatkan pengguna berdasarkan ID
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user", error });
  }
});



// Update username
router.put("/update-username", async (req, res) => {
  const { userId, username } = req.body;

  if (!userId || !username) {
    return res.status(400).json({ message: "User ID and username are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update username
    user.username = username;
    await user.save();

    res.status(200).json({ username: user.username });
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate username error
      return res.status(409).json({ message: "Username is already taken" });
    }
    console.error("Error updating username:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
