import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import GameControls from "@/components/game/GameControls";
import PlayerInfo from "@/components/board/PlayerInfo";
import Board from "@/components/board/Board";
import {useGame} from "@/context/GameContext";
import {useTheme} from "@/context/ThemeContext";

export default function GameScreen() {
    const {
        fen,
        isWhite,
        status,
        makeMove,
        isGameOver,
        winner,
        currentTurn
    } = useGame();

    const { theme } = useTheme();

    // TODO: Replace with real player data from game context or props
    const player1 = { name: 'Player 1', country: 'Unknown', rating: 1200 };
    const player2 = { name: 'Player 2', country: 'Unknown', rating: 1200 };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            justifyContent: 'space-between',
            paddingVertical: 20,
        },
        boardWrapper: {
            alignItems: 'center',
            marginVertical: 8,
        },
        status: {
            marginTop: 8,
            color: theme.error,
            fontSize: 14,
            textAlign: 'center',
        },
        gameOver: {
            marginTop: 8,
            color: theme.success,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        turnIndicator: {
            marginTop: 4,
            color: theme.textSecondary,
            fontSize: 12,
            textAlign: 'center',
        },
    });

    return (
        <GestureHandlerRootView style={styles.container}>
            <PlayerInfo
                name={isWhite ? player2.name : player1.name}
                country={isWhite ? player2.country : player1.country}
                rating={isWhite ? player2.rating : player1.rating}
            />
            <View style={styles.boardWrapper}>
                <Board
                    onMove={makeMove}
                    fen={fen}
                    isWhite={isWhite}
                    size={320}
                />
                {status && <Text style={styles.status}>{status}</Text>}
                {isGameOver && (
                    <Text style={styles.gameOver}>
                        Game Over! {winner === 'draw' ? 'Draw' : `${winner} wins!`}
                    </Text>
                )}
                <Text style={styles.turnIndicator}>
                    {currentTurn === 'w' ? 'White' : 'Black'} to move
                </Text>
            </View>
            <PlayerInfo
                name={isWhite ? player1.name : player2.name}
                country={isWhite ? player1.country : player2.country}
                rating={isWhite ? player1.rating : player2.rating}
            />
            <GameControls/>
        </GestureHandlerRootView>
    );
}

