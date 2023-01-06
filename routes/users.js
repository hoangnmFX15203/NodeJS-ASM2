const express = require('express');
const userController = require('../controller/user');
const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

const router = express.Router();

// UPDATE
router.put('/:id', verifyUser, userController.updateUser);
// DELETE
router.delete('/:id', verifyUser, userController.deleteUser);
// GET
router.get('/:id', verifyUser, userController.getUser);
// GET ALL
router.get('/', verifyAdmin, userController.getUsers);

module.exports = router;
