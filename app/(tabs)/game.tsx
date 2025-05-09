import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Chess} from 'chess.js';
import ChessBoardWrapper from "@/components/ChessBoardWrapper";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function GameScreen() {
    const [game, setGame] = useState(() => new Chess());
    const [fen, setFen] = useState(game.fen());
    const [isWhite] = useState(true);
    const [status, setStatus] = useState('');

    const onMove = (from: string, to: string): boolean => {
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
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View>
                <ChessBoardWrapper
                    onMove={onMove}
                    fen={fen}
                    isWhite={true}
                    size={320}
                />
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    status: {
        marginTop: 16,
        color: 'red',
        fontSize: 16,
    },
});