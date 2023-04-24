const express = require('express');

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');
// const { getTransactionByUserId } = require('../controller/transaction');
const transactionController = require('../controller/transaction');

const router = express.Router();

// get transaction by user
router.get('/:userId', transactionController.getTransactionsByUserId);

module.exports = router;
