const nodemailer = require('nodemailer');

exports.activationEmailTemplate = ({ to, url, token }) => {
  return {
    to,
    subject: 'Account Activation',
    html: `
      <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=us-ascii">
      </head>
      <body>
        <p>Hi there,</p>
        <p>Your user account has been created. To activate it, click <a href=${url}/${token}>here</a>.
        <p>The Dizzy team</p>
      </body>
      </html>
    `,
  };
};

exports.sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
  });

  console.log(`Email sent with message id %s`.green, info.messageId);
};
