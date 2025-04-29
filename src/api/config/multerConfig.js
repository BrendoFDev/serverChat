const multer = require('multer')
const { resolve, extname } = require("path");

const randomIdentifier = () => Math.floor(Math.random() * 10000 + 10000);

module.exports = {
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/png', 'image/jpeg'];

    if (!allowedTypes.includes(file.mimetype)) return cb(new multer.MulterError('Arquivo precisa ser png ou JPG'));

    return cb(null, true)
  },
  storage: multer.diskStorage({

    destination: (req, file, cb) => {
      const isGroup = req.url.includes('/group');
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images') + (isGroup ? '/group' : '/user'));
    },

    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${randomIdentifier()}${extname(file.originalname)}`)
    },
  }),
};
