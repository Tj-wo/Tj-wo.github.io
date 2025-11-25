import React from "react";

export default function Skills() {
  const skills = [
    { name: "Java", icon: "fab fa-java" },
    { name: "Spring Boot", icon: "fas fa-leaf" },
    { name: "Spring MVC", icon: "fas fa-cog" },
    { name: "React", icon: "fab fa-react" },
    { name: "Node.js", icon: "fab fa-node-js" },
    { name: "PHP", icon: "fab fa-php" },
    { name: "MySQL", icon: "fas fa-database" },
    { name: "HTML/CSS", icon: "fab fa-html5" }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <h3>Core Skills</h3>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <div className="skill" key={i}>
              <i className={`${skill.icon} skill-icon`}></i>
              <div className="skill-title">{skill.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
