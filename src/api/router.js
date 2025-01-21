const express = require('express');
const router = express.Router();

const userController = require('./controller/userController');

router.post('/user/login', userController.login);
router.post('/user/createUser', userController.createUser);

module.exports = router;