'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { TEAMS } from '@/types/game';

export default function TeamNamePage() {
  useEffect(() => {
    // Create confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timer = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-6 font-serif">
          Congratulations! 🎉
        </h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Your New Team Name is:
          </h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            className="text-5xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-lg shadow-lg"
          >
            {TEAMS[0].name}
          </motion.div>
          <p className="text-xl text-white mt-4">
            {TEAMS[0].hint}
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
} 