import nodemailer from "nodemailer";

// Konfigurasi transporter untuk Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, //  TLS
  secure: false,
  auth: {
    user: "chronocamm@gmail.com",
    pass: "PWEBJaya123",
  },
});

// Fungsi untuk mengirim email verifikasi
export async function sendVerificationEmail(email, verificationCode) {
  const verificationLink = `http://localhost:5173/verify-email?code=${verificationCode}`;

  const mailOptions = {
    from: '"Chronocam" chronocamm@gmail.com',
    to: email,
    subject: "Verifikasi Email Anda",
    text: `Halo,\n\nSilakan verifikasi email Anda dengan mengklik tautan berikut:\n${verificationLink}\n\nTerima kasih!`,
    html: `<p>Halo,</p><p>Silakan verifikasi email Anda dengan mengklik tautan berikut:</p><a href="${verificationLink}">Verifikasi Email</a><p>Terima kasih!</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email verifikasi berhasil dikirim ke ${email}`);
  } catch (error) {
    console.error("Error mengirim email:", error);
    throw new Error("Gagal mengirim email verifikasi");
  }
}
