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
                onMove={(info: any) => {
                    // Extract from and to from the move info
                    if (info && info.from && info.to) {
                        onMove(info.from, info.to);
                    }
                }}
                gestureEnabled={true}
            />
        </View>
    );
};

export default Board;