const nodemailer = require("nodemailer");
const pug = require("pug");
const { convert } = require("html-to-text");

interface dT {
  name: string;
  email: string;
  message: string;
}

export class SendEmail {
  name: string;
  to: string;
  from: string;
  message: string;

  constructor(data: dT) {
    this.name = data.name;
    this.to = `morizuqshoneye@gmail.com`;
    this.from = `Portfolio <${data.email}>`;
    this.message = data.message;
  }

  newTransporter() {
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template: any, subject:any) {
    const html = pug.renderFile(`${__dirname}/../src/views/${template}.pug`, {
      name: this.name,
      message: this.message,
      email: this.from,
      subject: `Mail from portfolio`,
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html),
    };

    await this.newTransporter().sendMail(mailOptions);
  }

  async sendMail() {
    await this.send("mail", "From Your Portfolio");
  }
};
