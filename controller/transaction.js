const Transaction = require('../models/Transaction');
const Hotel = require('../models/Hotel');
const User = require('../models/User');
// import Hotel from './../../2.FE/src/pages/hotel/Hotel';
const Room = require('../models/Room');

exports.updateHotel = async (req, res, next) => {
    // try {
    //     const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    //     res.status(200).json(updatedHotel);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
};

exports.deleteHotel = async (req, res, next) => {
    // try {
    //     await Hotel.findByIdAndRemove(req.params.id);
    //     res.status(200).json('Deleted');
    // } catch (err) {
    //     res.status(500).json(err);
    // }
};

exports.getTransaction = async (req, res, next) => {
    try {
        const result = [];
        const transactions = await Transaction.find();
        for (let transaction of transactions) {
            const hotel = await Hotel.findById(transaction.hotelId);
            const room = await Room.find({ 'roomNumbers.id': { $in: transaction.roomId } });
            let roomNumber = [];
            room.map((item) => {
                item.roomNumbers.map((rooms) => {
                    if (rooms.number) {
                        roomNumber.push(rooms.number);
                    }
                });
            });
            const user = await User.findById(transaction.userId);
            if (user) {
                result.push({
                    _id: transaction._id,
                    hotel: hotel.name,
                    rooms: roomNumber.join(','),
                    price: transaction.price,
                    dateStart: transaction.dateStart,
                    dateEnd: transaction.endDate,
                    status: transaction.status,
                    payment: transaction.payment,
                    user: user.userName ? user.userName : user.username,
                });
            } else {
                result.push({
                    _id: transaction._id,
                    hotel: hotel.name,
                    rooms: roomNumber,
                    price: transaction.price,
                    dateStart: transaction.dateStart,
                    dateEnd: transaction.endDate,
                    status: transaction.status,
                    payment: transaction.payment,
                    user: null,
                });
            }
        }
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
    }
};

exports.getTransactionsByUserId = async (req, res, next) => {
    try {
        const transactions = await Transaction.find({ userId: req.params.userId });
        const result = [];

        // const hotelId = transactions.map((transaction) => transaction.hotelId);
        // const roomId = transactions.map((transaction) => transaction.roomId);
        for (let transaction of transactions) {
            const hotel = await Hotel.findById(transaction.hotelId);
            const room = await Room.find({ 'roomNumbers.id': { $in: transaction.roomId } });
            let roomNumber = [];
            room.map((item) => {
                item.roomNumbers.map((rooms) => {
                    if (rooms.number) {
                        roomNumber.push(rooms.number);
                    }
                });
            });
            result.push({
                hotel: hotel.name,
                rooms: roomNumber,
                price: transaction.price,
                dateStart: transaction.dateStart,
                dateEnd: transaction.endDate,
                status: transaction.status,
                payment: transaction.payment,
            });
            console.log(transaction);
        }
        res.status(200).json(result);
        // const hotels = await Hotel.findById(hotelId);
        // const room = await Room.find({ 'roomNumbers.id': { $in: roomId } });
        // const roomNumber = [];
        // let roomPrice;
        // room.map((item) => {
        //     const price = item.price;
        //     item.roomNumbers.map((rooms) => {
        //         if (rooms.number) {
        //             roomNumber.push(rooms.number);
        //         }
        //     });
        // });
        // console.log(hotels);
        // const hotelName = [];
        // hotels.map((hotel) => {
        //     if (hotel.name) {
        //         hotelName.push(hotel.name);
        //     }
        // });
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getTransactionByUserId = async (req, res, next) => {
    console.log(req.body);
    // const { min, max, ...other } = req.query;
    // try {
    //     const hotels = await Hotel.find({ ...other, cheapestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(
    //         req.query.limit,
    //     );
    //     res.status(200).json(hotels);
    // } catch (err) {
    //     res.status(500).json(err);
    // }
};
