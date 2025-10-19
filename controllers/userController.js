import User from '../models/User.js';

// Register user with MongoDB
export const registerUser = async (req, res) => {
  
  try {
  
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user instance
    const user = new User({ name, email, password });

    // Password hashing handled by pre-save hook in model

    // Save to MongoDB
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      }
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const submitCnic = (req, res) => {
  const { cnic } = req.body;
  const cnicPattern = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;

  if (!cnic || !cnicPattern.test(cnic)) {
    return res.status(400).json({ message: 'Invalid CNIC format' });
  }

  // Process CNIC (save to DB etc)
  console.log('CNIC received:', cnic);

  res.json({ message: 'CNIC received successfully' });
};