const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();

app.use(cors());
app.use(express.json());

// Replace with your own MongoDB connection string
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/kit_circle";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// ==================== MODELS ====================

const lecturerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetOtp: { type: String, default: null },
    resetOtpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

// Hash password before saving
lecturerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Lecturer = mongoose.model("Lecturer", lecturerSchema);

const noteSchema = new mongoose.Schema(
  {
    branch: { type: String, required: true }, // e.g. "cse"
    year: { type: String, required: true }, // e.g. "1st Year"
    subject: { type: String, required: true },
    module: { type: String, required: true }, // e.g. "Module 1"
    title: { type: String, required: true },
    link: { type: String, required: true }, // URL to PDF / resource
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Lecturer", required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

// ==================== MIDDLEWARE ====================

// Auth middleware to protect routes
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const lecturer = await Lecturer.findById(decoded.id).select("-password");
    
    if (!lecturer) {
      return res.status(401).json({ error: "Invalid token." });
    }

    req.lecturer = lecturer;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
};

// ==================== AUTH ROUTES ====================

// Register new lecturer
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    // Check if email already exists
    const existingLecturer = await Lecturer.findOne({ email });
    if (existingLecturer) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const lecturer = await Lecturer.create({ name, email, password });
    const token = jwt.sign({ id: lecturer._id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      token,
      lecturer: { id: lecturer._id, name: lecturer.name, email: lecturer.email },
    });
  } catch (err) {
    console.error("POST /api/auth/register error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Failed to register" });
  }
});

// Login lecturer
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const lecturer = await Lecturer.findOne({ email });
    if (!lecturer) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, lecturer.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: lecturer._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      lecturer: { id: lecturer._id, name: lecturer.name, email: lecturer.email },
    });
  } catch (err) {
    console.error("POST /api/auth/login error:", err);
    res.status(500).json({ error: "Failed to login" });
  }
});

// Request password reset (generate OTP)
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const lecturer = await Lecturer.findOne({ email });
    if (!lecturer) {
      // Don't reveal if email exists for security
      return res.json({ message: "If email exists, OTP will be sent" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    lecturer.resetOtp = otp;
    lecturer.resetOtpExpiry = expiry;
    await lecturer.save();

    // In production, send OTP via email service (nodemailer, etc.)
    console.log(`OTP for ${email}: ${otp}`); // For development only

    res.json({ message: "OTP sent to email (check console for dev)" });
  } catch (err) {
    console.error("POST /api/auth/reset-password error:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP
app.post("/api/auth/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const lecturer = await Lecturer.findOne({ email });
    if (!lecturer || lecturer.resetOtp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (lecturer.resetOtpExpiry < new Date()) {
      return res.status(401).json({ error: "OTP expired" });
    }

    // OTP verified, allow password reset
    res.json({ message: "OTP verified" });
  } catch (err) {
    console.error("POST /api/auth/verify-otp error:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// Set new password after OTP verification
app.post("/api/auth/set-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ error: "Email, OTP, and new password are required" });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const lecturer = await Lecturer.findOne({ email });
    if (!lecturer || lecturer.resetOtp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    if (lecturer.resetOtpExpiry < new Date()) {
      return res.status(401).json({ error: "OTP expired" });
    }

    // Update password and clear OTP
    lecturer.password = newPassword;
    lecturer.resetOtp = null;
    lecturer.resetOtpExpiry = null;
    await lecturer.save();

    res.json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("POST /api/auth/set-password error:", err);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

// ==================== NOTES ROUTES ====================

// Health check
app.get("/", (req, res) => {
  res.json({ ok: true });
});

// Get notes with optional filters: branch, year, subject, module (public)
app.get("/api/notes", async (req, res) => {
  try {
    const { branch, year, subject, module } = req.query;
    const filter = {};

    if (branch) filter.branch = branch;
    if (year) filter.year = year;
    if (subject) filter.subject = subject;
    if (module) filter.module = module;

    const notes = await Note.find(filter)
      .populate("addedBy", "name email")
      .sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("GET /api/notes error:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Create a new note (protected - requires authentication)
app.post("/api/notes", authenticateToken, async (req, res) => {
  try {
    const { branch, year, subject, module, title, link } = req.body;

    if (!branch || !year || !subject || !module || !title || !link) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const note = await Note.create({
      branch,
      year,
      subject,
      module,
      title,
      link,
      addedBy: req.lecturer._id,
    });

    const populatedNote = await Note.findById(note._id).populate("addedBy", "name email");
    res.status(201).json(populatedNote);
  } catch (err) {
    console.error("POST /api/notes error:", err);
    res.status(500).json({ error: "Failed to create note" });
  }
});

// Delete a note (protected - requires authentication)
app.delete("/api/notes/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Optional: Only allow lecturer who added it to delete (or any authenticated lecturer)
    // Uncomment below if you want only the creator to delete:
    // if (note.addedBy.toString() !== req.lecturer._id.toString()) {
    //   return res.status(403).json({ error: "Not authorized to delete this note" });
    // }

    await Note.findByIdAndDelete(id);
    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/notes/:id error:", err);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
