// pages/api/sendMail.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Yalnızca POST isteği kabul edilir");

  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false, // 465 ise true olmalı
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"EMSAL Sistem" <${process.env.SMTP_USER}>`,
      to: process.env.NEXT_PUBLIC_ADMIN_EMAIL,
      subject: `Yeni İletişim Mesajı: ${name}`,
      text: `Gönderen: ${name} (${email})\n\nMesaj:\n${message}`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
    res.status(500).json({ success: false, error: "Mail gönderilemedi" });
  }
}
