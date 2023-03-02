const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res, next) => {
    try {
        const newUser = new User({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch {}
};

exports.login = async (req, res, next) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ userName: req.body.userName });
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password === req.body.password[0]) {
            const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
            const { password, isAdmin, ...otherDetails } = user._doc;
            res.cookie;
            return res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json({ details: { ...otherDetails }, isAdmin });
        } else {
            console.log(req.body.password);
            return res.status(404).json({ message: 'Username or password incorrect' });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};
