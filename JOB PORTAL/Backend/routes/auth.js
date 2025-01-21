
// Import required modules
import express from 'express';
import { register, login } from '../controllers/authController.js';

// Create a new router instance
const router = express.Router();

// Define the routes for authentication
router.post('/register', register);
router.post('/login', login);

// Export the router instance
export default router;