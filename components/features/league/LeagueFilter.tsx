import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from "@/context/ThemeContext";

export type LeagueFilterType = 'all' | 'upcoming' | 'active' | 'completed' | 'joined';

interface LeagueFilterProps {
    activeFilter: LeagueFilterType;
    onFilterChange: (filter: LeagueFilterType) => void;
    counts?: Record<LeagueFilterType, number>;
}

export default function LeagueFilter({ activeFilter, onFilterChange, counts }: LeagueFilterProps) {
    const { theme } = useTheme();

    const filters: { key: LeagueFilterType; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'upcoming', label: 'Upcoming' },
        { key: 'active', label: 'Active' },
        { key: 'joined', label: 'My Leagues' },
        { key: 'completed', label: 'Completed' },
    ];

    const styles = StyleSheet.create({
        container: {
            marginBottom: 16,
        },
        scrollContainer: {
            paddingHorizontal: 4,
        },
        filterButton: {
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            marginRight: 8,
            borderWidth: 1,
            borderColor: theme.border,
            backgroundColor: theme.surface,
        },
        filterButtonActive: {
            backgroundColor: theme.primary,
            borderColor: theme.primary,
        },
        filterText: {
            fontSize: 14,
            color: theme.textSecondary,
            fontWeight: '500',
        },
        filterTextActive: {
            color: '#ffffff',
            fontWeight: '600',
        },
        countBadge: {
            backgroundColor: theme.error,
            borderRadius: 10,
            minWidth: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 6,
        },
        countText: {
            color: '#ffffff',
            fontSize: 12,
            fontWeight: 'bold',
        },
        filterContent: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
            >
                {filters.map((filter) => {
                    const isActive = activeFilter === filter.key;
                    const count = counts?.[filter.key];
                    
                    return (
                        <TouchableOpacity
                            key={filter.key}
                            style={[
                                styles.filterButton,
                                isActive && styles.filterButtonActive,
                            ]}
                            onPress={() => onFilterChange(filter.key)}
                        >
                            <View style={styles.filterContent}>
                                <Text
                                    style={[
                                        styles.filterText,
                                        isActive && styles.filterTextActive,
                                    ]}
                                >
                                    {filter.label}
                                </Text>
                                {count !== undefined && count > 0 && (
                                    <View style={styles.countBadge}>
                                        <Text style={styles.countText}>{count}</Text>
                                    </View>
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
