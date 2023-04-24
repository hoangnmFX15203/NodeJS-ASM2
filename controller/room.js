const Room = require('../models/Room');
const Hotel = require('../models/Hotel');
const Transaction = require('../models/Transaction');
const { createError } = require('../utils/err');

exports.createRoom = async (req, res, next) => {
    console.log(req.body);
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
        // const dateStart = new Date(Math.min(req.body.dates));
        // const dateEnd = new Date(Math.max(req.body.dates));
        // console.log(dateStart, dateEnd);
        console.log(req.body.dates);
        const newTransaction = new Transaction({
            userId: req.body.user._id,
            hotelId: req.body.hotelId,
            roomNumber: req.params.id,
            dateStart: req.body.dates[0],
            endDate: req.body.dates[req.body.dates.length - 1],
            price: req.body.price,
            payment: req.body.payment,
        });
        console.log(newTransaction);
        await newTransaction.save();
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteRoom = async (req, res, next) => {
    const id = req.params.id;
    // const hotelId = req.params.hotelId;
    // const nowDate = new Date();
    // let dateList = [];
    // const rooms = await Room.findById(req.params.id);
    // rooms.roomNumbers.map((room) => {
    //     room.unavailableDates.map((date) => dateList.push(date.getTime()));
    // });
    // if (nowDate.getTime() > Math.max(...dateList)) {
    //     try {
    //         await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    //     } catch (err) {
    //         next(err);
    //     }
    //     try {
    //         await Room.findByIdAndRemove(req.params.id);
    //         res.status(200).json(rooms);
    //     } catch (err) {
    //         res.status(500).json(err);
    //     }
    // } else {
    //     res.json('Van con khach dat phong');
    // }
    // // if(date.getTime() > )
    // // try {
    // //     // await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
    // // } catch (err) {
    // //     next(err);
    // // }

    // // try {
    // //     // await Room.findByIdAndRemove(req.params.id);
    // //     res.status(200).json(rooms);
    // // } catch (err) {
    // //     res.status(500).json(err);
    // // }
    // const hotels = (await Hotel.find()).map((hotel) => {
    //     const list = [];
    //     if (hotel.rooms.includes(id)) {
    //         list.push(hotel);
    //     }
    //     return list
    // });
    const hotels = await Hotel.find({ rooms: id });
    const hotelId = hotels.length > 0 ? hotels[0]._id : null;
    const nowDate = new Date();
    let dateList = [];
    const room = await Room.findById(req.params.id);

    if (!room) {
        return res.status(404).json({ message: 'Không tìm thấy phòng' });
    }

    for (let r of room.roomNumbers) {
        if (r.unavailableDates && r.unavailableDates.length > 0) {
            dateList.push(...r.unavailableDates.map((date) => date.getTime()));
        }
    }

    if (dateList.length === 0 || nowDate.getTime() > Math.max(...dateList)) {
        try {
            const hotel = await Hotel.findById(hotelId);
            if (!hotel) {
                return res.status(404).json({ message: 'Không tìm thấy khách sạn' });
            }
            if (hotel.rooms.includes(req.params.id)) {
                hotel.rooms.pull(req.params.id);
                await hotel.save();
            }
            await Room.findByIdAndRemove(req.params.id);
            // check and remove from Transaction collection
            // await Transaction.deleteMany({ hotelId, roomNumber: room.roomNumber });

            return res.status(200).json({ message: 'Đã xóa phòng' });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Lỗi không xác định' });
        }
    } else {
        return res.json({ message: 'Vẫn còn khách đặt phòng' });
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
