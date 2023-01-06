const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch {}
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password === req.body.password) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
            return res.cookie('access_token', token, { httpOnly: true }).status(200).json(user);
        } else {
            console.log(req.body.password);
            return res.status(404).json({ message: 'Username or password incorrect' });
        }
    } catch {}
};
