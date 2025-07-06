import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useGame, GameMode } from '@/context/GameContext';
import { Difficulty } from '@/services/computerPlayer';

interface GameModeSelectorProps {
    onStartGame?: () => void;
    isVisible?: boolean;
}

export default function GameModeSelector({ onStartGame, isVisible = true }: GameModeSelectorProps) {
    const { theme } = useTheme();
    const {
        gameMode,
        setGameMode,
        computerDifficulty,
        setComputerDifficulty,
        resetGame
    } = useGame();

    // Safety check for theme
    if (!theme || !isVisible) {
        return null;
    }

    const handleModeChange = (mode: GameMode) => {
        setGameMode(mode);
        resetGame(); // Reset game when changing modes
    };

    const handleDifficultyChange = (difficulty: Difficulty) => {
        setComputerDifficulty(difficulty);
    };

    const handleStartGame = () => {
        resetGame(); // Ensure fresh game state
        onStartGame?.();
    };

    const getDifficultyIcon = (difficulty: Difficulty) => {
        switch (difficulty) {
            case Difficulty.BEGINNER:
                return 'leaf-outline';
            case Difficulty.INTERMEDIATE:
                return 'flash-outline';
            case Difficulty.ADVANCED:
                return 'flame-outline';
            case Difficulty.EXPERT:
                return 'nuclear-outline';
            default:
                return 'flash-outline';
        }
    };

    const getDifficultyColor = (difficulty: Difficulty) => {
        switch (difficulty) {
            case Difficulty.BEGINNER:
                return '#4CAF50'; // Green
            case Difficulty.INTERMEDIATE:
                return '#FF9800'; // Orange
            case Difficulty.ADVANCED:
                return '#F44336'; // Red
            case Difficulty.EXPERT:
                return '#9C27B0'; // Purple
            default:
                return theme.primary;
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
        },
        title: {
            color: theme.text,
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 12,
            textAlign: 'center',
        },
        modeSection: {
            marginBottom: 16,
        },
        sectionTitle: {
            color: theme.textSecondary,
            fontSize: 14,
            fontWeight: '600',
            marginBottom: 8,
            textTransform: 'uppercase',
        },
        modeRow: {
            flexDirection: 'row',
            gap: 8,
        },
        modeButton: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
        },
        modeButtonActive: {
            borderColor: theme.primary,
            backgroundColor: theme.primary + '20',
        },
        modeButtonText: {
            color: theme.text,
            fontSize: 12,
            fontWeight: '600',
            marginLeft: 6,
            textAlign: 'center',
        },
        modeButtonTextActive: {
            color: theme.primary,
        },
        difficultySection: {
            opacity: gameMode === GameMode.HUMAN_VS_COMPUTER ? 1 : 0.5,
        },
        difficultyRow: {
            flexDirection: 'row',
            gap: 6,
        },
        difficultyButton: {
            flex: 1,
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 8,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: theme.border,
            backgroundColor: theme.cardBackground,
        },
        difficultyButtonActive: {
            borderColor: 'transparent',
        },
        difficultyText: {
            color: theme.text,
            fontSize: 10,
            fontWeight: '600',
            marginTop: 4,
            textAlign: 'center',
        },
        difficultyTextActive: {
            color: 'white',
        },
        startButton: {
            backgroundColor: theme.primary,
            borderRadius: 12,
            paddingVertical: 16,
            alignItems: 'center',
            marginTop: 20,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
        },
        startButtonText: {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Game Setup</Text>
            
            {/* Game Mode Selection */}
            <View style={styles.modeSection}>
                <Text style={styles.sectionTitle}>Game Mode</Text>
                <View style={styles.modeRow}>
                    <TouchableOpacity
                        style={[
                            styles.modeButton,
                            gameMode === GameMode.HUMAN_VS_HUMAN && styles.modeButtonActive
                        ]}
                        onPress={() => handleModeChange(GameMode.HUMAN_VS_HUMAN)}
                    >
                        <Ionicons 
                            name="people-outline" 
                            size={16} 
                            color={gameMode === GameMode.HUMAN_VS_HUMAN ? theme.primary : theme.text} 
                        />
                        <Text style={[
                            styles.modeButtonText,
                            gameMode === GameMode.HUMAN_VS_HUMAN && styles.modeButtonTextActive
                        ]}>
                            Human vs Human
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={[
                            styles.modeButton,
                            gameMode === GameMode.HUMAN_VS_COMPUTER && styles.modeButtonActive
                        ]}
                        onPress={() => handleModeChange(GameMode.HUMAN_VS_COMPUTER)}
                    >
                        <Ionicons
                            name="hardware-chip-outline"
                            size={16}
                            color={gameMode === GameMode.HUMAN_VS_COMPUTER ? theme.primary : theme.text}
                        />
                        <Text style={[
                            styles.modeButtonText,
                            gameMode === GameMode.HUMAN_VS_COMPUTER && styles.modeButtonTextActive
                        ]}>
                            vs Computer
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.modeButton,
                            gameMode === GameMode.COMPUTER_VS_COMPUTER && styles.modeButtonActive
                        ]}
                        onPress={() => handleModeChange(GameMode.COMPUTER_VS_COMPUTER)}
                    >
                        <Ionicons
                            name="hardware-chip"
                            size={16}
                            color={gameMode === GameMode.COMPUTER_VS_COMPUTER ? theme.primary : theme.text}
                        />
                        <Text style={[
                            styles.modeButtonText,
                            gameMode === GameMode.COMPUTER_VS_COMPUTER && styles.modeButtonTextActive
                        ]}>
                            Computer vs Computer
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Difficulty Selection */}
            <View style={[styles.difficultySection]}>
                <Text style={styles.sectionTitle}>Computer Difficulty</Text>
                <View style={styles.difficultyRow}>
                    {Object.values(Difficulty).map((difficulty) => {
                        const isActive = computerDifficulty === difficulty;
                        const difficultyColor = getDifficultyColor(difficulty);
                        
                        return (
                            <TouchableOpacity
                                key={difficulty}
                                style={[
                                    styles.difficultyButton,
                                    isActive && {
                                        ...styles.difficultyButtonActive,
                                        backgroundColor: difficultyColor,
                                    }
                                ]}
                                onPress={() => handleDifficultyChange(difficulty)}
                                disabled={gameMode === GameMode.HUMAN_VS_HUMAN}
                            >
                                <Ionicons 
                                    name={getDifficultyIcon(difficulty)} 
                                    size={20} 
                                    color={isActive ? 'white' : theme.text} 
                                />
                                <Text style={[
                                    styles.difficultyText,
                                    isActive && styles.difficultyTextActive
                                ]}>
                                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Start Game Button */}
            <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartGame}
            >
                <Text style={styles.startButtonText}>
                    Start Game
                </Text>
            </TouchableOpacity>
        </View>
    );
}
