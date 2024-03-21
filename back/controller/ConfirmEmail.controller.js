const UserModel = require('../model/User.Model');
const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv').config();


exports.confirmEmail = async (req, res) => {
    try {
        const { token } = req.params;

        // Vérifiez le token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Trouvez l'utilisateur par ID
        const user = await UserModel.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifiez si l'e-mail a déjà été vérifié
        if (user.validateEmail) {
            return res.status(200).json({ message: "Votre e-mail a déjà été vérifié. Vous pouvez vous connecter." });
        }

        // Marquez l'e-mail comme vérifié
        user.validateEmail = true;
        await user.save();

        const confirmationHtmlPath = path.join(__dirname, '../templates/confirmation.html');

        res.sendFile(confirmationHtmlPath);

    } catch (error) {
        console.error('Erreur lors de la confirmation de l\'e-mail :', error);
        res.status(500).json({ error: 'Erreur lors de la confirmation de l\'e-mail' });
    }
};


