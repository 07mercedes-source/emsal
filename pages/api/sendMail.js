// pages/api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const { to = "07mercedes@gmail.com", subject = "Form", html } = req.body;

  // Gerekli: Vercel üzerinde env ayarları yap (örnek aşağı)
  // process.env.SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"Emsal Panel" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });

    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
}
