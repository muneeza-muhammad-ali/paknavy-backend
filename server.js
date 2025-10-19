import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import Cnic from "./models/cnic.js";  // aapka existing model
import Result from "./models/Result.js"; // new Result model

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/results", express.static(path.join(__dirname, "results"))); // static serve results PDFs

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Mongo error:", err));

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// User model
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
});
const User = mongoose.model("User", UserSchema);

// -------------- IPAS FORM MODEL --------------
const qualificationSchema = new mongoose.Schema({
  qualification: String,
  rollNo: String,
  certificateNo: String,
  board: String,
  passingYear: String,
  resultStatus: String,
  gpa: String,
  regNo: String,
  marksObtained: String,
  totalMarks: String,
  percentage: String,
});

const ipasFormSchema = new mongoose.Schema({
  testCenter: String,
  rollNo: String,
  candidateName: String,
  candidateCNIC: String,
  motherName: String,
  motherCNIC: String,
  fatherName: String,
  fatherCNIC: String,
  dob: String,
  gender: String,
  fatherProfessionCategory: String,
  motherProfessionCategory: String,
  fatherProfession: String,
  motherProfession: String,
  fatherRank: String,
  motherRank: String,
  fatherArmyNo: String,
  motherArmyNo: String,
  fatherIncome: String,
  motherIncome: String,
  familyIncome: String,
  servingStatus: String,
  address: String,
  province: String,
  appearanceStatus: String,
  tehsil: String,
  qualifications: [qualificationSchema],
  agreed: Boolean,
}, { timestamps: true });

const IPASForm = mongoose.model('IPASForm', ipasFormSchema);

// -------------- ROUTES --------------

// User registration
app.post("/api/register", upload.single("image"), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      image: req.file ? req.file.filename : null,
    });

    await newUser.save();

    res.json({ success: true, message: "User registered", user: newUser });
  } catch (err) {
    console.error("❌ Error in /api/register:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// CNIC submission
app.post("/api/submit-cnic", async (req, res) => {
  const { cnic } = req.body;
  const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  if (!cnic || !cnicPattern.test(cnic)) {
    return res.status(400).json({ success: false, message: "Invalid CNIC format" });
  }

  try {
    const existing = await Cnic.findOne({ cnic });
    if (existing) {
      return res.status(400).json({ success: false, message: "CNIC already exists" });
    }

    const newCnic = new Cnic({ cnic });
    await newCnic.save();

    console.log("CNIC saved:", cnic);
    res.json({ success: true, message: "CNIC saved successfully" });
  } catch (error) {
    console.error("Error saving CNIC:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Result file download by roll number
app.get("/api/download-result", async (req, res) => {
  const { rollNumber } = req.query;

  if (!rollNumber) {
    return res.status(400).json({ success: false, message: "Roll number required" });
  }

  try {
    const result = await Result.findOne({ rollNumber });

    if (!result || !result.resultFileName) {
      return res.status(404).json({ success: false, message: "Result file not found" });
    }

    const filePath = path.join(__dirname, "results", result.resultFileName);

    // File check
    res.download(filePath, `${rollNumber}_result.pdf`, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).json({ success: false, message: "Error downloading file" });
      }
    });
  } catch (error) {
    console.error("Error fetching result:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// -------------- IPAS FORM SUBMISSION ROUTE --------------
app.post('/api/ipassubmit', async (req, res) => {
  try {
    const formData = req.body;

    if (!formData.agreed) {
      return res.status(400).json({ error: 'You must agree to the affirmation.' });
    }

    const newForm = new IPASForm(formData);
    await newForm.save();

    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ error: 'Server error while saving form.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
