const sessionModel = require('../database/services/sessionService')

exports.autenticateSession = (req, res) => {
    try {
        const currentuser = req.body;
        console.log(currentuser)
        if (req.session && req.session.user) {
            console.log("usuário Logado")
            res.status(200).json({ user: req.session.user , logged:true})
        }
        else {
            console.log("usuário não logado")
            res.status(200).json({ user: null , logged: false})
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Erro ao logar pelo session" })
    }
}