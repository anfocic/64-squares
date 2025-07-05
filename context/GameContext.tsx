import React, {createContext, useContext, useState, useCallback} from "react";
import {Chess} from "chess.js";

type GameContextProps = {
    // Game state
    game: Chess;
    fen: string;
    isWhite: boolean;
    status: string;
    gameId: string | null;

    // Game actions
    makeMove: (from: string, to: string) => boolean;
    resetGame: () => void;
    setPlayerOrientation: (isWhite: boolean) => void;
    loadGame: (fen: string) => void;

    // Game info
    isGameOver: boolean;
    winner: 'white' | 'black' | 'draw' | null;
    currentTurn: 'w' | 'b';
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

export const GameProvider = ({children}: { children: React.ReactNode }) => {
    const [game, setGame] = useState(() => new Chess());
    const [fen, setFen] = useState(game.fen());
    const [isWhite, setIsWhite] = useState(true);
    const [status, setStatus] = useState('');
    const [gameId, setGameId] = useState<string | null>(null);

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

        // Game actions
        makeMove,
        resetGame,
        setPlayerOrientation,
        loadGame,

        // Game info
        isGameOver,
        winner,
        currentTurn,
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
