import React from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from "@/context/ThemeContext";

interface PlayerInfoProps {
    name: string;
    rating: number;
    country: string;
    imageUrl?: string;
    isActive?: boolean;
    timeRemaining?: string;
    capturedPieces?: string[];
    isOnline?: boolean;
}

export default function PlayerInfo({
    name,
    rating,
    country,
    imageUrl,
    isActive = false,
    timeRemaining,
    capturedPieces = [],
    isOnline = true
}: PlayerInfoProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: isActive ? theme.cardBackground : theme.background,
            borderRadius: 12,
            padding: 12,
            marginHorizontal: 16,
            marginVertical: 4,
            borderWidth: isActive ? 2 : 1,
            borderColor: isActive ? theme.primary : theme.border,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
        },
        playerImage: {
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: theme.cardBackground,
            marginRight: 12,
            justifyContent: 'center',
            alignItems: 'center',
        },
        playerInfo: {
            flex: 1,
        },
        playerName: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 2,
        },
        playerDetails: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 2,
        },
        rating: {
            fontSize: 14,
            color: theme.textSecondary,
            marginRight: 8,
        },
        country: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        statusContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        onlineIndicator: {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: isOnline ? '#4ade80' : '#6b7280',
            marginRight: 6,
        },
        timeContainer: {
            alignItems: 'flex-end',
            minWidth: 60,
        },
        timeRemaining: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 4,
        },
        capturedPieces: {
            fontSize: 12,
            color: theme.textSecondary,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.playerImage}>
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} style={styles.playerImage} />
                ) : (
                    <Ionicons name="person" size={24} color={theme.textSecondary} />
                )}
            </View>

            <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{name}</Text>
                <View style={styles.playerDetails}>
                    <Text style={styles.rating}>({rating})</Text>
                    <Text style={styles.country}>{country}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <View style={styles.onlineIndicator} />
                    <Text style={[styles.country, { fontSize: 12 }]}>
                        {isOnline ? 'Online' : 'Offline'}
                    </Text>
                </View>
            </View>

            {timeRemaining && (
                <View style={styles.timeContainer}>
                    <Text style={styles.timeRemaining}>{timeRemaining}</Text>
                    {capturedPieces.length > 0 && (
                        <Text style={styles.capturedPieces}>
                            {capturedPieces.join(' ')}
                        </Text>
                    )}
                </View>
            )}
        </View>
    );
}