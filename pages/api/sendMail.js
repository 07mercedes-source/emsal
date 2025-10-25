// pages/api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ ok: false, msg: "Method not allowed" });

  const { to, subject, text, html } = req.body;
  if (!to || !subject) return res.status(400).json({ ok: false, msg: "Eksik parametre" });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: {
        user: process.env.GMAIL_USER || process.env.SMTP_USER,
        pass: process.env.GMAIL_PASS || process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"EMSAL GmbH" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html
    });

    return res.status(200).json({ ok: true, msg: "Gönderildi" });
  } catch (err) {
    console.error("sendMail error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
