const express = require('express');

const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');
const roomController = require('../controller/room');

const router = express.Router();

// CREATE
router.post('/:hotelId', verifyAdmin, roomController.createRoom);
// UPDATE
router.put('/availability/:id', roomController.updateAvailabilityRoom);
router.put('/:id', verifyAdmin, roomController.updateRoom);
// DELETE
router.delete('/:id', verifyAdmin, roomController.deleteRoom);
// GET
router.get('/:id', roomController.getRoom);
// GET ALL
router.get('/', roomController.getRooms);

module.exports = router;
