import express from "express";
import File from "../models/upload.js";

const router = express.Router();

router.get('/user-images', async (req, res) => {
  const username = req.query.username;
  try {
    const images = await File.find({ username });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving images' });
  }
});

export default router;
