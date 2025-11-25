import React from "react";

export default function LazyImage({ src, alt, className }) {
  return <img src={src} alt={alt} loading="lazy" className={className} />;
}
