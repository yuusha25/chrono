import dotenv from "dotenv";
import express from "express";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import setupAuthRoutes from "./src/routes/authGoogle.js";
import manualAuthRoutes from "./src/routes/authManual.js";
import userRoutes from "./src/routes/userRoutes.js";

dotenv.config();

// Koneksi ke MongoDB
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error:", error));

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Middleware untuk parsing JSON
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup auth routes
setupAuthRoutes(app);

// Rute manual auth
app.use("/auth", manualAuthRoutes);

app.use("/api", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
