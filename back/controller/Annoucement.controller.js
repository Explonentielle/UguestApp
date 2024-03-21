// controllers/announcementController.js
const AnnouncementModel = require('../model/Announcement.Model');
const UserModel = require('../model/User.Model');
const UserInfluencerModel = require('../model/User.Influencer.Model');
const UserShopModel = require('../model/User.Shop.Model');
const CandidacyModel = require('../model/Candidacy.Model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.getAllAnnouncements = async (req, res) => {
    try {

        const token = req.headers.authorization.split(' ')[1];
        const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findOne({ email: decodedJwtToken.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const announcements = await AnnouncementModel.find()
            .populate('user')
            .exec()

        const jsonresponse = await Promise.all(announcements.map(async (announcement) => {
            const userId = announcement.user._id;
            const userShop = await UserShopModel.findOne({ user: userId });


            const AnnouncementWithUser = {
                ...announcement.toJSON(),
                userShop: userShop || null,
            };

            return AnnouncementWithUser;
        }));

        return res.status(200).json(jsonresponse);

    } catch (error) {
        console.error('Erreur lors de la récupération de toutes les annonces :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de toutes les annonces' });
    }
};

exports.getMyAnnouncements = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findOne({ email: decodedJwtToken.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const announcements = await AnnouncementModel.find({ user: user._id })
            .populate('user')
            .exec()

        const jsonresponse = await Promise.all(announcements.map(async (announcement) => {
            const userId = announcement.user._id;
            const userShop = await UserShopModel.findOne({ user: userId });


            const AnnouncementWithUser = {
                ...announcement.toJSON(),
                userShop: userShop || null,
            };

            return AnnouncementWithUser;
        }));

        return res.status(200).json(jsonresponse);

    } catch (error) {
        console.error('Erreur lors de la récupération des annonces de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
    }
};

exports.getApplyAnnouncements = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodedJwtToken.email)
        const user = await UserModel.findOne({ email: decodedJwtToken.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const userCandidacies = await CandidacyModel.find({ user: user._id });

        const announcementIds = userCandidacies.map(candidacy => candidacy.announcement);
        const announcements = await AnnouncementModel.find({ _id: { $in: announcementIds } })
            .populate('user')
            .exec();
            
        const jsonresponse = await Promise.all(announcements.map(async (announcement) => {
            const userId = announcement.user._id;
            const userShop = await UserShopModel.findOne({ user: userId });


            const AnnouncementWithUser = {
                ...announcement.toJSON(),
                userShop: userShop || null,
            };

            return AnnouncementWithUser;
        }));

        return res.status(200).json(jsonresponse);

    } catch (error) {
        console.error('Erreur lors de la récupération des annonces de l\'utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
    }
};

exports.createAnnouncement = async (req, res) => {

    function getImageUrl(category) {
        let imageUrl = '';

        if (category === 'food') {
            imageUrl = 'https://res.cloudinary.com/dfsaszwfq/image/upload/v1683731302/donuts_kfvk7g.jpg';
        } else if (category === 'beauty') {
            imageUrl = 'https://res.cloudinary.com/dfsaszwfq/image/upload/v1683731672/beauty_felrqf.jpg';
        } else if (category === 'fashion') {
            imageUrl = 'https://res.cloudinary.com/dfsaszwfq/image/upload/v1683731638/shopping_rvyi0s.jpg';
        }
        return imageUrl;
    }


    try {
        const {
            title,
            description,
            category,
            size,
            discountValue,
        } = req.body;

        const token = req.headers.authorization.split(' ')[1];

        const decodedJwtToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findOne({ email: decodedJwtToken.email });

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        const formErrors = {};

        if (!title) {
            formErrors.title = 'Le titre est requis';
        }

        if (!description) {
            formErrors.description = 'La description est requise';
        }

        if (Object.keys(formErrors).length > 0) {
            return res.status(400).json(formErrors);
        }

        const imgUrl = getImageUrl(category);

        const newAnnouncement = new AnnouncementModel({
            title,
            description,
            category,
            size,
            discountValue,
            user: user._id,
            imgUrl,
        });

        await newAnnouncement.save();

        // Mettez à jour les crédits de l'utilisateur (s'il s'agit d'une opération de déduction)

        res.status(201).json({ message: 'Annonce créée avec succès', announcement: newAnnouncement });
    } catch (error) {
        console.error('Erreur lors de la création de l\'annonce :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l\'annonce' });
    }
};

exports.updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            category,
            size,
            discountType,
            discountValue,
            imgUrl,
        } = req.body;

        // Recherchez l'annonce par ID
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }

        // Mettez à jour les propriétés de l'annonce
        announcement.title = title;
        announcement.description = description;
        announcement.category = category;
        announcement.size = size;
        announcement.discountType = discountType;
        announcement.discountValue = discountValue;
        announcement.imgUrl = imgUrl;

        // Enregistrez les modifications dans la base de données
        await announcement.save();

        res.status(200).json({ message: 'Annonce mise à jour avec succès', announcement });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'annonce :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'annonce' });
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;

        // Recherchez l'annonce par ID
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }

        // Supprimez l'annonce de la base de données
        await announcement.remove();

        res.status(204).send(); // Réponse sans contenu pour indiquer la suppression réussie
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'annonce :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'annonce' });
    }
};

exports.getCandidacy = async (req, res) => {
    try {
        const announcementId = req.params.id;

        const announcement = await AnnouncementModel.findById(announcementId);

        if (!announcement) {
            return res.status(404).json({ message: "Annonce non trouvée" });
        }


        const announcementCandidacies = await CandidacyModel.find({ announcement: announcementId })
            .populate('user')
            .exec();

        const jsonCandidacies = await Promise.all(announcementCandidacies.map(async (candidacy) => {
            const userId = candidacy.user._id;
            const userInfluencer = await UserInfluencerModel.findOne({ user: userId });


            const candidatureAvecUserInfluencer = {
                ...candidacy.toJSON(),
                userInfluencer: userInfluencer || null,
            };

            return candidatureAvecUserInfluencer;
        }));

        return res.status(200).json(jsonCandidacies);
    } catch (error) {
        console.error('Erreur lors de la récupération des candidatures :', error);
        return res.status(500).json({ error: 'Erreur lors de la récupération des candidatures' });
    }
};


