const CandidacyModel = require('../model/Candidacy.Model');
const AnnouncementModel = require('../model/Announcement.Model');
const UserModel = require('../model/User.Model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const dotenv = require('dotenv').config();
const sendEmail = require('../tools/nodemailerFunction');




exports.addCandidacy = async (req, res) => {
  try {
    const id = req.body.announcementId;

    const token = req.headers.authorization.split(' ')[1];
    const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ email: decodedJwtToken.email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const announcement = await AnnouncementModel.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }

    const candidacy = new CandidacyModel({
      user: user._id,
      announcement: announcement._id,
      status: 'onGoing',
    });

    await candidacy.save();

    const announcementWithUser = await AnnouncementModel.findById(id)
      .populate('user')
      .exec();

    const userEmail = announcementWithUser.user.email
    const templatePath = path.join(__dirname, '../templates/notifCandidacy.html');
    const subject = 'Vous avez reçu une candidature';
    const data = {
      name: "",
    }

    sendEmail(userEmail, subject, templatePath, data);

    return res.status(201).json({ message: 'Candidature créée avec succès' });

  } catch (error) {
    console.error('Erreur lors de l\'ajout de la candidature :', error);
    return res.status(500).json({ error: 'Erreur lors de l\'ajout de la candidature' });
  }
};


exports.changeStatusCandidacy = async (req, res) => {
  try {
    const { status, candidatId } = req.body;
    const { id } = req.params;

    const token = req.headers.authorization.split(' ')[1];
    const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findOne({ email: decodedJwtToken.email });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const announcement = await AnnouncementModel.findById(id);

    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    const announcementCandidacies = await CandidacyModel.find({ announcement: announcement._id });

    const userCandidacies = await UserModel.findById(candidatId);

    if (announcement.user._id.toString() !== user._id.toString()) {
      return res.status(401).json({ message: 'Non authorisé' });
    }

    for (const candidacy of announcementCandidacies) {
      if (candidacy.user.toString() === candidatId) {
        if (status === 'validate') {

          const userEmail = userCandidacies.email
          const subject = 'Validation de votre candidature';
          const templatePath = path.join(__dirname, '../templates/validateCandidacy.html');

          sendEmail(userEmail, subject, templatePath, userCandidacies.fullName);
          candidacy.status = 'validate';
          announcement.status = 'cloturé'

        } else {
          const userEmail = userCandidacies.email;
          const subject = 'Validation de votre candidature';
          const templatePath = path.join(__dirname, '../templates/declinateCandidacy.html');

          sendEmail(userEmail, subject, templatePath, userCandidacies.fullName);
          candidacy.status = 'decline';
        }
      } 
      await candidacy.save();
      await announcement.save()
    }

    return res.status(201).json('updated');
  } catch (error) {
    console.error('Erreur lors du changement de statut de la candidature :', error);
    return res.status(500).json({ error: 'Erreur lors du changement de statut de la candidature' });
  }
};
