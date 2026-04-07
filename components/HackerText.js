'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function HackerText({ text, className, speed = 40, delay = 0 }) {
  const [displayText, setDisplayText] = useState(text);
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  const decrypt = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Ensure it ends exactly on the text
      }
      iteration += 1 / 3;
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setTimeout(() => {
            decrypt();
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [decrypt, delay]);

  return (
    <span 
      ref={containerRef}
      className={className}
    >
      {displayText}
    </span>
  );
}
