const photoService = require('../services/userPhotoService');

exports.uploadPhoto = async (req, res) => {
    try {
        return await photoService.updatePhoto(req, res);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: ['Erro interno do servidor ou aluno não existe']
        });
    }
}

exports.deletePhoto = async (req, res) => {
    try {
        return await photoService.deletePhoto(req, res);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: ['Erro interno do servidor ou aluno não existe']
        });
    }
}