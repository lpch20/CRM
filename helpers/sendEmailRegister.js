const nodemailer = require("nodemailer");

const emailRegister = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transport.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: datos.email,
    subject: 'Comprobacion de cuenta en APV',
    text: 'Comprobacion de cuenta en APV',
    html: `<p>Hola: ${datos.name}, comprueba tu cuenta en APV</p>
    <p>Tu cuenta ya esta lista solo debes activarla en el siguiente enlace:</p>
    <a href="http://localhost:5173/confirm_account/${datos.token}">Comprobar Cuenta</a>
    `
  })

};


module.exports = emailRegister;