const nodemailer = require("nodemailer");

const emailRegister = async (datos) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    port:465,
    secure: true,
    logger: true,
    debug: true,
    secureConnection: false, 
    auth: {
      user: "vetcrmplataform@gmail.com",
      pass: "wwtc fdyq uatz hzoq",
    },
    tls: {
      rejectUnauthorized: false,
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