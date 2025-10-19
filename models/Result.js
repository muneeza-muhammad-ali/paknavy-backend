// models/result.js
import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  studentName: String,
  resultFileUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
