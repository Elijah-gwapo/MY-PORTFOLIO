'use client';

import React, { useState, useEffect, useCallback } from 'react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

export default function HackerText({ text, className, speed = 40 }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovering, setIsHovering] = useState(false);

  const decrypt = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split("").map((char, index) => {
          if (index < iteration) return text[index];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, speed);
    
    return () => clearInterval(interval);
  }, [text, speed]);

  useEffect(() => {
    decrypt();
  }, [decrypt]);

  return (
    <span 
      className={className}
      onMouseEnter={() => {
        if (!isHovering) {
          setIsHovering(true);
          decrypt();
          setTimeout(() => setIsHovering(false), text.length * speed * 2);
        }
      }}
    >
      {displayText}
    </span>
  );
}
