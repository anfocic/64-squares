import React from 'react';
import { View, Platform } from 'react-native';
import Chessboard from 'react-native-chessboard';
import { Chessboard as WebChessBoard } from 'react-chessboard';

type ChessBoardWrapperProps = {
    fen: string;
    onMove: (from: string, to: string) => boolean;
    isWhite: boolean;
    size?: number;
};

const Board: React.FC<ChessBoardWrapperProps> = ({
                                                                 fen,
                                                                 onMove,
                                                                 isWhite,
                                                                 size = 320,
                                                             }) => {
    if (Platform.OS === 'web') {
        return (
            <div style={{ width: size }}>
                <WebChessBoard
                    position={fen}
                    boardWidth={size}
                    onPieceDrop={(sourceSquare, targetSquare) => {
                        return onMove(sourceSquare, targetSquare);
                    }}
                    boardOrientation={isWhite ? 'white' : 'black'}
                    arePiecesDraggable={true}
                />
            </div>
        );
    }

    return (
        <View style={{ width: size, height: size }}>
            <Chessboard
                fen={fen}
                isWhite={isWhite}
                onMove={(info) => {
                    // Adapt the ChessMoveInfo to our onMove signature
                    onMove(info.from, info.to);
                }}
                gestureEnabled={true}
                size={size}
            />
        </View>
    );
};

export default Board;