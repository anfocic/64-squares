import React from 'react';
import { View, Platform, Text } from 'react-native';
import { Chessboard as WebChessBoard } from 'react-chessboard';
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

    if (Platform.OS === 'web') {
        // Create custom square styles for web
        const customSquareStyles: { [square: string]: React.CSSProperties } = {};

        // Highlight last move
        if (finalBoardStyle.showLastMove && lastMove) {
            customSquareStyles[lastMove.from] = {
                backgroundColor: finalBoardTheme.lastMoveSquare,
            };
            customSquareStyles[lastMove.to] = {
                backgroundColor: finalBoardTheme.lastMoveSquare,
            };
        }

        // Highlight check square
        if (checkSquare) {
            customSquareStyles[checkSquare] = {
                backgroundColor: finalBoardTheme.checkSquare,
            };
        }

        // Highlight selected square
        if (selectedSquare) {
            customSquareStyles[selectedSquare] = {
                backgroundColor: finalBoardTheme.selectedSquare,
            };
        }

        // Show possible moves
        if (finalBoardStyle.showPossibleMoves) {
            possibleMoves.forEach(square => {
                customSquareStyles[square] = {
                    backgroundColor: finalBoardTheme.highlightSquare + '40',
                    border: `2px solid ${finalBoardTheme.highlightSquare}`,
                };
            });
        }

        return (
            <div style={{
                width: size,
                borderRadius: finalBoardStyle.borderRadius,
                overflow: 'hidden',
                boxShadow: finalBoardStyle.shadowEnabled
                    ? `0 4px 12px ${theme.shadow || 'rgba(0,0,0,0.15)'}`
                    : 'none',
            }}>
                <WebChessBoard
                    position={fen}
                    boardWidth={size}
                    onPieceDrop={(sourceSquare, targetSquare) => {
                        return onMove(sourceSquare, targetSquare);
                    }}
                    boardOrientation={isWhite ? 'white' : 'black'}
                    arePiecesDraggable={true}
                    customSquareStyles={customSquareStyles}
                    customLightSquareStyle={{ backgroundColor: finalBoardTheme.lightSquare }}
                    customDarkSquareStyle={{ backgroundColor: finalBoardTheme.darkSquare }}
                    showBoardNotation={finalBoardStyle.showCoordinates}
                    animationDuration={finalBoardStyle.animationDuration}
                />
            </div>
        );
    }

    // React Native implementation
    const containerStyle = {
        width: size,
        height: size,
        borderRadius: finalBoardStyle.borderRadius,
        overflow: 'hidden' as const,
        shadowColor: theme.shadow || '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: finalBoardStyle.shadowEnabled ? 0.3 : 0,
        shadowRadius: 8,
        elevation: finalBoardStyle.shadowEnabled ? 8 : 0,
        // Add a border to show theming is working
        borderWidth: 3,
        borderColor: finalBoardTheme.lightSquare,
    };

    // Use custom board for React Native to support theming
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
            />
        </View>
    );
};

export default Board;