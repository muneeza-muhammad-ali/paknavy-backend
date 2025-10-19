import express from 'express';
import { submitCnic } from '../controllers/userController.js';

const router = express.Router();

router.post('/submit-cnic', submitCnic);

export default router;
