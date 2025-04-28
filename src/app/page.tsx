'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@chakra-ui/react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-6 font-serif">
          Team Name Reveal
        </h1>
        <p className="text-xl text-white mb-8 max-w-2xl">
          Welcome to the exciting team name reveal game! Guess your new team name
          and discover the mythological inspiration behind it.
        </p>
        <Link href="/game">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              colorScheme="whiteAlpha"
              bg="white"
              color="purple.600"
              px={8}
              py={6}
              fontSize="xl"
              fontWeight="bold"
              borderRadius="full"
              boxShadow="lg"
              _hover={{
                transform: 'scale(1.05)',
                boxShadow: 'xl',
                bg: 'whiteAlpha.900'
              }}
              transition="all 0.2s"
            >
              Start the Game
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </main>
  );
}
