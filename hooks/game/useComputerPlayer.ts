import { useState, useEffect, useCallback } from 'react';
import { getComputerPlayer, Difficulty, ComputerPlayer } from '@/services/computerPlayer';

export interface UseComputerPlayerReturn {
  computerPlayer: ComputerPlayer;
  isThinking: boolean;
  difficulty: Difficulty;
  isReady: boolean;
  getBestMove: (fen: string) => Promise<string>;
  setDifficulty: (difficulty: Difficulty) => void;
  thinkingTime: number;
}

export const useComputerPlayer = (initialDifficulty: Difficulty = Difficulty.INTERMEDIATE): UseComputerPlayerReturn => {
  const [computerPlayer] = useState(() => getComputerPlayer({ difficulty: initialDifficulty }));
  const [isThinking, setIsThinking] = useState(false);
  const [difficulty, setDifficultyState] = useState(initialDifficulty);
  const [isReady, setIsReady] = useState(false);
  const [thinkingTime, setThinkingTime] = useState(0);

  useEffect(() => {
    // Check if computer player is ready
    const checkReady = () => {
      setIsReady(computerPlayer.isReady());
    };

    checkReady();
    
    // Poll for readiness if not ready yet
    const interval = setInterval(() => {
      if (!computerPlayer.isReady()) {
        checkReady();
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [computerPlayer]);

  const getBestMove = useCallback(async (fen: string): Promise<string> => {
    setIsThinking(true);
    setThinkingTime(0);

    // Start thinking timer
    const startTime = Date.now();
    const thinkingInterval = setInterval(() => {
      setThinkingTime(Date.now() - startTime);
    }, 100);

    try {
      const move = await computerPlayer.getBestMove(fen);
      return move;
    } catch (error) {
      console.error('Error getting computer move:', error);
      throw error;
    } finally {
      clearInterval(thinkingInterval);
      setIsThinking(false);
      setThinkingTime(0);
    }
  }, [computerPlayer]);

  const setDifficulty = useCallback((newDifficulty: Difficulty) => {
    computerPlayer.setDifficulty(newDifficulty);
    setDifficultyState(newDifficulty);
  }, [computerPlayer]);

  return {
    computerPlayer,
    isThinking,
    difficulty,
    isReady,
    getBestMove,
    setDifficulty,
    thinkingTime,
  };
};
