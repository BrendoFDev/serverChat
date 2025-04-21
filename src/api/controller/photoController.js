const photoService = require('../services/photoService');

exports.uploadPhoto = async (req, res) => {
    try {
        return await photoService.uploadPhoto(req, res);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: ['Erro interno do servidor ou aluno não existe']
        });
    }
}