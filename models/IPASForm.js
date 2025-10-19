const mongoose = require('mongoose');

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
  testCenter: { type: String, required: true },
  rollNo: { type: String, required: true },
  candidateName: { type: String, required: true },
  candidateCNIC: { type: String, required: true },
  motherName: { type: String, required: true },
  motherCNIC: { type: String, required: true },
  fatherName: { type: String, required: true },
  fatherCNIC: { type: String, required: true },
  dob: { type: String, required: true },
  gender: { type: String, required: true },
  fatherProfessionCategory: { type: String, required: true },
  motherProfessionCategory: { type: String, required: true },
  fatherProfession: { type: String, required: true },
  motherProfession: { type: String, required: true },
  fatherRank: { type: String, required: true },
  motherRank: { type: String, required: true },
  fatherArmyNo: { type: String, required: true },
  motherArmyNo: { type: String, required: true },
  fatherIncome: { type: String, required: true },
  motherIncome: { type: String, required: true },
  familyIncome: { type: String, required: true },
  servingStatus: { type: String, required: true },
  address: { type: String, required: true },
  province: { type: String, required: true },
  appearanceStatus: { type: String, required: true },
  tehsil: { type: String, required: true },
  qualifications: { type: [qualificationSchema], required: true },
  agreed: { type: Boolean, required: true },
}, { timestamps: true });

module.exports = mongoose.model('IPASForm', ipasFormSchema);
