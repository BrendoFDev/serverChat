const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const fs = require('fs');
const path = require('path');

const upload = multer(multerConfig).single('userPhoto');
const Photo = require('../model/photoModel');
const User = require('../model/userModel');

exports.updatePhoto = async (req, res) => {
    try {
        await upload(req, res, async (error) => {

            if (error instanceof multer.MulterError) return res.status(400).json({ erros: [error.code] });
            else {

                const { id } = req.user;

                let userPhoto = await this.getPhotoByUserPk(id);

                userPhoto = await processPhoto(userPhoto, req);

                return res.status(201).json({ fileName: userPhoto.fileName });
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do servidor");
    }
}

async function processPhoto(userPhoto, req) {
    const { originalname, filename } = req.file;
    const { id } = req.user;

    if (userPhoto) {
        removeImage(userPhoto.fileName);

        userPhoto.originalName = originalname
        userPhoto.fileName = filename;

        await userPhoto.save();
    }
    else {
        userPhoto = await Photo.create({
            originalName: originalname,
            fileName: filename,
            owner: id
        });
    }

    return userPhoto;
}

exports.getPhotoByUserPk = (userId) => {
    return Photo.findOne({
        where: {
            owner: userId
        },
        include: User
    });
}

exports.deletePhoto = async (req, res) => {
    try {
        const userPhoto = await this.getPhotoByUserPk(req.user.id);

        if (!userPhoto) return res.status(400).json({ erros: ['Usuário não possui foto'] });

        removeImage(userPhoto.filename);
        await userPhoto.destroy();

        return res.status(200).json({ message: 'Foto removida com sucesso' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do servidor");
    }
}

function removeImage(filename) {
    const imagePath = path.resolve(__dirname, '..', '..', 'uploads', 'images', 'user', filename);
    if (fs.existsSync(imagePath)) {
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                throw Error('Erro ao remover imagem');
            };
        });
    }
}