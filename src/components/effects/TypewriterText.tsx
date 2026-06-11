"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

export default function TypewriterText({
  texts,
  speed = 80,
  deleteSpeed = 40,
  pauseDuration = 2000,
  className,
}: TypewriterTextProps) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const fullText = texts[textIndex];

    if (!isDeleting) {
      setCurrentText(fullText.substring(0, currentText.length + 1));
      if (currentText.length === fullText.length) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      setCurrentText(fullText.substring(0, currentText.length - 1));
      if (currentText.length === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
        return;
      }
    }
  }, [currentText, isDeleting, textIndex, texts, pauseDuration]);

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, deleteSpeed, speed]);

  return (
    <span className={className}>
      {currentText}
      <span className="animate-blink text-primary-500 ml-0.5">|</span>
    </span>
  );
}
