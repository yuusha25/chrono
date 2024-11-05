import express from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/User.js"; // Import model User
import { sendVerificationEmail } from "../utils/emailService.js"; // Fungsi kirim email di file terpisah
import {
  validateSignupData,
  validateVerificationData,
} from "../utils/validators.js"; // Validasi data input

const router = express.Router();
const SALT_ROUNDS = 10;

// Fungsi untuk menghasilkan kode verifikasi unik
function generateVerificationCode() {
  return crypto.randomBytes(20).toString("hex");
}

// Rute untuk signup manual
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Validasi data input
  const validationErrors = validateSignupData(username, email, password);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Cek apakah email atau username sudah digunakan
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "Email sudah terdaftar." });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username sudah terdaftar." });
    }

    // Hash password pengguna
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Buat kode verifikasi
    const verificationCode = generateVerificationCode();

    // Simpan user baru di database dengan status belum terverifikasi
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      isVerified: false,
    });
    await newUser.save();

    // Kirim kode verifikasi ke email pengguna
    await sendVerificationEmail(email, verificationCode);

    res.status(201).json({
      message: "Akun berhasil dibuat. Cek email Anda untuk verifikasi.",
    });
  } catch (err) {
    console.error("Error during signup:", err);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

// Rute untuk verifikasi email
router.post("/verify-email", async (req, res) => {
  const { email, verificationCode } = req.body;

  // Validasi data input verifikasi
  const validationErrors = validateVerificationData(email, verificationCode);
  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  try {
    // Cari user berdasarkan email dan kode verifikasi
    const user = await User.findOne({ email, verificationCode });

    if (!user) {
      return res.status(400).json({
        message: "Kode verifikasi tidak valid atau sudah kadaluwarsa.",
      });
    }

    // Set status pengguna sebagai terverifikasi dan hapus kode verifikasi
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res.json({ message: "Email berhasil diverifikasi." });
  } catch (error) {
    console.error("Error during email verification:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
});

export default router;
