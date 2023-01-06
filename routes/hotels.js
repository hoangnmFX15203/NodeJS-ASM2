const express = require('express');

const { createHotel, updateHotel, deleteHotel, getHotel, getHotels } = require('../controller/hotel');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

const hotelController = require('../controller/hotel');

const router = express.Router();

// CREATE
router.post('/', verifyAdmin, hotelController.createHotel);
// UPDATE
router.put('/:id', verifyAdmin, hotelController.updateHotel);
// DELETE
router.delete('/:id', verifyAdmin, hotelController.deleteHotel);
// GET
router.get('/find/:id', hotelController.getHotel);
// GET ALL
router.get('/', hotelController.getHotels);
router.get('/countByCity', hotelController.countByCity);
router.get('/countByTypes', hotelController.countByTypes);
router.get('/room/:hotelId', hotelController.getHotelRooms);

module.exports = router;
