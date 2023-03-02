const User = require('../models/User');

exports.updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndRemove(req.params.id);
        res.status(200).json('Deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        console.log(users)
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};
