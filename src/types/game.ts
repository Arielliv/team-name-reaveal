export interface Team {
  id: string;
  name: string;
  hint: string;
}

export interface Guess {
  letters: string[];
  feedback: ('correct' | 'present' | 'absent')[];
}

export interface GameState {
  currentTeam: Team;
  guesses: Guess[];
  isComplete: boolean;
  isWon: boolean;
}

export const TEAMS: Team[] = [
  {
    id: 'team1',
    name: 'ATHENA',
    hint: 'Greek goddess of wisdom and strategic warfare',
  },
  {
    id: 'team2',
    name: 'THOR',
    hint: 'Norse god of thunder and strength',
  },
  {
    id: 'team3',
    name: 'RA',
    hint: 'Egyptian sun god',
  },
  {
    id: 'team4',
    name: 'LOKI',
    hint: 'Norse trickster god',
  },
]; 