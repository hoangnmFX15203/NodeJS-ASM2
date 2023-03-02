const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');

exports.createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json(saveHotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.deleteHotel = async (req, res, next) => {
    const hotelId = req.params.id;
    const nowDate = new Date();
    let dateList = [];
    const dateRange = Transaction.find({ hotelId: hotelId }, { endDate: 1 });
    dateRange.toArray().forEach(function (date) {
        dateList.push(date.endDate);
    });
    if (nơwDate.getTime() < Math.max(dateList)) {
        try {
            res.status(200).json('Van con khach thue phong');
        } catch (err) {}
    } else {
        try {
            await Hotel.findByIdAndRemove(req.params.id);
            res.status(200).json('Deleted');
        } catch (err) {}
    }
    // const hotel = await Hotel.findById(hotelId);
    // hotel.rooms.map((roomId) => {
    //     Room.findById(roomId).map((rooms) =>
    //         rooms.roomNumbers.map((room) => {
    //             room.unavailableDates.map((date) => dateList.push(date.getTime()));
    //         }),
    //     );
    // });
    // console.log(dateList);

    // try {
    // await Hotel.findByIdAndRemove(req.params.id);
    //     res.status(200).json('Deleted');
    // } catch (err) {
    // res.status(500).json(err);
    // }
};

exports.getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getHotels = async (req, res, next) => {
    const { min, max, ...other } = req.query;
    try {
        const hotels = await Hotel.find({ ...other, cheapestPrice: { $gt: min | 1, $lt: max || 999 } }).limit(
            req.query.limit,
        );
        res.status(200).json(hotels);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');
    try {
        const list = await Promise.all(
            cities.map((city) => {
                return Hotel.countDocuments({ city: city });
            }),
        );
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.countByTypes = async (req, res, next) => {
    const hotelCount = await Hotel.countDocuments({ type: 'hotel' });
    const apartmentCount = await Hotel.countDocuments({ type: 'apartment' });
    const resortCount = await Hotel.countDocuments({ type: 'resort' });
    const villaCount = await Hotel.countDocuments({ type: 'villa' });
    const cabinCount = await Hotel.countDocuments({ type: 'cabin' });
    try {
        res.status(200).json([
            { type: 'hotel', count: hotelCount },
            { type: 'apartment', count: apartmentCount },
            { type: 'resort', count: resortCount },
            { type: 'villa', count: villaCount },
            { type: 'cabin', count: cabinCount },
        ]);
    } catch (err) {
        res.status(501).json(err);
    }
};

exports.getHotelRooms = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        const hotel = await Hotel.findById(hotelId);
        const list = await Promise.all(
            hotel.rooms.map((room) => {
                return Room.findById(room);
            }),
        );
        res.status(200).json(list);
    } catch (err) {
        res.status(500).json(err);
    }
};
