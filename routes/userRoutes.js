// routes/userRoutes.js
import express from 'express';
import { registerUser, submitCnic } from '../controllers/userController.js';

const router = express.Router();

// Existing route
router.post('/register', registerUser);

// Naya route add kar dein
router.post('/submit-cnic', submitCnic);

export default router;
