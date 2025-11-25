import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = new FormData(e.target);
    const body = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message")
    };

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      let data = {};
      try {
        const text = await res.text();
        if (text) {
          data = JSON.parse(text);
        }
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr, "Response text:", await res.clone().text());
      }

      if (res.ok) {
        setStatus({ type: "success", message: data.message || "Message sent successfully!", sent: body.message });
        e.target.reset();
      } else {
        setStatus({ type: "error", message: data.error || data.errors?.[0]?.msg || "Failed to send message" });
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus({ type: "error", message: "Network error. Ensure the backend is running at http://localhost:4000" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <h3>Contact</h3>
        <p>If you'd like to discuss a role, freelance work or an idea — send a message below.</p>

        <form onSubmit={handleSubmit} id="contactForm" className="contact-form">
          <div>
            <label>Name</label>
            <input name="name" type="text" required placeholder="Your name" />
          </div>

          <div>
            <label>Email</label>
            <input name="email" type="email" required placeholder="your@email.com" />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label>Message</label>
            <textarea name="message" rows="5" required placeholder="Your message here..." />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <div className={`form-status ${status.type === "success" ? "success" : "error"}`}>
            <div>{status.message}</div>
            {status.type === "success" && status.sent && (
              <div style={{ marginTop: 10, fontWeight: 500 }}>
                Your message: "{status.sent}"
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
