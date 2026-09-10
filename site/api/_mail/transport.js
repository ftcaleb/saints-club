/* Nodemailer transport from environment. Works with Gmail (app password), Resend SMTP, Brevo, Mailgun, Postmark, any SMTP. */
const nodemailer = require('nodemailer');

let cached = null;

function configured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransport() {
  if (cached) return cached;
  if (!configured()) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  cached = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    pool: false,
    connectionTimeout: 8000,
    greetingTimeout: 8000,
    socketTimeout: 12000
  });
  return cached;
}

function from() {
  return process.env.MAIL_FROM || `The Saints Club <${process.env.SMTP_USER}>`;
}

module.exports = { getTransport, configured, from };
