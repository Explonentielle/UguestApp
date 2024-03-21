const mongoose = require('mongoose');

const candidacySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  announcement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required: true,
  },
  status: {
    type: String,
    required: true,
    maxlength: 255,
  },
});

const Candidacy = mongoose.model('Candidacy', candidacySchema);

module.exports = Candidacy;
