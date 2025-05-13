const emailService = require('../services/emailService');

exports.authEmail = async (req, res) => {
    try {
        return await emailService.sendAuthEmail(req, res);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao enviar email de autenticação" });
    }
}

exports.resetEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const { passcode, expirationTime } = getPasscodeAndExpirationTime();

        await emailService.sendResetEmail(email, passcode, expirationTime);
        return res.status(200).json({ message: "Email de redefinição enviado com sucesso" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao enviar email de redefinição" });
    }
}

exports.changeEmail = async (req, res) => {
    try {
        return await emailService.sendAuthEmail(req, res);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Erro ao enviar email de alteração" });
    }
}