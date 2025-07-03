"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variant, Transition, HTMLMotionProps } from "framer-motion";
import { useState, useEffect } from "react";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"span">;
  className?: string;
}

export default function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className={cn("overflow-hidden px-4 py-2", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          className={cn("", className)}
          key={words[index]}
          initial={framerProps.initial}
          animate={framerProps.animate}
          exit={framerProps.exit}
          transition={{ ...framerProps.transition, ease: "easeInOut" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
} 