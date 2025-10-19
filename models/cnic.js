import mongoose from "mongoose";

const CnicSchema = new mongoose.Schema({
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Cnic = mongoose.model("Cnic", CnicSchema);
export default Cnic;
