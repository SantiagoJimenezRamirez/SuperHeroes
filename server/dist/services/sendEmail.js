"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/sendEmail.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
// Configuración del correo electrónico
const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'destinatario@example.com',
    subject: 'Change of password',
    text: `You have requested a password change on our page 
  to change the password click on the following link`
};
// Enviar el correo
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Correo enviado: ' + info.response);
});
