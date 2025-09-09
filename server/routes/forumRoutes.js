import express from 'express';
import {
    createPost,
    getAllPosts,
    getPostById,
    createComment,
} from '../controllers/forumController.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Apply auth middleware to all forum routes. 
// Only logged-in users can view or interact with the forum.
router.use(authMiddleware);

// Routes for Posts
router.route('/')
    .post(createPost)
    .get(getAllPosts);

router.route('/:postId')
    .get(getPostById);

// Route for Comments
router.route('/:postId/comments')
    .post(createComment);


export default router;























// // // In server/routes/forumRoute.js

// // import express from 'express';
// // import {
// //     createPost,
// //     getAllPosts,
// //     getPostById,
// //     createComment,
// // } from '../controllers/forumController.js';
// // import authMiddleware from '../middleware/auth.middleware.js';

// // const router = express.Router();

// // // ⛔️ REMOVE THIS LINE
// // // router.use(authMiddleware);

// // // --- Public Routes (Anyone can view) ---
// // router.route('/')
// //     .get(getAllPosts); // Publicly get all posts

// // router.route('/:postId')
// //     .get(getPostById); // Publicly get a single post

// // // --- Private Routes (Must be logged in to create content) ---
// // router.route('/')
// //     .post(authMiddleware, createPost); // ✅ Apply middleware here

// // router.route('/:postId/comments')
// //     .post(authMiddleware, createComment); // ✅ And apply middleware here

// // export default router;























//  import express from 'express';
// import {
//     createPost,
//     getAllPosts,
//     getPostById,
//     createComment,
// } from '../controllers/forumController.js';
// // import authMiddleware from '../middleware/auth.middleware.js';

// // ... imports
// import authMiddleware from '../middleware/auth.middleware.js';

// const router = express.Router();

// // --- PUBLIC ROUTES (for viewing) ---

// // Anyone can get all posts
// router.get('/', getAllPosts); 

// // Anyone can get a single post
// router.get('/:postId', getPostById);


// // --- PRIVATE ROUTES (for creating content) ---

// // ONLY logged-in users can create a post
// router.post('/', authMiddleware, createPost);

// // ONLY logged-in users can create a comment
// router.post('/:postId/comments', authMiddleware, createComment);


// export default router;