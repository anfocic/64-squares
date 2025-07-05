import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import {Chess} from "chess.js";
import { useComputerPlayer } from "@/hooks/game/useComputerPlayer";
import { Difficulty } from "@/services/computerPlayer";

export enum GameMode {
    HUMAN_VS_HUMAN = 'human_vs_human',
    HUMAN_VS_COMPUTER = 'human_vs_computer',
    COMPUTER_VS_COMPUTER = 'computer_vs_computer'
}

type GameContextProps = {
    // Game state
    game: Chess;
    fen: string;
    isWhite: boolean;
    status: string;
    gameId: string | null;
    gameMode: GameMode;

    // Game actions
    makeMove: (from: string, to: string) => boolean;
    resetGame: () => void;
    setPlayerOrientation: (isWhite: boolean) => void;
    loadGame: (fen: string) => void;
    setGameMode: (mode: GameMode) => void;

    // Game info
    isGameOver: boolean;
    winner: 'white' | 'black' | 'draw' | null;
    currentTurn: 'w' | 'b';

    // Computer player
    isComputerThinking: boolean;
    computerDifficulty: Difficulty;
    setComputerDifficulty: (difficulty: Difficulty) => void;
    isComputerTurn: boolean;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({children}: { children: React.ReactNode }) => {
    const [game, setGame] = useState(() => new Chess());
    const [fen, setFen] = useState(game.fen());
    const [isWhite, setIsWhite] = useState(true);
    const [status, setStatus] = useState('');
    const [gameId, setGameId] = useState<string | null>(null);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.HUMAN_VS_HUMAN);

    // Computer player integration
    const {
        isThinking: isComputerThinking,
        difficulty: computerDifficulty,
        setDifficulty: setComputerDifficulty,
        getBestMove,
        isReady: isComputerReady
    } = useComputerPlayer();

    // Check if it's computer's turn
    const isComputerTurn = (gameMode === GameMode.HUMAN_VS_COMPUTER &&
                           ((isWhite && game.turn() === 'b') || (!isWhite && game.turn() === 'w'))) ||
                          (gameMode === GameMode.COMPUTER_VS_COMPUTER);

    const makeMove = useCallback((from: string, to: string): boolean => {
        try {
            const move = game.move({ from, to, promotion: 'q' });
            if (move) {
                setFen(game.fen());
                setStatus('');
                return true;
            }
        } catch (err) {
            console.warn('Invalid move attempted:', err);
        }

        setStatus(`Invalid move: ${from} → ${to}`);
        return false;
    }, [game]);

    const resetGame = useCallback(() => {
        const newGame = new Chess();
        setGame(newGame);
        setFen(newGame.fen());
        setStatus('');
        setGameId(null);
    }, []);

    // Computer move logic
    const makeComputerMove = useCallback(async () => {
        if (!isComputerReady || !isComputerTurn || game.isGameOver()) {
            return;
        }

        try {
            const bestMove = await getBestMove(game.fen());

            // Parse the move (e.g., "e2e4" -> from: "e2", to: "e4")
            if (bestMove && bestMove.length >= 4) {
                const from = bestMove.substring(0, 2);
                const to = bestMove.substring(2, 4);
                const promotion = bestMove.length > 4 ? bestMove.substring(4) : undefined;

                const move = game.move({ from, to, promotion });
                if (move) {
                    setFen(game.fen());
                    const playerColor = move.color === 'w' ? 'White' : 'Black';
                    if (gameMode === GameMode.COMPUTER_VS_COMPUTER) {
                        setStatus(`${playerColor} Computer played: ${move.san}`);
                    } else {
                        setStatus(`Computer played: ${move.san}`);
                    }
                }
            }
        } catch (error) {
            console.error('Computer move error:', error);
            setStatus('Computer move failed');
        }
    }, [game, getBestMove, isComputerReady, isComputerTurn]);

    // Auto-play computer moves
    useEffect(() => {
        if (isComputerTurn && !isComputerThinking && !game.isGameOver()) {
            // For computer vs computer, add a longer delay to see the moves
            const delay = gameMode === GameMode.COMPUTER_VS_COMPUTER ? 1500 : 500;

            const timer = setTimeout(() => {
                makeComputerMove();
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [isComputerTurn, isComputerThinking, game.fen(), makeComputerMove, gameMode]);

    const setPlayerOrientation = useCallback((orientation: boolean) => {
        setIsWhite(orientation);
    }, []);

    const loadGame = useCallback((newFen: string) => {
        try {
            const newGame = new Chess(newFen);
            setGame(newGame);
            setFen(newGame.fen());
            setStatus('');
        } catch (err) {
            console.error('Invalid FEN:', err);
            setStatus('Invalid game position');
        }
    }, []);

    const isGameOver = game.isGameOver();
    const winner = game.isCheckmate()
        ? (game.turn() === 'w' ? 'black' : 'white')
        : game.isDraw()
        ? 'draw'
        : null;
    const currentTurn = game.turn();

    const contextValue: GameContextProps = {
        // Game state
        game,
        fen,
        isWhite,
        status,
        gameId,
        gameMode,

        // Game actions
        makeMove,
        resetGame,
        setPlayerOrientation,
        loadGame,
        setGameMode,

        // Game info
        isGameOver,
        winner,
        currentTurn,

        // Computer player
        isComputerThinking,
        computerDifficulty,
        setComputerDifficulty,
        isComputerTurn,
    };

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within GameProvider");
    }
    return context;
};
