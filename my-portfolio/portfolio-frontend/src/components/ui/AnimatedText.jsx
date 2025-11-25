import React from "react";
import { motion as Motion } from "framer-motion";

export default function AnimatedText({ children }) {
  return (
    <Motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </Motion.h2>
  );
}
