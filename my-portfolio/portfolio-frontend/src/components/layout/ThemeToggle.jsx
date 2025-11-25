import React from "react";

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
