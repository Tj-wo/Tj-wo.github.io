const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_PORT == 465, // use TLS for port 587, SSL for 465
  auth: {
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS || "").trim(), // remove any whitespace
  },
});

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("message").trim().isLength({ min: 6 }).withMessage("Message is too short"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    const { name, email, message } = req.body;
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
      return res.json({ message: "Message sent successfully" });
    } catch (err) {
      // log full error for troubleshooting
      console.error("Mail error:", err && err.message ? err.message : err);
      // If the transport provides a response body (SendGrid SMTP wrapper or other)
      const sgErrors = err && err.response && err.response.body && err.response.body.errors;

      // Build a helpful message for known SendGrid sender-identity problem
      let userMessage = "Failed to send email. Please try again later.";
      if (sgErrors && Array.isArray(sgErrors) && sgErrors.length) {
        userMessage = sgErrors[0].message || userMessage;
        console.error("SendGrid response errors:", sgErrors);
      }

      // Common SMTP 550 response or explicit SendGrid text
      if ((err && err.message && err.message.includes('550')) || (err && err.message && err.message.includes('Sender Identity')) || (typeof userMessage === 'string' && userMessage.toLowerCase().includes('sender identity'))) {
        userMessage = "SendGrid rejected the 'from' address: your FROM address must be a verified Sender Identity in SendGrid. Verify the sender or use a verified address in your CONTACT_FROM environment variable.";
      }

      return res.status(500).json({ error: userMessage });
    }
  }
);

module.exports = router;
