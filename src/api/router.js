const express = require('express');
const router = express.Router();

const userController = require('./controller/userController');
const tokenController = require('./controller/tokenController');

router.post('/user/login', userController.login);
router.post('/user/createUser', userController.createUser);
router.post('/acess/authenticate', tokenController.authenticate);

module.exports = router;