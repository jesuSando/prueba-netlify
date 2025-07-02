const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  const { nombre, email, mensaje } = JSON.parse(event.body || '{}');

  if (!nombre || !email || !mensaje) {
    return {
      statusCode: 400,
      body: "Faltan datos del formulario",
    };
  }

  const password = process.env.PASSWORD

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ekonomicbj@gmail.com",
      pass: password,
    },
  });

  const mailOptions = {
    from: email,
    to: "ekonomicbj@gmail.com",
    subject: `Nuevo mensaje de contacto de ${nombre}`,
    text: mensaje,
    html: `
      <h2>Nuevo mensaje de contacto</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ mensaje: "Correo enviado exitosamente" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al enviar el correo", detalles: error.message }),
    };
  }
};
