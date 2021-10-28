const nodemailer = require('nodemailer');

const sendEmail  = async options => {
    const transport = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    });

    const message = {
        from : "noReplay@EMS Application" ,
        to : options.email,
        subject : options.subject,
        text : options.message
    };

    //send Email
    await transport.sendMail(message);

};

module.exports = sendEmail ;