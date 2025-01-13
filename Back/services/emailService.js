const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "julieth.hoyosv17@gmail.com",
    pass: "xrsk lfay kmji wxsd",
  },
});

const enviarCorreo = async ({to, subject }) => {
  try {
    const templatePath = path.join(__dirname, "../templates/recordarContraseña.html");
    let htmlTemplate = fs.readFileSync(templatePath, "utf8");

    const info = await transporter.sendMail({
      from: '"One Piece App ⚓" <julieth.hoyosv17@gmail.com>',
      to,
      subject,
      html: htmlTemplate,
    });

    console.log("Correo enviado con éxito:", info.messageId)
    return {succes: true, messageId: info.messageId};
  } catch (error) {
    console.error("Error al enviar el correo:", error)
    return {succes: false, error}
  }
}

module.exports = { enviarCorreo };
