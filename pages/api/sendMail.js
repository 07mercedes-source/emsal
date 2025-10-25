import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ message: "Eksik alanlar var" });
  }

  try {
    // Gmail veya özel SMTP ayarlarını buraya koy
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER || "ornekmail@gmail.com",
        pass: process.env.GMAIL_PASS || "uygulama_şifresi",
      },
    });

    await transporter.sendMail({
      from: `"EMSAL GmbH" <${process.env.GMAIL_USER || "ornekmail@gmail.com"}>`,
      to,
      subject,
      text,
      html,
    });

    res.status(200).json({ message: "Mail başarıyla gönderildi" });
  } catch (error) {
    console.error("Mail gönderim hatası:", error);
    res.status(500).json({ message: "Mail gönderilemedi", error: error.message });
  }
}
