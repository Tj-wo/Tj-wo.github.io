const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  // validation
  const errors = [];
  if (!name || name.trim().length < 2) errors.push({ msg: "Name is required (min 2 chars)" });
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.push({ msg: "Valid email is required" });
  if (!message || message.trim().length < 6) errors.push({ msg: "Message is too short (min 6 chars)" });

  if (errors.length > 0) return res.status(422).json({ errors });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_PORT == 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: (process.env.SMTP_PASS || "").trim(),
    },
  });

  const mailOptions = {
    from: process.env.CONTACT_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO,
    replyTo: email,
    subject: `Portfolio contact from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Message sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
});

module.exports = router; 
