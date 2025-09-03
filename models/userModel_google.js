import mongoose from "mongoose";

const userSchemaGoogle = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    googleId: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, { timestamps: true });

export const UserGoogle = mongoose.model('UserGoogle', userSchemaGoogle);
