import nodemailer from 'nodemailer';

if (!process.env.ADMIN_EMAIL || !process.env.EMAIL_APP_PASSWORD) {
  console.warn("WARNING: ADMIN_EMAIL and EMAIL_APP_PASSWORD must be set in .env.local to send emails.");
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});
