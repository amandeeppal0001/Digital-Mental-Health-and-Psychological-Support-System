import express from 'express';
import { getDashboardStats } from '../controllers/analyticsController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import checkRole from '../middleware/roleCheck.middleware.js';

const router = express.Router();

// This route is protected and can only be accessed by users with the 'admin' role.
// The middleware chain first verifies authentication, then checks the role.
router.get(
    '/dashboard',
    [authMiddleware, checkRole(['admin'])],
    getDashboardStats
);

export default router;
