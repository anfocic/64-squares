import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";
import MoveControls from "@/components/game/MoveControls";

const GameControls = () => {
    const { theme } = useTheme();
    const { resetGame, isGameOver } = useGame();
    const [showGameActions, setShowGameActions] = useState(false);

    const handleMenuPress = () => {
        setShowGameActions(!showGameActions);
    };

    const handleChatPress = () => {
        Alert.alert("Chat", "Chat functionality coming soon!");
    };

    const handleAnalysisPress = () => {
        Alert.alert("Analysis", "Game analysis coming soon!");
    };

    const handleResign = () => {
        Alert.alert(
            "Resign Game",
            "Are you sure you want to resign?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Resign", style: "destructive", onPress: () => {
                    Alert.alert("Game Over", "You resigned the game.");
                }}
            ]
        );
    };

    const handleDrawOffer = () => {
        Alert.alert(
            "Offer Draw",
            "Do you want to offer a draw?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Offer Draw", onPress: () => {
                    Alert.alert("Draw Offered", "Draw offer sent to opponent.");
                }}
            ]
        );
    };

    const handleNewGame = () => {
        Alert.alert(
            "New Game",
            "Start a new game?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "New Game", onPress: resetGame }
            ]
        );
    };

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 16,
            paddingBottom: 16,
        },
        mainControls: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 12,
        },
        controlButton: {
            backgroundColor: theme.cardBackground,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.border,
            minWidth: 48,
        },
        gameActions: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 12,
            paddingHorizontal: 8,
        },
        actionButton: {
            backgroundColor: theme.cardBackground,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: theme.border,
        },
        actionButtonText: {
            color: theme.text,
            fontSize: 12,
            fontWeight: '500',
        },
        resignButton: {
            borderColor: theme.error,
        },
        resignButtonText: {
            color: theme.error,
        },
        drawButton: {
            borderColor: theme.warning,
        },
        drawButtonText: {
            color: theme.warning,
        },
    });

    return (
        <View style={styles.container}>
            {showGameActions && !isGameOver && (
                <View style={styles.gameActions}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.resignButton]}
                        onPress={handleResign}
                    >
                        <Text style={[styles.actionButtonText, styles.resignButtonText]}>
                            Resign
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.drawButton]}
                        onPress={handleDrawOffer}
                    >
                        <Text style={[styles.actionButtonText, styles.drawButtonText]}>
                            Draw
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleNewGame}
                    >
                        <Text style={styles.actionButtonText}>New Game</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.mainControls}>
                <TouchableOpacity style={styles.controlButton} onPress={handleMenuPress}>
                    <Ionicons
                        name={showGameActions ? "close" : "menu"}
                        size={24}
                        color={theme.text}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={handleChatPress}>
                    <Ionicons name="chatbubble-outline" size={24} color={theme.text} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.controlButton} onPress={handleAnalysisPress}>
                    <Ionicons name="analytics-outline" size={24} color={theme.text} />
                </TouchableOpacity>

                <MoveControls/>
            </View>
        </View>
    );
};

export default GameControls;