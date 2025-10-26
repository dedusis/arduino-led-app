import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../user/model.js';

export const loginService = async (username, password) => {
    const user = await User.findOne({ username });
    if(!user) {
        throw new Error('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
        throw new Error('Invalid credentials');
    }

    const payload = {
        id: user._id,
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });

    return {
        token,
        user: {
            _id: user._id,
            username: user.username,
            role: user.role
        }
    };
};

export const getUserProfile = async (userId) => {
    return await User.findById(userId).select('-password');
};
