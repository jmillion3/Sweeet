const bcrypt = require('bcrypt');
require('dotenv').config();
const nodemailer = require('nodemailer');

const {EMAIL, PASSWORD} = process.env;

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {first, last, email, username, password} = req.body;
        // console.log("body:", req.body);
        const foundUser = await db.user.check_user(email);
        if(foundUser[0]){
            return res.status(409).send("User already exists. Please login.")
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const [newUser] = await db.user.add_user([first, last, email, username, hash])
        req.session.user = {
            user_id: newUser.user_id,
            first: newUser.first,
            last: newUser.last,
            email: newUser.email,
            username: newUser.username
        }
        const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });
        const message = {
            from: 'sweeetcandy123@outlook.com',
            to: email,
            subject: "Welcome to Sweeets",
            text: `Thank you ${first} ${last} for joining Sweeets. Order as much as you like but make sure you brush your teeth.`
        }
        transporter.sendMail(message, function (err, data){
            if(err){
                console.log(err);
                return;
            }
            console.log("Email sent")
            res.sendStatus(200)
        })
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        // console.log("body:", req.body);
        const [foundUser] = await db.user.check_user(username);
        if(!foundUser){
            return res.status(401).send('Incorrect login information')
        }
        const authenticated = bcrypt.compareSync(password, foundUser.password);
        if(authenticated){
            req.session.user = {
                user_id: foundUser.user_id,
                username: foundUser.username,
                email: foundUser.email
            }
            res.status(200).send(req.session.user)
            // console.log(req.session.user)
        } else {
            res.status(401).send('Incorrect login information')
        }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else {
            res.status(401).send('Please login');
        }
    }
    // update: (req, res) => {}
}