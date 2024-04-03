const nodemailer = require('nodemailer');
require('dotenv').config(); // If you're using dotenv for environment variables

// Setup email transporter
let transporter = nodemailer.createTransport({
    service: 'gmail', // Your email service
    auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.PASSWORD // Your email account password
    }
});

// Function to send email
const sendEmail = async (mailOptions) => {
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Or handle it as per your application's needs
    }
};

module.exports = { sendEmail };