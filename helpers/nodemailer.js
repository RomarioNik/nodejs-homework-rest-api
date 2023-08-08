import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: "rprikhoda@ukr.net",
    pass: process.env.MAIL_UKR,
  },
});

const sendEmail = async (data) => {
  const info = await transport.sendMail({ ...data, from: "rprikhoda@ukr.net" });
  console.log("Message sent: %s", info.messageId);
};

export default sendEmail;
