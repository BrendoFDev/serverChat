const express = require('express');
const router = express.Router();

const loginRequired = require('./middlewares/loginRequired');
const userController = require('./controller/userController');
const tokenController = require('./controller/tokenController');
const photoController = require('./controller/userPhotoController');

router.post('/user/login', userController.login);
router.post('/user/createUser', userController.createUser);
router.post('/user/getUser', loginRequired.AuthenticateToken, userController.getUser);

router.post('/access/authenticate', tokenController.authenticate);
router.post('/access/refreshToken', tokenController.refreshToken);


router.put('/photo/user/update', loginRequired.AuthenticateToken, photoController.uploadPhoto);
router.delete('/photo/user/delete', loginRequired.AuthenticateToken, photoController.deletePhoto);

module.exports = router;