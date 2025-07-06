import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useGame } from '@/context/GameContext';

export default function ComputerThinkingIndicator() {
    const { theme } = useTheme();
    const { isComputerThinking, isComputerTurn, computerDifficulty } = useGame();

    // Safety check for theme
    if (!theme) {
        return null;
    }
    const [thinkingTime, setThinkingTime] = useState(0);
    const [animatedValue] = useState(new Animated.Value(0));

    useEffect(() => {
        if (isComputerThinking) {
            setThinkingTime(0);
            
            // Start thinking timer
            const startTime = Date.now();
            const interval = setInterval(() => {
                setThinkingTime(Date.now() - startTime);
            }, 100);

            // Start pulsing animation
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(animatedValue, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulseAnimation.start();

            return () => {
                clearInterval(interval);
                pulseAnimation.stop();
            };
        } else {
            animatedValue.setValue(0);
        }
    }, [isComputerThinking, animatedValue]);

    const formatTime = (ms: number): string => {
        const seconds = Math.floor(ms / 1000);
        const milliseconds = Math.floor((ms % 1000) / 100);
        return `${seconds}.${milliseconds}s`;
    };

    const getDifficultyDescription = () => {
        switch (computerDifficulty) {
            case 'beginner':
                return 'Thinking carefully...';
            case 'intermediate':
                return 'Analyzing position...';
            case 'advanced':
                return 'Deep calculation...';
            case 'expert':
                return 'Maximum analysis...';
            default:
                return 'Computing move...';
        }
    };

    if (!isComputerTurn && !isComputerThinking) {
        return null;
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 16,
            marginVertical: 8,
            borderWidth: 1,
            borderColor: theme.primary + '30',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
        },
        iconContainer: {
            marginRight: 8,
        },
        title: {
            color: theme.primary,
            fontSize: 16,
            fontWeight: 'bold',
        },
        description: {
            color: theme.textSecondary,
            fontSize: 14,
            textAlign: 'center',
            marginBottom: 8,
        },
        timeContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
        },
        timeText: {
            color: theme.text,
            fontSize: 12,
            fontWeight: '600',
        },
        difficultyBadge: {
            backgroundColor: theme.primary + '20',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 4,
        },
        difficultyText: {
            color: theme.primary,
            fontSize: 10,
            fontWeight: 'bold',
            textTransform: 'uppercase',
        },
        waitingContainer: {
            opacity: 0.7,
        },
        waitingText: {
            color: theme.textSecondary,
            fontSize: 14,
            textAlign: 'center',
            fontStyle: 'italic',
        },
    });

    if (isComputerTurn && !isComputerThinking) {
        return (
            <View style={[styles.container, styles.waitingContainer]}>
                <Text style={styles.waitingText}>Computer's turn...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animated.View 
                    style={[
                        styles.iconContainer,
                        {
                            opacity: animatedValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            }),
                            transform: [{
                                scale: animatedValue.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.9, 1.1],
                                }),
                            }],
                        }
                    ]}
                >
                    <Ionicons 
                        name="hardware-chip" 
                        size={20} 
                        color={theme.primary} 
                    />
                </Animated.View>
                <Text style={styles.title}>Computer Thinking</Text>
            </View>
            
            <Text style={styles.description}>
                {getDifficultyDescription()}
            </Text>
            
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>
                    Time: {formatTime(thinkingTime)}
                </Text>
                
                <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>
                        {computerDifficulty}
                    </Text>
                </View>
            </View>
        </View>
    );
}
