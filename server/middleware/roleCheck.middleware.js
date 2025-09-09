import {User} from '../models/User.model.js';

const checkRole = (roles) => async (req, res, next) => {
    try {
        // req.user is attached by the authMiddleware
        const user = await User.findById(req.user.id);

        if (user && roles.includes(user.role)) {
            next();
        } else {
            res.status(403).json({ msg: 'Forbidden: Access denied , only counselor & admin can post resources(video,audio,images)' });
        }
    } catch (err) {
        console.error('Role check error:', err.message);
        res.status(500).send('Server Error');
    }
};

export default checkRole;
