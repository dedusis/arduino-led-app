import { Types } from "mongoose";
import User from './model.js';
import bcrypt from 'bcrypt';
import { error } from "console";

const createUser = async (data) => {
    const existing = await User.findOne({ username: data.username });
    if (existing) {
        throw new Error('Username already exists');
    }

    const newUser = new User({
        username: data.username,
        password: data.password,
        role: data.role
    });

    return await newUser.save();
};

export default {
    createUser
};