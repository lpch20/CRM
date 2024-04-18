const nodemailer = require("nodemailer");

const emailPasswordRecovery = async (datos) => {
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
    subject: "Restablece tu password",
    text: "Restablece tu password",
    html: `<p>Hola: ${datos.name}, has solicitado restablecer tu password</p>

    <p>Sigue el siguiente enlace para restablecer tu contraseña</p>
    <a href="http://localhost:5173/newPassword/${datos.token}">Restablece tu contraseña ahora</a>
    `,
  });
};

module.exports = emailPasswordRecovery;
