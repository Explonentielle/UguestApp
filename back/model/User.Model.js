// user.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({

    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    validateEmail: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetToken: {
        type: Number,
        default: null,
    },
    resetTokenCount: {
        type: Number,
        default: 0,
    },
    announcements: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Announcement',
        },
    ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;