const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// GET result by rollNumber
router.get("/:rollNumber", async (req, res) => {
  try {
    const rollNumber = req.params.rollNumber;
    const result = await Result.findOne({ rollNumber });

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    // Aap file URL ya koi aur data send kar sakte hain
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
