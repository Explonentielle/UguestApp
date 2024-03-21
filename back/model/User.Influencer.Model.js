// userInfluencer.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userInfluencerSchema = new Schema({
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    follower: {
        type: Number,
        default: 0,
    },
    city: {
        type: String,
        default: null,
    },
    topCity: {
        type: String,
        default: null,
    },
});

const UserInfluencer = mongoose.model('UserInfluencer', userInfluencerSchema);

module.exports = UserInfluencer;