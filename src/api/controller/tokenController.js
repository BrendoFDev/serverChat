require('dotenv').config();
const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH = process.env.JWT_REFRESH_SECRET;
const jwt = require('jsonwebtoken');

const userService = require('../database/services/userService');

exports.authenticate = (req, res) => {
    try {
        const { token } = req.headers;

        if (!token) return res.status(401).json({ message: 'Acesso não autorizado' });

        jwt.verify(token, JWT_SECRET,
            (err, user) => {
                if (err?.name == 'TokenExpiredError')
                    return res.status(401).json({ logged: false });

                res.json({ logged: true, user });
            });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}

exports.refreshToken = async (refresh) => {
    try {
        jwt.verify(refresh, JWT_REFRESH, async (err, user) => {
            if (err?.name == 'TokenExpiredError') 
                return res.status(401);
            
            if (! await userService.findOne(user.name, user.email))
                return res.status(401);

            const token = jwt.sign(user, JWT_REFRESH,  { expiresIn: 1000 * 60 * 15 });

            return res.status(200).json({token});
        });
    }
    catch (err) {
        return res.status(500).json({ error: 'Erro interno do servidor' })
    }
}