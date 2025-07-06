import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import CustomChessBoard from './CustomChessBoard';

export interface BoardTheme {
    lightSquare: string;
    darkSquare: string;
    highlightSquare: string;
    selectedSquare: string;
    checkSquare: string;
    lastMoveSquare: string;
}

export interface BoardStyle {
    showCoordinates: boolean;
    showLastMove: boolean;
    showPossibleMoves: boolean;
    animationDuration: number;
    borderRadius: number;
    shadowEnabled: boolean;
}

type ChessBoardWrapperProps = {
    fen: string;
    onMove: (from: string, to: string) => boolean;
    isWhite: boolean;
    size?: number;
    boardTheme?: Partial<BoardTheme>;
    boardStyle?: Partial<BoardStyle>;
    lastMove?: { from: string; to: string } | null;
    checkSquare?: string | null;
    selectedSquare?: string | null;
    possibleMoves?: string[];
};

const Board: React.FC<ChessBoardWrapperProps> = ({
    fen,
    onMove,
    isWhite,
    size = 320,
    boardTheme,
    boardStyle,
    lastMove,
    checkSquare,
    selectedSquare,
    possibleMoves = [],
}) => {
    const { theme } = useTheme();

    // Default board theme based on app theme
    const defaultBoardTheme: BoardTheme = {
        lightSquare: theme.chessLight,
        darkSquare: theme.chessDark,
        highlightSquare: theme.chessHighlight,
        selectedSquare: theme.chessSelected,
        checkSquare: '#ff4444',
        lastMoveSquare: theme.primary + '60',
    };

    // Default board style
    const defaultBoardStyle: BoardStyle = {
        showCoordinates: true,
        showLastMove: true,
        showPossibleMoves: true,
        animationDuration: 200,
        borderRadius: 8,
        shadowEnabled: true,
    };

    const finalBoardTheme = { ...defaultBoardTheme, ...boardTheme };
    const finalBoardStyle = { ...defaultBoardStyle, ...boardStyle };

    // Use custom board for all platforms for consistency
    return (
        <View style={{
            shadowColor: theme.shadow || '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: finalBoardStyle.shadowEnabled ? 0.3 : 0,
            shadowRadius: 8,
            elevation: finalBoardStyle.shadowEnabled ? 8 : 0,
        }}>
            <CustomChessBoard
                fen={fen}
                onMove={onMove}
                isWhite={isWhite}
                size={size}
                boardTheme={finalBoardTheme}
                boardStyle={finalBoardStyle}
                lastMove={lastMove}
                checkSquare={checkSquare}
            />
        </View>
    );
};

export default Board;