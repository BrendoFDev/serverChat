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
                let user = await processPhoto(req);
                if (!user) return res.status(400).json({ erros: ['Usuário não existe'] });

                return res.status(201).json(user);
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json("Erro interno do servidor");
    }
}

async function processPhoto(req) {
    try {

        const { filename } = req.file;
        const { id } = req.user;

        const user = await getPhotoByUserPk(id);
        if (!user) return null;

        if (user?.Photo) {
            removeImage(user.Photo.fileName);
            await user.Photo.update({ fileName: filename });
        }
        else {
            await Photo.create({
                fileName: filename,
                owner: id
            });
        }

        return user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

async function getPhotoByUserPk(userPk) {
    try {
        const user = await User.findOne({
            where: { id: userPk },
            include: { model: Photo, attributes: ['id', 'fileName'] },
            attributes: ['id', 'email', 'name']
        });

        return user;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

exports.deletePhoto = async (req, res) => {
    try {
        const user = await getPhotoByUserPk(req.user.id);

        if (!user?.Photo) return res.status(400).json({ erros: ['Usuário não possui foto'] });

        if (user?.Photo?.fileName)
            removeImage(user?.Photo?.fileName);

        await user?.Photo?.update({ fileName: null });

        return res.status(200).json();
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