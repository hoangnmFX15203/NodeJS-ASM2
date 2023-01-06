const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Transaction = require('../models/Transaction');
const { createError } = require('../utils/err');

exports.createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }
};

exports.updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedRoom);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateAvailabilityRoom = async (req, res, next) => {
    try {
        await Room.updateOne(
            { 'roomNumbers._id': req.params.id },
            {
                $push: { 'roomNumbers.$.unavailableDates': req.body.dates },
            },
        );

        const newTransaction = new Transaction({
            userId: req.user.id,
            hotelId: req.body.hotelId,
            roomNumber: req.params.id,
            dateStart: req.body.dates[0],
            dateEnd: req.body.dates[req.body.dates.length - 1],
            price: req.body.price,
        });
        newTransaction.save();
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    } catch (err) {
        next(err);
    }

    try {
        await Room.findByIdAndRemove(req.params.id);
        res.status(200).json('Deleted');
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
};
