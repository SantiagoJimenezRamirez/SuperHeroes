// src/sendEmail.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
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
