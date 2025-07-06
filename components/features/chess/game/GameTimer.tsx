import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";

interface GameTimerProps {
    initialTime: number; // in seconds
    isActive: boolean;
    onTimeUp?: () => void;
}

const GameTimer: React.FC<GameTimerProps> = ({ 
    initialTime, 
    isActive, 
    onTimeUp 
}) => {
    const { theme } = useTheme();
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        onTimeUp?.();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [isActive, timeRemaining, onTimeUp]);

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const getTimeColor = () => {
        if (timeRemaining <= 30) return theme.error;
        if (timeRemaining <= 60) return theme.warning;
        return theme.text;
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: isActive ? theme.primary + '20' : theme.cardBackground,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: isActive ? 2 : 1,
            borderColor: isActive ? theme.primary : theme.border,
            minWidth: 80,
            alignItems: 'center',
        },
        timeText: {
            fontSize: 18,
            fontWeight: 'bold',
            color: getTimeColor(),
            fontFamily: 'monospace',
        },
        lowTimeContainer: {
            backgroundColor: timeRemaining <= 30 ? theme.error + '20' : 'transparent',
        },
    });

    return (
        <View style={[styles.container, timeRemaining <= 30 && styles.lowTimeContainer]}>
            <Text style={styles.timeText}>
                {formatTime(timeRemaining)}
            </Text>
        </View>
    );
};

export default GameTimer;
