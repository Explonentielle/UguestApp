const UserController = require("../controller/User.controller")
const ConfirmEmailController = require("../controller/ConfirmEmail.controller")
const AnnoucementController = require("../controller/Annoucement.controller")
const CandidacyController = require("../controller/Candidacy.controller")



module.exports = server => {
    // route User 
    
    server.post('/api/user/inscription', UserController.createUser);

    server.post('/api/user/identification', (req, res) => {
        UserController.login(req, res)
    })

    server.get('/api/confirmation/:token', (req, res) => {
        ConfirmEmailController.confirmEmail(req, res);
    });

    server.get('/api/User/getUser/:id', (req, res) => {
         UserController.getUser(req, res)
    });

    server.post('/api/user/passwordUpdate', (req, res) => {
        UserController.emailResetPassword(req, res)
    });

    server.post('/api/user/verifyToken', (req, res) => {
        UserController.verifyToken(req, res)
    });

    server.put('/api/user/newPassword', (req, res) => {
        UserController.newPassword(req, res)
    });

    // route annoucement 

    server.get('/api/annonces/getMy', (req, res) => {
        AnnoucementController.getMyAnnouncements(req, res);
    });

    server.get('/api/annonces/getAll', (req, res) => {
        AnnoucementController.getAllAnnouncements(req, res);
    });

    server.get('/api/annonces/getApplyAnnoucement/:id', (req, res) => {
        AnnoucementController.getApplyAnnouncements(req, res);
    });

    server.get('/api/annonces/getCandidacy/:id', (req, res) => {
        AnnoucementController.getCandidacy(req, res);
    });

    server.post('/api/annonces/create', (req, res) => {
        AnnoucementController.createAnnouncement(req, res);
    });

    server.put('/api/annonces/update/:id', (req, res) => {
        AnnoucementController.updateAnnouncement(req, res)
    });

    server.delete('/api/annonces/delete/:id', (req, res) => {
        AnnoucementController.deleteAnnouncement(req, res)
    });

    // route candidacy
    
    server.post('/api/candidatures/create', (req, res) => {
        CandidacyController.addCandidacy(req, res);
    });

    server.put('/api/candidatures/update/:id', (req, res) => {
        CandidacyController.changeStatusCandidacy(req, res);
    });
}