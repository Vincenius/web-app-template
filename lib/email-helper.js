const nodemailer = require("nodemailer");

async function sendEmail({ to }) {
  let transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"wweb.dev" <info@wweb.dev>', // sender address
    to, // list of receivers
    subject: "Hello ✔", // Subject line
    html: "<b>Hello world testy</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

const emailHelper = {
  sendEmail
}

export default emailHelper
