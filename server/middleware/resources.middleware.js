import User from '../models/User.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Middleware to check if the logged-in user has one of the required roles
 * @param {Array} roles - Allowed roles (e.g., ['Admin', 'Counselor'])
 */
const checkRole = (roles) => asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id); // req.user is set by authMiddleware

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (!roles.includes(user.role)) {
        throw new ApiError(403, "Forbidden: Access denied.");
    }

    next();
});

export default checkRole;














// import User from '../models/User.js';

// const checkRole = (roles) => async (req, res, next) => {
//     try {
//         // req.user is attached by the authMiddleware
//         const user = await User.findById(req.user.id);

//         if (user && roles.includes(user.role)) {
//             next();
//         } else {
//             res.status(403).json({ msg: 'Forbidden: Access denied' });
//         }
//     } catch (err) {
//         console.error('Role check error:', err.message);
//         res.status(500).send('Server Error');
//     }
// };

// export default checkRole;
