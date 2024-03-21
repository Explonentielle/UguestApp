// userShop.model.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShopSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    credit: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zipCode: {
        type: String,
        required: true,
    },
    complement: {
        type: String,
        default: null,
    },
    siret: {
        type: String,
        required: true,
        unique: true,
    },
    cart: {
        type: Number,
        default: null,
    },
});

const UserShop = mongoose.model('UserShop', userShopSchema);

module.exports = UserShop;
