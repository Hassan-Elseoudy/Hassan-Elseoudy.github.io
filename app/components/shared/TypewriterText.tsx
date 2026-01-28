"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import { motion, useInView } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    speed?: number;
    className?: string;
    startDelay?: number;
}

export default function TypewriterText({
    text,
    speed = 20,
    className = "",
    startDelay = 500,
}: TypewriterTextProps) {
    const [displayedText, setDisplayedText] = useState("");
    const [isComplete, setIsComplete] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-50px" });

    useEffect(() => {
        if (!isInView || hasStarted) return;

        // Start delay before typing begins
        const startTimer = setTimeout(() => {
            setHasStarted(true);
        }, startDelay);

        return () => clearTimeout(startTimer);
    }, [isInView, startDelay, hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        let currentIndex = 0;
        const timer = setInterval(() => {
            if (currentIndex < text.length) {
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsComplete(true);
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, hasStarted]);

    // Split text into paragraphs for proper rendering
    const paragraphs = text.split("\n\n");
    const displayedParagraphs = displayedText.split("\n\n");

    return (
        <div ref={ref} className={className}>
            {paragraphs.map((paragraph, index) => {
                const displayedParagraph = displayedParagraphs[index] || "";
                const isCurrentParagraph = displayedText.length > text.indexOf(paragraph) &&
                    displayedText.length <= text.indexOf(paragraph) + paragraph.length + 2;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: displayedParagraph.length > 0 ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className={`mb-4 last:mb-0 ${index < displayedParagraphs.length ? "" : "opacity-0"}`}>
                            {displayedParagraph}
                            {/* Blinking cursor */}
                            {isCurrentParagraph && !isComplete && (
                                <motion.span
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{
                                        repeat: Infinity,
                                        duration: 0.8,
                                        ease: "linear"
                                    }}
                                >
                                    <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 align-middle" />
                                </motion.span>
                            )}
                        </p>
                    </motion.div>
                );
            })}
            {/* Final cursor after completion */}
            {isComplete && (
                <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <span className="inline-block w-0.5 h-5 bg-blue-500 ml-0.5 align-middle" />
                </motion.span>
            )}
        </div>
    );
}
