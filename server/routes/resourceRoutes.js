import express from 'express';
import {
  getAllResources,
  getResourceById,
  createResource,
} from '../controllers/resourcesController.js';
import authMiddleware from '../middleware/auth.middleware.js';
import checkRole from '../middleware/roleCheck.middleware.js';
import { upload } from '../middleware/multer.middleware.js';
const router = express.Router();

// @route   GET /api/resources
// @desc    Get all resources
// @access  Public
router.get('/', getAllResources);

// @route   GET /api/resources/:id
// @desc    Get a single resource by its ID
// @access  Public
router.get('/:id', getResourceById);


// @route   POST /api/resources
// @desc    Create a new resource
// @access  Private (for Admins and Counselors only)
router.post('/', [upload.single("file") ,authMiddleware, checkRole(['admin', 'counselor'])], createResource);

export default router;
