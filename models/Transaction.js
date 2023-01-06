const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    roomNumber: {
        type: String,
        required: true,
    },
    dateStart: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    payment: {
        type: String,
        default: 'Cash',
    },
    status: {
        type: String,
        default: 'Booked',
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
