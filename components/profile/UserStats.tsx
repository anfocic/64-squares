import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface StatItem {
    label: string;
    value: string | number;
    icon: string;
    color?: string;
}

interface UserStatsProps {
    stats: StatItem[];
    layout?: 'grid' | 'list';
}

export default function UserStats({ stats, layout = 'grid' }: UserStatsProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flexDirection: layout === 'grid' ? 'row' : 'column',
            flexWrap: layout === 'grid' ? 'wrap' : 'nowrap',
            justifyContent: layout === 'grid' ? 'space-between' : 'flex-start',
        },
        statCard: {
            backgroundColor: theme.surface,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 8,
            borderWidth: 1,
            borderColor: theme.border,
            ...(layout === 'grid' ? {
                width: '48%',
                marginHorizontal: '1%',
            } : {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
            }),
        },
        statIcon: {
            marginBottom: layout === 'grid' ? 8 : 0,
            marginRight: layout === 'list' ? 16 : 0,
        },
        statContent: {
            alignItems: layout === 'grid' ? 'center' : 'flex-start',
            flex: layout === 'list' ? 1 : 0,
        },
        statValue: {
            fontSize: layout === 'grid' ? 20 : 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 4,
        },
        statLabel: {
            fontSize: layout === 'grid' ? 12 : 14,
            color: theme.textSecondary,
            textAlign: layout === 'grid' ? 'center' : 'left',
        },
    });

    return (
        <View style={styles.container}>
            {stats.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                    <Ionicons 
                        name={stat.icon as any} 
                        size={layout === 'grid' ? 24 : 20} 
                        color={stat.color || theme.primary}
                        style={styles.statIcon}
                    />
                    <View style={styles.statContent}>
                        <Text style={styles.statValue}>{stat.value}</Text>
                        <Text style={styles.statLabel}>{stat.label}</Text>
                    </View>
                </View>
            ))}
        </View>
    );
}
