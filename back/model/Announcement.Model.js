// models/Announcement.js
const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'En cours',
  },
  discountType: {
    type: String,
    required: false,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  imgUrl: String,
  candidacies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidacy', 
    },
  ],
});

module.exports = mongoose.model('Announcement', announcementSchema);
