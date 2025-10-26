import mongoose, { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userShema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default:'user'
    }
})

userShema.pre('save', async function (next){
    if (!this.isModified('password'))  return next();
    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch (err) {
        next(err);
    }
});

export default model('User', userShema);