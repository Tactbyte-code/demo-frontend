"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function ScrollButton() {
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if user is near the bottom (within 100px)
            const bottomReached = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
            setIsAtBottom(bottomReached);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollAction = () => {
        if (isAtBottom) {
            // Scroll to Top
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            // Scroll to Bottom
            window.scrollTo({
                top: document.body.offsetHeight,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={handleScrollAction}
            className="fixed bottom-10 right-10 z-50 p-4 bg-primary text-white rounded-full shadow-2xl shadow-primary/40 border border-white/20 hover:scale-110 active:scale-95 transition-all group cursor-pointer"
            aria-label={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key={isAtBottom ? 'up' : 'down'}
                    initial={{ y: isAtBottom ? 10 : -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: isAtBottom ? -10 : 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {isAtBottom ? (
                        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    ) : (
                        <ArrowDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.button>
    );
}