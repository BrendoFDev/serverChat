const express = require('express');
const router = express.Router();

const userController = require('./controller/userController');
const tokenController = require('./controller/tokenController')

router.post('/user/login', userController.login);
router.post('/user/createUser', userController.createUser);
router.post('/user/getUser', userController.getUser);

router.post('/access/authenticate', tokenController.authenticate);
router.post('/access/refreshToken', tokenController.refreshToken);

module.exports = router;