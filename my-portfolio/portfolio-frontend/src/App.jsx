import React from "react";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import { motion as Motion } from "framer-motion";

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <Hero />
          <Skills />
          <About />
          <Projects />
          <Contact />
        </Motion.div>
      </main>
      <footer className="footer">
        <div className="container">&copy; {new Date().getFullYear()} Jovan Trevor Ssemivule</div>
      </footer>
    </div>
  );
}
export default App;