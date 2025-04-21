const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const fs = require('fs');
const path = require('path');

const upload = multer(multerConfig).single('userPhoto');
const Photo = require('../model/photoModel');
const User = require('../model/userModel');

exports.uploadPhoto = async (req, res) => {
    try {
        await upload(req, res, async (error) => {

            if (error instanceof multer.MulterError) return res.status(400).json({ erros: [error.code] });
            else {
                const { originalname, filename } = req.file;

                const userPhoto = await this.getPhotoByUserPk(req.user.id);

                if (userPhoto) {
                    removeImage(userPhoto.filename);
                    await userPhoto.destroy();
                }

                const photo = await Photo.create({ owner: req.user.id, originalName: originalname, fileName: filename });

                return res.status(201).json(photo);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do servidor");
    }
}

exports.getPhotoByUserPk = (userId) => {
    return Photo.findOne({
        where: {
            owner: userId
        },
        include: User
    });
}

function removeImage(filename) {
    const imagePath = path.resolve(__dirname, '..', '..', 'uploads', 'images', filename);
    if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                throw Error('Erro ao remover imagem');
            };
        });
    }
}