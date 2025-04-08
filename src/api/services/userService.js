const bcrypt = require('bcryptjs');

const tokenService = require('../services/tokenService')
const User = require('../model/userModel');
const SALT_ROUNDS = 10;

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (await User.findOne({where:{email}, attributes:['email','name']}))
            return res.status(400).json({ message: `Já existe usuário cadastrado com o email ${email}` });

        const hashedPassword = await hashPassword(password);

        await User.create({ name, email, password: hashedPassword });

        return res.status(201).json({ message: "Usuário criado com sucesso" });
    }
    catch (Exception) {
        console.log(Exception)
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}

async function hashPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

exports.userLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const currentUser = await User.findOne({where:{ email }, attributes:['id','email','name','password']});
        if (!currentUser)
            return res.status(500).json({ message: 'Email não cadastrado!' });
        
        const validPassword = await bcrypt.compare(password, currentUser.password);
        
        if (!validPassword)
            return res.status(500).json({ message: 'Senha inválida!' });

        const { token, refresh } = tokenService.getTokens(currentUser);

        return res.status(200).json({
            message: 'Login bem-sucedido',
            token,
            refresh,
            user: {id: currentUser.id,name: currentUser.name, email: currentUser.email}
        });

    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'Erro ao logar' });
    }
}

exports.getUser = async (req, res)=>{
    try {
        const tokenUser = req.user;
        const user = User.findOne({
            where:{
                email: tokenUser.email
            },
            attributes: ["name", "email"],
        });
        
        return res.status(200).json({user});
    }
    catch (Exception) {
        console.log(Exception)
        return res.status(500).json({ message: 'Erro ao criar usuário' });
    }
}
