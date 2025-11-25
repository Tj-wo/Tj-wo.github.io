import React from "react";
import AnimatedText from "../ui/AnimatedText";

export default function Hero() {
  return (
    <section id="hero" className="hero-section">
      <AnimatedText>Full-Stack Developer</AnimatedText>
      <p className="hero-sub">
        I build reliable, scalable web applications using <strong>Java (Spring Boot)</strong>, <strong>Node.js</strong>, and <strong>React</strong>.
        I focus on clean architecture, performance, and production readiness.
      </p>
      <div className="hero-buttons">
        <a href="#projects" className="btn-primary">View Projects</a>
        <a href="#contact" className="btn-primary">Contact</a>
      </div>
    </section>
  );
}
