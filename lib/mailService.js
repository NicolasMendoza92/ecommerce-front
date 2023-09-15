const nodemailer = require("nodemailer");

export const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.PASS_USER, // generated gmail user
        pass: process.env.PASS_GMAIL, // generated gmail password (auth 2 pasos)
    },
});
transporter.verify().then(() => {
    console.log('ready to send')
});

export const mailOptions = {
    from: process.env.PASS_USER,
};




