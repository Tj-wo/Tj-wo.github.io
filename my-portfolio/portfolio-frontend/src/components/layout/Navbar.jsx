import React from "react";
import ThemeToggle from "./ThemeToggle";
import useDarkMode from "../../hooks/useDarkMode";

export default function Navbar() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <header>
      <div className="container">
        <h1>Jovan Trevor</h1>

        <nav>
          <ul className="nav-menu">
            <li><a href="#hero">Home</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
            <li style={{ marginLeft: '10px' }}>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
