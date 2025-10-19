const express = require('express');
const router = express.Router();
const IPASForm = require('../models/IPASForm');

// POST /api/ipassubmit
router.post('/', async (req, res) => {
  try {
    const formData = req.body;

    // Basic validation example (you can add more)
    if (!formData.agreed) {
      return res.status(400).json({ error: 'You must agree to the affirmation.' });
    }

    const newForm = new IPASForm(formData);
    await newForm.save();

    res.status(201).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ error: 'Server error. Could not save form data.' });
  }
});

module.exports = router;
