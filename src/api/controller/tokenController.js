
const tokenService = require('../services/tokenService');

exports.authenticate = (req, res) => {
    try {
        return tokenService.verify(req,res);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

exports.refreshToken = async (req,res) => {
    try {
        return tokenService.refreshToken(req,res);
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}