import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // 2. Manual Validation (Replacing express-validator for Serverless)
  const errors = [];
  if (!name || name.trim().length < 2) errors.push({ msg: "Name is required (min 2 chars)" });
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push({ msg: "Valid email is required" });
  if (!message || message.trim().length < 6) errors.push({ msg: "Message is too short (min 6 chars)" });

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  // 3. Nodemailer Configuration (Matches your backend code)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT == 465, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: (process.env.SMTP_PASS || "").trim(),
    },
  });

  const mailOptions = {
    from: process.env.CONTACT_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO, // Ensure this Env Var is set!
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    
    // Handle SendGrid or SMTP specific errors
    let userMessage = "Failed to send email.";
    if (err.message && (err.message.includes('550') || err.message.includes('Sender Identity'))) {
      userMessage = "Configuration Error: Sender identity not verified.";
    }

    return res.status(500).json({ error: userMessage });
  }
}