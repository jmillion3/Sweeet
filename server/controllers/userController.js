const bcrypt = require('bcrypt');

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
            userId: newUser.user_id,
            first: newUser.first,
            last: newUser.last,
            email: newUser.email,
            username: newUser.username
        }
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
                userId: foundUser.user_id,
                username: foundUser.username,
                email: foundUser.email
            }
            res.status(200).send(req.session.user)
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