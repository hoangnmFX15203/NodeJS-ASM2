const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hotelId: {
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

transactionSchema.post('save', function (doc) {
    return doc.populate('hotelId').execPopulate();
});

module.exports = mongoose.model('Transaction', transactionSchema);