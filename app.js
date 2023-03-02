const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParse = require('cookie-parser');
const cors = require('cors');

const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const hotelsRoute = require('./routes/hotels');
const roomsRoute = require('./routes/rooms');
const transactionRoute = require('./routes/transaction');

const app = express();

app.use(cookieParse());
app.use(cors());
app.use(express.json());
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB');
    } catch (error) {
        throw error;
    }
};

// middleware

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/transaction', transactionRoute);

app.listen(5000, () => {
    connect();
});
