import React from 'react';
import { View, Platform } from 'react-native';
import Chessboard from 'react-native-chessboard'; // For mobile
import { Chessboard as WebChessBoard } from 'react-chessboard'; // For web

type ChessBoardWrapperProps = {
    fen: string;
    onMove: (from: string, to: string) => void;
    isWhite: boolean;
    size?: number;
};

const ChessBoardWrapper: React.FC<ChessBoardWrapperProps> = ({
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
    console.log(typeof fen)
    return (
        <View style={{ width: size, height: size }}>
            <Chessboard
                fen={fen}
                isWhite={isWhite}
                onMove={onMove}
                gestureEnabled={true}
                size={size}
            />
        </View>
    );
};

export default ChessBoardWrapper;