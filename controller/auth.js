const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.register = async (req, res, next) => {
    console.log(req.body);
    try {
        const newUser = new User({
            userName: req.body.username,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
        });
        await newUser.save();
        res.status(200).json(newUser);
    } catch {}
};

exports.login = async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName: userName });
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password == password) {
            // const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT);
            const { password, isAdmin, ...otherDetails } = user._doc;
            // res.cookie;
            return (
                res
                    // .cookie('access_token', token, { httpOnly: true })
                    .status(200)
                    .json({ details: { ...otherDetails }, isAdmin })
            );
        } else {
            return res.status(404).json({ message: 'Username or password incorrect' });
        }
        // var userName = req.body.userName;
        // var password = req.body.password;

        // User.findOne({ userName: userName, password: password }, function (err, user) {
        //     console.log({
        //         user,
        //     });
        //     if (err) throw err;
        //     if (user) {
        //         req.session.user = user;
        //         res.redirect('/');
        //     } else {
        //         res.send('Tên đăng nhập hoặc mật khẩu không chính xác.');
        //     }
        // });
    } catch (err) {
        return res.status(500).json(err);
    }
};
