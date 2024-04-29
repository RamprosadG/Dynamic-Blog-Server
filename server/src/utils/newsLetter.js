const nodemailer = require("nodemailer");
const { SMTP_USERNAME, SMTP_PASSWORD } = require("../configs");

const sendNewsLetter = async (mailData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: SMTP_USERNAME,
      pass: SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: SMTP_USERNAME,
    to: mailData.email,
    subject: mailData.subject,
    html: mailData.message,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendNewsLetter;
