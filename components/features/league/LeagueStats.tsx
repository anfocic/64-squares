import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface LeagueStatsProps {
    totalLeagues: number;
    activeLeagues: number;
    joinedLeagues: number;
    wonTournaments: number;
}

export default function LeagueStats({ 
    totalLeagues, 
    activeLeagues, 
    joinedLeagues, 
    wonTournaments 
}: LeagueStatsProps) {
    const { theme } = useTheme();

    const stats = [
        {
            label: 'Total Leagues',
            value: totalLeagues,
            icon: 'trophy',
            color: theme.primary,
        },
        {
            label: 'Active',
            value: activeLeagues,
            icon: 'play-circle',
            color: theme.success,
        },
        {
            label: 'Joined',
            value: joinedLeagues,
            icon: 'person-add',
            color: theme.accent,
        },
        {
            label: 'Won',
            value: wonTournaments,
            icon: 'medal',
            color: theme.warning,
        },
    ];

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
        },
        statCard: {
            flex: 1,
            backgroundColor: theme.surface,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginHorizontal: 4,
            borderWidth: 1,
            borderColor: theme.border,
        },
        statValue: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
            marginTop: 8,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
        },
    });

    return (
        <View style={styles.container}>
            {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                    <Ionicons 
                        name={stat.icon as any} 
                        size={24} 
                        color={stat.color} 
                    />
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
            ))}
        </View>
    );
}
