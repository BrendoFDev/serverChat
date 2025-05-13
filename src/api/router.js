const express = require('express');
const router = express.Router();

const loginRequired = require('./middlewares/loginRequired');
const userController = require('./controller/userController');
const tokenController = require('./controller/tokenController');
const photoController = require('./controller/userPhotoController');
const emailController = require('./controller/emailController');

router.post('/user/login', userController.login);
router.post('/user/createUser', userController.createUser);
router.post('/user/getUser', loginRequired.AuthenticateToken, userController.getUser);
router.put('/user/updateUser', loginRequired.AuthenticateToken, userController.updateUser);

router.post('/access/authenticate', tokenController.authenticate);
router.post('/access/refreshToken', tokenController.refreshToken);

router.put('/photo/user/update', loginRequired.AuthenticateToken, photoController.uploadPhoto);
router.delete('/photo/user/delete', loginRequired.AuthenticateToken, photoController.deletePhoto);

router.post('/email/authenticate', emailController.authEmail);
router.post('/email/reset', emailController.resetEmail);

module.exports = router;