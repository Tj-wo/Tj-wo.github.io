import React from "react";
import LazyImage from "../ui/LazyImage";

export default function Projects() {
  const projectList = [
    {
      link: "https://jovantrevor-advicegenerator.netlify.app",
      img: "/images/advice-generator-preview.png",
      title: "Advice Generator",
      desc: "API-driven web app with a minimalist UI and responsive design."
    },
    {
      link: "https://jovantrevor-clipboardpage.netlify.app",
      img: "/images/clipboard-preview.png",
      title: "Clipboard Landing Page",
      desc: "Mobile-first landing page built with reusable components."
    },
    {
      link: "https://jovantrevor-ecommerceproductpage.netlify.app",
      img: "/images/e-commerce-preview.png",
      title: "E-commerce Product Page",
      desc: "Product UI with dynamic image previews and cart interactions."
    },
    {
      link: "https://jovantrevor-newslettersignup.netlify.app",
      img: "/images/newsletter-preview.png",
      title: "Newsletter Signup",
      desc: "Clean signup flow with client-side validation."
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <h3>Selected Projects</h3>
        <div className="projects-grid">
          {projectList.map((p, i) => (
            <article className="project" key={i}>
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                <LazyImage src={p.img} alt={p.title} className="project-img" />
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
