'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import { keyframes } from '@emotion/react';
import { motion } from 'framer-motion';
import { TEAMS } from '@/types/game';
import { checkGuess, isGameWon, isGameLost, MAX_GUESSES } from '@/utils/game';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/modal';
import { ArrowBackIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
];

const flipAnimation = keyframes`
  from { transform: rotateX(0deg); }
  50% { transform: rotateX(90deg); }
  to { transform: rotateX(0deg); }
`;

export default function GamePage() {
  const router = useRouter();
  const toast = useToast();
  const [currentTeam] = useState(TEAMS[0]);
  const [guesses, setGuesses] = useState<Array<{ letters: string[]; feedback: ('correct' | 'present' | 'absent')[] }>>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [keyboardState, setKeyboardState] = useState<Record<string, 'correct' | 'present' | 'absent' | 'unused'>>({});
  const [showAnimation, setShowAnimation] = useState(false);
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentHint, setCurrentHint] = useState<string>('');

  const hints = [
    `The name has ${currentTeam.name.length} letters`,
    `The name starts with ${currentTeam.name[0]}`,
    currentTeam.hint
  ];

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => {
        router.push('/team-name');
      }, 2000);
    }
  }, [isComplete, router]);

  const handleGuess = () => {
    if (currentGuess.length !== currentTeam.name.length) {
      toast({
        title: 'Invalid guess',
        description: `Please enter a ${currentTeam.name.length}-letter word`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newGuess = checkGuess(currentGuess, currentTeam);
    setGuesses([...guesses, newGuess]);
    setShowAnimation(true);

    // Update keyboard state
    const newKeyboardState = { ...keyboardState };
    currentGuess.split('').forEach((letter, index) => {
      const feedback = newGuess.feedback[index];
      if (!newKeyboardState[letter] || feedback === 'correct') {
        newKeyboardState[letter] = feedback;
      }
    });
    setKeyboardState(newKeyboardState);

    setCurrentGuess('');

    if (isGameWon(currentGuess, currentTeam)) {
      setIsWon(true);
      setIsComplete(true);
      toast({
        title: 'Congratulations! 🎉',
        description: 'You guessed the team name correctly!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } else if (isGameLost([...guesses, newGuess])) {
      setIsComplete(true);
      toast({
        title: 'Game Over',
        description: `The team name was ${currentTeam.name}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    setTimeout(() => setShowAnimation(false), 500);
  };

  const handleKeyPress = (key: string) => {
    if (isComplete) return;
    
    if (key === 'ENTER') {
      handleGuess();
    } else if (key === '⌫') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < currentTeam.name.length) {
      setCurrentGuess(prev => prev + key);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (event.key === 'Backspace') {
        handleKeyPress('⌫');
      } else if (/^[A-Za-z]$/.test(event.key)) {
        handleKeyPress(event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess]);

  const getTileColor = (feedback: 'correct' | 'present' | 'absent') => {
    switch (feedback) {
      case 'correct':
        return 'green.500';
      default:
        return 'transparent';
    }
  };

  const getKeyColor = (key: string) => {
    const state = keyboardState[key];
    if (!state) return 'whiteAlpha.200';
    switch (state) {
      case 'correct':
        return 'green.500';
      default:
        return 'whiteAlpha.200';
    }
  };

  const handleHintClick = (index: number) => {
    if (!revealedHints.includes(index)) {
      setCurrentHint(hints[index]);
      setRevealedHints([...revealedHints, index]);
      onOpen();
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack gap={8}>
        <Box textAlign="center" w="full">
          <Link href="/">
            <Button
              leftIcon={<ArrowBackIcon />}
              colorScheme="purple"
              variant="ghost"
              position="absolute"
              left={4}
              top={4}
              _hover={{ transform: 'scale(1.05)' }}
              transition="all 0.2s"
            >
              Back to Home
            </Button>
          </Link>
          <Heading as="h1" size="2xl" mb={4}>
            Guess Your Team Name
          </Heading>
          <HStack gap={4} justify="center" mb={4}>
            {hints.map((_, index) => (
              <Button
                key={index}
                onClick={() => handleHintClick(index)}
                colorScheme={revealedHints.includes(index) ? 'gray' : 'purple'}
                variant={revealedHints.includes(index) ? 'outline' : 'solid'}
                size="sm"
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              >
                Hint {index + 1}
              </Button>
            ))}
          </HStack>
        </Box>

        {isComplete && !isWon && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/team-name">
              <Button
                colorScheme="purple"
                size="lg"
                px={8}
                py={6}
                fontSize="xl"
                fontWeight="bold"
                borderRadius="full"
                boxShadow="lg"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: 'xl'
                }}
                transition="all 0.2s"
              >
                Reveal Team Name
              </Button>
            </Link>
          </motion.div>
        )}

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="gray.800" color="white">
            <ModalHeader>Hint Revealed!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Text fontSize="lg">{currentHint}</Text>
              </motion.div>
            </ModalBody>
          </ModalContent>
        </Modal>

        <Center w="full">
          <Grid
            templateColumns={`repeat(${currentTeam.name.length}, 1fr)`}
            gap={2}
            maxW="md"
          >
            {Array.from({ length: MAX_GUESSES * currentTeam.name.length }).map((_, index) => {
              const rowIndex = Math.floor(index / currentTeam.name.length);
              const colIndex = index % currentTeam.name.length;
              const guess = guesses[rowIndex];
              const letter = guess?.letters[colIndex] || (rowIndex === guesses.length ? currentGuess[colIndex] : '');
              const feedback = guess?.feedback[colIndex];
              const isRevealing = showAnimation && rowIndex === guesses.length - 1;
              const isCorrect = feedback === 'correct';

              return (
                <MotionBox
                  key={index}
                  initial={false}
                  animate={{
                    scale: isRevealing ? [1, 1.1, 1] : 1,
                    backgroundColor: isCorrect ? 'green.500' : 'transparent',
                    borderColor: letter ? 'whiteAlpha.400' : 'whiteAlpha.200'
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: isRevealing ? colIndex * 0.1 : 0
                  }}
                  border="2px solid"
                  w="60px"
                  h="60px"
                  minW="60px"
                  minH="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="2xl"
                  fontWeight="bold"
                  borderRadius="md"
                  position="relative"
                  overflow="hidden"
                >
                  {letter}
                  {isCorrect && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(72, 187, 120, 0.2)',
                        pointerEvents: 'none'
                      }}
                    />
                  )}
                </MotionBox>
              );
            })}
          </Grid>
        </Center>

        <Box w="full" maxW="2xl">
          {KEYBOARD_ROWS.map((row, rowIndex) => (
            <HStack key={rowIndex} justify="center" gap={1.5} my={1.5}>
              {row.map((key) => {
                const isSpecialKey = key === 'ENTER' || key === '⌫';
                return (
                  <Button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    bg={getKeyColor(key)}
                    color="white"
                    _hover={{ opacity: 0.8 }}
                    h="14"
                    minW={isSpecialKey ? '16' : '10'}
                    px={isSpecialKey ? 4 : 0}
                    fontSize={isSpecialKey ? 'sm' : 'md'}
                    fontWeight="bold"
                  >
                    {key}
                  </Button>
                );
              })}
            </HStack>
          ))}
        </Box>
      </VStack>
    </Container>
  );
} 