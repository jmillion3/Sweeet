const nodemailer = require('nodemailer');

module.exports = {
    sendEmail: async (req, res) => {
        const {email} = req.body
        const transporter = nodemailer.createTestAccount({
            service: "hotmail",
            auth: {
                user: 'sweeetcandy123@outlook.com',
                pass: '1234567'
            }
        });
        const message = {
            from: 'sweeetcandy123@outlook.com',
            to: email,
            subject: "Welcome to Sweeets",
            text: "Thank you for joining Sweeets. Order as much as you like but make sure you brush your teeth."
        }
        transporter.sendMail(message, function (err, info){
            if(err){
                console.log(err);
                return;
            }
            console.log("Email sent")
            res.sendStatus(200)
        })

    }
}
