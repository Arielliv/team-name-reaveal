'use client';

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, purple.500, pink.500)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="container.md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <VStack spacing={8} textAlign="center">
            <Heading
              as="h1"
              size="2xl"
              color="white"
              fontFamily="serif"
            >
              Team Name Reveal
            </Heading>
            <Text
              fontSize="xl"
              color="white"
              maxW="2xl"
            >
              Welcome to the exciting team name reveal game! Guess your new team name
              and discover the mythological inspiration behind it.
            </Text>
            <Link href="/game">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Box
                  as="button"
                  bg="white"
                  color="purple.600"
                  px={8}
                  py={4}
                  fontSize="xl"
                  fontWeight="bold"
                  borderRadius="full"
                  boxShadow="lg"
                  _hover={{
                    boxShadow: 'xl',
                    bg: 'whiteAlpha.900'
                  }}
                  transition="all 0.2s"
                >
                  Start the Game
                </Box>
              </motion.div>
            </Link>
          </VStack>
        </motion.div>
      </Container>
    </Box>
  );
}
