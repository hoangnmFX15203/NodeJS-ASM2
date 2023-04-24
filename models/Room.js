const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        maxPeople: {
            type: Number,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        roomNumbers: [{  number: Number, unavailableDates: { type: [Date] } }],
    },
    { timestamps: true },
);

roomSchema.pre('save', function (next) {
    const room = this;
    if (room.roomNumbers && room.roomNumbers.length > 0) {
        room.roomNumbers.forEach((roomNumber) => {
            if (!roomNumber._id) {
                roomNumber._id = new mongoose.Types.ObjectId();
            }
        });
    }
    next();
});

module.exports = mongoose.model('Room', roomSchema);
