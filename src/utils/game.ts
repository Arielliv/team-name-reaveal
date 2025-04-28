import { Guess, Team } from '@/types/game';

export const MAX_GUESSES = 6;

export function checkGuess(guess: string, team: Team): Guess {
  const letters = guess.toUpperCase().split('');
  const feedback: ('correct' | 'present' | 'absent')[] = [];
  const targetLetters = team.name.split('');

  // First pass: check for correct letters
  letters.forEach((letter, index) => {
    if (letter === targetLetters[index]) {
      feedback[index] = 'correct';
    } else {
      feedback[index] = 'absent';
    }
  });

  // Second pass: check for present letters
  letters.forEach((letter, index) => {
    if (feedback[index] === 'correct') return;

    const targetIndex = targetLetters.findIndex(
      (targetLetter, i) => targetLetter === letter && feedback[i] !== 'correct'
    );

    if (targetIndex !== -1) {
      feedback[index] = 'present';
    }
  });

  return { letters, feedback };
}

export function isGameWon(guess: string, team: Team): boolean {
  return guess.toUpperCase() === team.name;
}

export function isGameLost(guesses: Guess[]): boolean {
  return guesses.length >= MAX_GUESSES;
} 