const nodemailer = require("nodemailer");
const { SMTP_USERNAME, SMTP_PASSWORD } = require("../configs/config");

const sendNewsLetter = async (mailData) => {
  try {
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

    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = sendNewsLetter;