import express from 'express';
import { registerUser,registerCounselor, loginUser,getCurrentUser,logoutUser } from '../controllers/authController.js';
import verifyJWT from '../middleware/auth.middleware.js';

const router = express.Router();

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', registerUser);

// @route   POST api/auth/registerCounselor
// @desc    Register a new user
// @access  Public
router.post('/registerCounselor', registerCounselor);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', loginUser);

// @route   GET api/auth/me
// @desc    Get user profile
// @access  Private
// router.get('/me', authMiddleware, getUserProfile);
router.get('/me', verifyJWT, getCurrentUser);

router.post('/logout',verifyJWT, logoutUser);

export default router;

