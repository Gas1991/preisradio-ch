import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
})

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL!   // destinataire visible
export const SMTP_FROM     = process.env.SMTP_USER!        // expéditeur autorisé par serv00
