import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Chess } from 'chess.js';
import { BoardTheme, BoardStyle } from './Board';

interface CustomChessBoardProps {
    fen: string;
    onMove: (from: string, to: string) => boolean;
    isWhite: boolean;
    size: number;
    boardTheme: BoardTheme;
    boardStyle: BoardStyle;
}

// Unicode chess pieces
const PIECE_SYMBOLS: { [key: string]: string } = {
    'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
    'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
};

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

export default function CustomChessBoard({
    fen,
    onMove,
    isWhite,
    size,
    boardTheme,
    boardStyle,
}: CustomChessBoardProps) {
    const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const [possibleMoves, setPossibleMoves] = useState<string[]>([]);

    const game = new Chess(fen);
    const board = game.board();
    const squareSize = size / 8;

    const getSquareColor = (file: number, rank: number): string => {
        const isLight = (file + rank) % 2 === 0;
        return isLight ? boardTheme.lightSquare : boardTheme.darkSquare;
    };

    const getSquareName = (file: number, rank: number): string => {
        return FILES[file] + RANKS[rank];
    };

    const handleSquarePress = (file: number, rank: number) => {
        const square = getSquareName(file, rank);
        
        if (selectedSquare) {
            // Try to make a move
            const moveResult = onMove(selectedSquare, square);
            setSelectedSquare(null);
            setPossibleMoves([]);
            
            if (!moveResult) {
                // If move failed, select the new square if it has a piece
                const piece = board[rank][file];
                if (piece && piece.color === (isWhite ? 'w' : 'b')) {
                    setSelectedSquare(square);
                    const moves = game.moves({ square, verbose: true });
                    setPossibleMoves(moves.map(move => move.to));
                }
            }
        } else {
            // Select a square
            const piece = board[rank][file];
            if (piece && piece.color === (isWhite ? 'w' : 'b')) {
                setSelectedSquare(square);
                const moves = game.moves({ square, verbose: true });
                setPossibleMoves(moves.map(move => move.to));
            }
        }
    };

    const renderSquare = (file: number, rank: number) => {
        const square = getSquareName(file, rank);
        const piece = board[rank][file];
        const isSelected = selectedSquare === square;
        const isPossibleMove = possibleMoves.includes(square);
        
        let backgroundColor = getSquareColor(file, rank);
        
        if (isSelected) {
            backgroundColor = boardTheme.selectedSquare;
        } else if (isPossibleMove) {
            backgroundColor = boardTheme.highlightSquare + '60';
        }

        return (
            <TouchableOpacity
                key={`${file}-${rank}`}
                style={[
                    styles.square,
                    {
                        width: squareSize,
                        height: squareSize,
                        backgroundColor,
                    }
                ]}
                onPress={() => handleSquarePress(file, rank)}
            >
                {piece && (
                    <Text style={[
                        styles.piece,
                        { fontSize: squareSize * 0.7 }
                    ]}>
                        {PIECE_SYMBOLS[piece.type.toUpperCase() + (piece.color === 'w' ? '' : '').toLowerCase()] || 
                         PIECE_SYMBOLS[piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase()]}
                    </Text>
                )}
                
                {/* Coordinates */}
                {boardStyle.showCoordinates && (
                    <>
                        {file === 0 && (
                            <Text style={[styles.coordinate, styles.rankCoordinate, {
                                color: (rank + file) % 2 === 0 ? boardTheme.darkSquare : boardTheme.lightSquare
                            }]}>
                                {RANKS[rank]}
                            </Text>
                        )}
                        {rank === 7 && (
                            <Text style={[styles.coordinate, styles.fileCoordinate, {
                                color: (rank + file) % 2 === 0 ? boardTheme.darkSquare : boardTheme.lightSquare
                            }]}>
                                {FILES[file]}
                            </Text>
                        )}
                    </>
                )}
                
                {/* Possible move indicator */}
                {isPossibleMove && (
                    <View style={[styles.moveIndicator, {
                        backgroundColor: boardTheme.highlightSquare,
                    }]} />
                )}
            </TouchableOpacity>
        );
    };

    const renderBoard = () => {
        const squares = [];
        const displayRanks = isWhite ? RANKS : [...RANKS].reverse();
        const displayFiles = isWhite ? FILES : [...FILES].reverse();

        for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
            const row = [];
            for (let fileIndex = 0; fileIndex < 8; fileIndex++) {
                const actualRank = isWhite ? rankIndex : 7 - rankIndex;
                const actualFile = isWhite ? fileIndex : 7 - fileIndex;
                row.push(renderSquare(actualFile, actualRank));
            }
            squares.push(
                <View key={rankIndex} style={styles.row}>
                    {row}
                </View>
            );
        }
        return squares;
    };

    const styles = StyleSheet.create({
        square: {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
        },
        piece: {
            textAlign: 'center',
            fontWeight: 'bold',
        },
        row: {
            flexDirection: 'row',
        },
        coordinate: {
            position: 'absolute',
            fontSize: 10,
            fontWeight: 'bold',
        },
        rankCoordinate: {
            top: 2,
            left: 2,
        },
        fileCoordinate: {
            bottom: 2,
            right: 2,
        },
        moveIndicator: {
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: 6,
            opacity: 0.8,
        },
    });

    return (
        <View style={{
            width: size,
            height: size,
            borderRadius: boardStyle.borderRadius,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: boardTheme.darkSquare,
        }}>
            {renderBoard()}
        </View>
    );
}
