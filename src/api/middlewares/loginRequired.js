require('dotenv').config();
const tokenService = require("../services/tokenService");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const jwt = require('jsonwebtoken');

exports.AuthenticateToken = (req, res, next) => {
    try {
        const token = tokenService.getAuthorizationFromRequest(req);
        
        if (!token) return res.status(401).json({ message: 'Acesso não autorizado' });

        jwt.verify(token, JWT_ACCESS_SECRET,
            (err, user) => {
                if (err?.name == 'TokenExpiredError')
                    return res.status(401).json({ logged: false });
                req.user = user;
                next();
            });
    }
    catch (err) {
        console.log(err);
        throw new Error('Erro ao authenticar')
    }
}