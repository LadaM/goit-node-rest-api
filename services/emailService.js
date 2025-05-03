import nodemailer from 'nodemailer';

export const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const email = {
    ...data,
    from: process.env.EMAIL_FROM,
  };

  await transporter.sendMail(email);
};
