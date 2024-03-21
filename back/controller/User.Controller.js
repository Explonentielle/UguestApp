// user.controller.js

const UserShopModel = require('../model/User.Shop.Model');
const UserInfluencerModel = require('../model/User.Influencer.Model');
const UserModel = require('../model/User.Model');
const CandidacyModel = require('../model/Candidacy.Model');
const AnnouncementModel = require('../model/Announcement.Model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const baseUrl = 'http://172.20.10.4:5500';

exports.createUser = async (req, res) => {
    try {
        const {
            email,
            fullName,
            password,
            type,
            credit,
            category,
            address,
            name,
            city,
            zipCode,
            complement,
            siret,
            cart, } = req.body;


        const emailLowerCase = email.toLowerCase();
        const existingUser = await UserModel.findOne({ emailLowerCase });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet e-mail est déjà utilisé.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            email: emailLowerCase,
            fullName,
            password: hashedPassword,
            roles: type,
        });

        await user.save();

        let newUserType;

        if (type === 'influencer') {
            newUserType = new UserInfluencerModel({
                user: user._id,
                follower: 0,
            });

        } else if (type === 'shop') {
            newUserType = new UserShopModel({
                user: user._id,
                credit,
                category,
                address,
                name,
                city,
                zipCode,
                complement,
                siret,
                cart,
            });
        }

        await newUserType.save();

        const token = jwt.sign({ userId: user._id, email: user.email, }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const encodedToken = encodeURIComponent(token);
        const confirmationLink = `${baseUrl}/api/confirmation/${encodedToken}`;
        const templatePath = path.join(__dirname, '../templates/validationEmail.html');
        const emailTemplate = fs.readFileSync(templatePath, 'utf8');

        const data = {
            name: fullName,
            confirmationLink: confirmationLink,
        }

        const emailBody = ejs.render(emailTemplate, data);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'malik.uguest@gmail.com',
                pass: 'eevo yvde jmgt lqtm',
            },
        });

        const mailOptions = {
            from: 'malik.uguest@gmail.com',
            to: user.email,
            subject: 'Confirmation d\'inscription',
            html: emailBody,
            text: `Bienvenue ! Veuillez confirmer votre inscription en cliquant sur ce lien : ${confirmationLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation :', error);
            }
        });

        res.status(201).json(user);

    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const emailLowerCase = username.toLowerCase();

        let user = await UserModel.findOne({ email: emailLowerCase });

        if (!user) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect.' });
        }

        let userData = {};

        if (user.roles.includes('shop')) {
            userData = await UserShopModel.findOne({ user: user._id });
        } else if (user.roles.includes('influencer')) {
            userData = await UserInfluencerModel.findOne({ user: user._id });
        }


        const token = jwt.sign({ userId: user._id, email: user.email, }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Connexion réussie.',
            token: token,
            user: user,
            userData: userData,
        });

    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur lors de la connexion.' });
    }
};


exports.getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const userAnnouncements = await AnnouncementModel.find({ user: userId })
            .populate('candidacies')
            .exec()

        res.status(200).json(userAnnouncements);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
};

exports.emailResetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const emailLowerCase = email.toLowerCase();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const token = Math.floor(1000 + Math.random() * 9000).toString();
        user.resetToken = token;
        user.resetTokenCount = 0;

        await user.save();

        const resetLink = `${token}`;
        const templatePath = path.join(__dirname, '../templates/resetPassword.html');

        const data = {
            name: user.Name,
            resetLink: resetLink,
        };

        const emailBody = ejs.render(fs.readFileSync(templatePath, 'utf8'), data);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'alex59debonnieres@gmail.com',
                pass: 'eevo yvde jmgt lqtm',
            },
        });

        const mailOptions = {
            from: 'alex59debonnieres@gmail.com',
            to: email,
            subject: 'Réinitialisation de mot de passe',
            html: emailBody,
            text: `Cliquez sur le lien suivant pour réinitialiser votre mot de passe : ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'e-mail de réinitialisation :', error);
            }
        });

        res.status(200).json({ message: 'Un email de réinitialisation a été envoyé' });

    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        res.status(500).json({ error: 'Erreur lors de la réinitialisation du mot de passe' });
    }
};

// Vérification du token et mise à jour du mot de passe
exports.verifyToken = async (req, res) => {
    try {
        const { email, token } = req.body;
        const emailLowerCase = email.toLowerCase();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Une erreur s'est produite" });
        }

        if (user.resetToken != token) {
            if (user.resetTokenCount === 3) {
                user.resetToken = null;
                user.resetTokenCount = 0;
                await user.save();
                return res.status(403).json({ message: "Vous avez atteint le nombre maximum d'essais" });
            }
            user.resetTokenCount += 1;
            await user.save();
            return res.status(403).json({ message: "Une erreur s'est produite" });
        }

        user.resetToken = null;
        await user.save();

        return res.status(200).json({ message: 'Le token est correct' });
    } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite' });
    }
};

exports.newPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const emailLowerCase = email.toLowerCase();

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Une erreur s'est produite" });
        }

        if (password.length < 6) {
            return res.status(403).json({ message: "Le mot de passe doit être supérieur à 6 caractères" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'mot de passe mis a jours' });

    } catch (error) {
        console.error('Erreur lors de la réinitialisation du mot de passe :', error);
        res.status(500).json({ message: 'Une erreur s\'est produite' });
    }
};






