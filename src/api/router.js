const express = require('express');
const router = express.Router();

const userController = require('./controller/userController');
const sessionController = require('./controller/sessionController')

router.post('/user/login', userController.login);
router.post('/user/createUser', userController.createUser);
router.post('/acess/authenticate',sessionController.autenticateSession)


module.exports = router;