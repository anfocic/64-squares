import { Chess } from 'chess.js';

export enum Difficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface ComputerPlayerConfig {
  difficulty: Difficulty;
  timeLimit?: number; // in milliseconds
}

export class ComputerPlayer {
  private isEngineReady = true; // Simple AI is always ready

  constructor(private config: ComputerPlayerConfig = { difficulty: Difficulty.INTERMEDIATE }) {
    console.log('Computer player ready (using simple AI)');
  }

  private getDifficultySettings(): { depth: number; time: number } {
    switch (this.config.difficulty) {
      case Difficulty.BEGINNER:
        return { depth: 3, time: 1000 };
      case Difficulty.INTERMEDIATE:
        return { depth: 8, time: 3000 };
      case Difficulty.ADVANCED:
        return { depth: 12, time: 5000 };
      case Difficulty.EXPERT:
        return { depth: 18, time: 10000 };
      default:
        return { depth: 8, time: 3000 };
    }
  }

  public async getBestMove(fen: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const move = this.getSimpleAIMove(fen);

        // Add a small delay to simulate thinking
        const settings = this.getDifficultySettings();
        setTimeout(() => {
          resolve(move);
        }, Math.min(settings.time, 2000)); // Cap at 2 seconds for demo

      } catch (error) {
        console.error('Error generating computer move:', error);
        reject(error);
      }
    });
  }

  private getSimpleAIMove(fen: string): string {
    try {
      const chess = new Chess(fen);
      const moves = chess.moves({ verbose: true });
      
      if (moves.length === 0) {
        throw new Error('No legal moves available');
      }

      // Simple AI: prioritize captures, then random moves
      const captures = moves.filter(move => move.captured);
      const checksAndAttacks = moves.filter(move => move.san.includes('+') || move.san.includes('#'));
      
      let selectedMoves = captures.length > 0 ? captures : 
                         checksAndAttacks.length > 0 ? checksAndAttacks : moves;
      
      // Add some randomness based on difficulty
      if (this.config.difficulty === Difficulty.BEGINNER) {
        // Beginners make more random moves
        selectedMoves = Math.random() < 0.7 ? moves : selectedMoves;
      }
      
      const randomMove = selectedMoves[Math.floor(Math.random() * selectedMoves.length)];
      return randomMove.from + randomMove.to + (randomMove.promotion || '');
    } catch (error) {
      console.error('Error in simple AI move generation:', error);
      return 'e2e4'; // Default fallback move
    }
  }

  public setDifficulty(difficulty: Difficulty): void {
    this.config.difficulty = difficulty;
  }

  public getDifficulty(): Difficulty {
    return this.config.difficulty;
  }

  public isReady(): boolean {
    return this.isEngineReady;
  }

  public terminate(): void {
    // Simple AI doesn't need cleanup
    this.isEngineReady = false;
  }
}

// Singleton instance for global use
let computerPlayerInstance: ComputerPlayer | null = null;

export const getComputerPlayer = (config?: ComputerPlayerConfig): ComputerPlayer => {
  if (!computerPlayerInstance) {
    computerPlayerInstance = new ComputerPlayer(config);
  }
  return computerPlayerInstance;
};

export const resetComputerPlayer = (): void => {
  if (computerPlayerInstance) {
    computerPlayerInstance.terminate();
    computerPlayerInstance = null;
  }
};
