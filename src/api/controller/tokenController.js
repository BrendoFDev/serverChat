require('dotenv').config();
const JWT_SECRET = process.env.JWT_ACCESS_SECRET;
const jwt = require('jsonwebtoken');

exports.authenticate = (req,res) =>{
    const {token} = req.headers;
    
    if (!token) return res.status(401).json({ message: 'Acesso não autorizado' });
    
    jwt.verify(token, JWT_SECRET,
        (err, user) => {

        if (err){
            console.log(err);
            return res.status(401).json({ logged: false });
        }

        res.json({ logged: true, user });
    });
}
