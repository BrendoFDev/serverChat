require('dotenv').config();
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.verify = (req, res) => {
    try {
        const token = getAuthorizationFromRequest(req);

        if (!token) return res.status(401).json({ message: 'Acesso não autorizado' });

        jwt.verify(token, JWT_ACCESS_SECRET,
            (err, user) => {
                if (err?.name == 'TokenExpiredError')
                    return res.status(401).json({ logged: false });
               
                return res.json({ logged: true, user });
            });
    }
    catch (err) {
        console.log(err);
        throw new Error('Erro ao authenticar')
    }
}

exports.refreshToken = async (req, res) => {
    try {
        const refresh = getAuthorizationFromRequest(req);

        jwt.verify(refresh, JWT_REFRESH_SECRET, async (err, user) => {
            if (err?.name == 'TokenExpiredError')
                return res.status(401);

            if (! await User.findOne({where:{email: user.email},attributes:['email','user']}))
                return res.status(401);

            const token = jwt.sign(user, JWT_REFRESH_SECRET,{expiresIn: 1000 * 60 * 15 });

            return res.status(200).json({ token });
        });
    }
    catch (err) {
        console.log(err);
        throw new Error('Erro ao gerar access token');
    }
}

function getAuthorizationFromRequest(req) {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    return token;
}


exports.getTokens = (currentUser) =>{

    const token = jwt.sign(
        {
            id: currentUser.id,
            email: currentUser.email
        }, JWT_ACCESS_SECRET,
        { expiresIn: 1000 * 60 * 15 });


    const refresh = jwt.sign(
        {
            id: currentUser.id,
            email: currentUser.email
        }, JWT_REFRESH_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 * 7 });

    return { token, refresh };
}

