const fs = require('fs');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

async function sendEmail(toEmail, subject, templatePath, name) {
    try {
        const emailTemplate = fs.readFileSync(templatePath, 'utf8');

        const data = {
            name: name,
        }
        
        const emailBody = ejs.render(emailTemplate, data);

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'alex59debonnieres@gmail.com',
                pass: 'eevo yvde jmgt lqtm',
            },
        });

        const mailOptions = {
            from: 'alex59debonnieres@gmail.com',
            to: toEmail,
            subject: subject,
            html: emailBody,
            text: '',
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    }
}

module.exports = sendEmail;