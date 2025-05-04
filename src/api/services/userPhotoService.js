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
                const user = req.user;

                await processPhoto(user, req);

                return res.status(201).json(user);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do servidor");
    }
}

async function processPhoto(user, req) {
    const { filename } = req.file;
    const { id } = req.user;

    if (user?.photo) {
        removeImage(user.photo.fileName);
        await user.photo.update({ fileName: filename });
    }
    else {
        await Photo.create({
            fileName: filename,
            owner: id
        });
    }
    return await User.findOne({ where: { id }, include: Photo });
}

exports.getPhotoByUserPk = (userId) => {
    return User.findOne({
        where: {
            id: userId
        },
        include: Photo,
    });
}

exports.deletePhoto = async (req, res) => {
    try {
        const user = await this.getPhotoByUserPk(req.user.id);

        if (!user?.photo) return res.status(400).json({ erros: ['Usuário não possui foto'] });

        removeImage(user?.photo?.filename);

        await user?.destroy();

        return res.status(200).json({ message: 'Foto removida com sucesso' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do servidor");
    }
}

function removeImage(filename) {
    try {
        const imagePath = path.resolve(__dirname, '..', '..', 'uploads', 'images', 'user', filename);
        console.log(imagePath);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Arquivo não existe');
            };
        });
    }
    catch (err) {
        console.log(err);
    }
}