const user = require('../../model/userModel');
const bcrypt = require('bcryptjs')
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET
const SALT_ROUNDS = 10;
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        if (await checkUserByEmail(Email))
            return res.status(409).json({ message: `Já existe usuário cadastrado com o email ${Email}` });
        
        const hashedPassword = await hashPassword(Password);
        
        await user.create({ name: Name, email: Email, password: hashedPassword });

        return res.status(200).json({ message: "Usuário criado com sucesso" });
    }
    catch (Exception) {
        console.log(Exception)
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

async function checkUserByEmail(userEmail) {
    const currentUser = await user.findOne({
        where: {
            email: userEmail
        }
    });
    return currentUser;
}

exports.userLogin = async (req, res) => {
    try {

        const { Email, Password } = req.body;
        const currentUser = await checkUserByEmail(Email);

        if(!currentUser)
            return res.status(500).json({ message: 'Email não cadastrado!' });

        const validPassword = await bcrypt.compare(Password, currentUser.password);

        if(!validPassword)
            return res.status(500).json({ message: 'Senha inválida!' });

        const token = jwt.sign(
            { 
                id: currentUser.id,
                email: currentUser.email 
            }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
            
                
        return res.status(200).json({ 
            message: 'Login bem-sucedido',
            token,
            user: {
                id: currentUser.id,
                name: currentUser.name,
                email: currentUser.email
            }
        });
        
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Erro ao logar' });
    }
}