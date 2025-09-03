import mongoose from "mongoose";
import validator from "validator";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        index: true  
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please use a valid email address"],
        index: true  
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 150,
    }
}, { timestamps: true });

export const User= mongoose.model('User', userSchema);