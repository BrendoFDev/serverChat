const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const tokenService = require('../services/tokenService');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'brendo.dkry@gmail.com',
    pass: process.env.EMAIL_ACCOUNT_PASSWORD
  }
});

exports.sendAuthEmail = async (req, res) => {
  try {

    const { email } = req.body;

    const templatePath = path.join(__dirname, '..', 'templates', 'authTemplate.html');
    let html = fs.readFileSync(templatePath, 'utf-8');

    const { passcode, expirationTime } = getPasscodeAndExpirationTime();

    html = html.replace('{{passcode}}', passcode).replace('{{time}}', expirationTime);

    const info = await sendMail(to, html);
    console.table(info);
    return res.status(200).json({});

  }
  catch (err) {
    console.log(err);
    res.status(500).json({ err: ["Erro ao enviar email de autenticação"] });
  }
}

function getPasscodeAndExpirationTime() {

  const passcode = Math.floor(100000 + Math.random() * 900000); // Código de 6 dígitos
  const expirationTime = new Date(Date.now() + 15 * 60000).toLocaleTimeString('pt-BR');

  return { passcode, expirationTime };
}

exports.sendResetEmail = (to, passcode, expirationTime) => {

  const templatePath = path.join(__dirname, '..', 'templates', 'resetTemplate.html');
  let html = fs.readFileSync(templatePath, 'utf-8');

  html = html.replace('{{passcode}}', passcode).replace('{{time}}', expirationTime);
  sendEmai(to, html);
}


async function sendEmai(to, html) {

  const mailOptions = {
    from: '"Live Together" brendo.dkry@gmail.com',
    to,
    subject: 'Código de Verificação',
    html,
  };

  return await transporter.sendMail(mailOptions);
}