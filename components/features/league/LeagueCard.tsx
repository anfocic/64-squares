import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export interface LeagueCardData {
    id: string;
    name: string;
    format: string;
    participants: number;
    maxParticipants?: number;
    status: 'upcoming' | 'active' | 'completed';
    startDate: string;
    prize?: string;
    rounds?: number;
    timeControl: string;
}

interface LeagueCardProps {
    league: LeagueCardData;
    onPress?: () => void;
    onJoin?: () => void;
    showJoinButton?: boolean;
}

export default function LeagueCard({ league, onPress, onJoin, showJoinButton = true }: LeagueCardProps) {
    const { theme } = useTheme();

    const getStatusColor = () => {
        switch (league.status) {
            case 'upcoming': return theme.warning;
            case 'active': return theme.success;
            case 'completed': return theme.textMuted;
            default: return theme.textSecondary;
        }
    };

    const getStatusIcon = () => {
        switch (league.status) {
            case 'upcoming': return 'time-outline';
            case 'active': return 'play-circle';
            case 'completed': return 'checkmark-circle';
            default: return 'help-circle';
        }
    };

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 16,
            marginBottom: 12,
            borderWidth: 1,
            borderColor: theme.border,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
        },
        titleContainer: {
            flex: 1,
            marginRight: 12,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 4,
        },
        format: {
            fontSize: 14,
            color: theme.textSecondary,
            marginBottom: 2,
        },
        timeControl: {
            fontSize: 12,
            color: theme.textMuted,
        },
        statusContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: getStatusColor() + '20',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
        },
        statusText: {
            fontSize: 12,
            color: getStatusColor(),
            fontWeight: '600',
            marginLeft: 4,
            textTransform: 'capitalize',
        },
        infoRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
        },
        infoItem: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        infoText: {
            fontSize: 14,
            color: theme.textSecondary,
            marginLeft: 6,
        },
        participantsText: {
            fontSize: 14,
            color: theme.text,
            fontWeight: '500',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: theme.divider,
        },
        startDate: {
            fontSize: 12,
            color: theme.textMuted,
        },
        joinButton: {
            backgroundColor: theme.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 6,
        },
        joinButtonDisabled: {
            backgroundColor: theme.textMuted,
        },
        joinButtonText: {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: '600',
        },
        prize: {
            fontSize: 12,
            color: theme.accent,
            fontWeight: '600',
        },
    });

    const canJoin = league.status === 'upcoming' && 
                   (!league.maxParticipants || league.participants < league.maxParticipants);

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{league.name}</Text>
                    <Text style={styles.format}>{league.format}</Text>
                    <Text style={styles.timeControl}>{league.timeControl}</Text>
                </View>
                <View style={styles.statusContainer}>
                    <Ionicons 
                        name={getStatusIcon() as any} 
                        size={12} 
                        color={getStatusColor()} 
                    />
                    <Text style={styles.statusText}>{league.status}</Text>
                </View>
            </View>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Ionicons name="people" size={16} color={theme.textSecondary} />
                    <Text style={styles.participantsText}>
                        {league.participants}
                        {league.maxParticipants && `/${league.maxParticipants}`}
                    </Text>
                </View>
                {league.rounds && (
                    <View style={styles.infoItem}>
                        <Ionicons name="layers" size={16} color={theme.textSecondary} />
                        <Text style={styles.infoText}>{league.rounds} rounds</Text>
                    </View>
                )}
                {league.prize && (
                    <Text style={styles.prize}>🏆 {league.prize}</Text>
                )}
            </View>

            <View style={styles.footer}>
                <Text style={styles.startDate}>
                    {league.status === 'upcoming' ? 'Starts: ' : 'Started: '}{league.startDate}
                </Text>
                {showJoinButton && league.status === 'upcoming' && (
                    <TouchableOpacity 
                        style={[styles.joinButton, !canJoin && styles.joinButtonDisabled]}
                        onPress={canJoin ? onJoin : undefined}
                        disabled={!canJoin}
                    >
                        <Text style={styles.joinButtonText}>
                            {canJoin ? 'Join' : 'Full'}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
}
