import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useLeagues } from "@/hooks/league/useGetLeagues";
import LeagueCard, { LeagueCardData } from "@/components/league/LeagueCard";
import LeagueStats from "@/components/league/LeagueStats";
import LeagueFilter, { LeagueFilterType } from "@/components/league/LeagueFilter";

export default function LeagueScreen() {
    const { theme } = useTheme();
    const { data: leagues, isLoading, refetch } = useLeagues();
    const [activeFilter, setActiveFilter] = useState<LeagueFilterType>('all');
    const [refreshing, setRefreshing] = useState(false);

    // Mock data for demonstration - replace with real data
    const mockLeagues: LeagueCardData[] = [
        {
            id: '1',
            name: 'Weekly Blitz Championship',
            format: 'Swiss Tournament',
            participants: 24,
            maxParticipants: 32,
            status: 'upcoming',
            startDate: 'Jan 15, 2024',
            prize: '$500',
            rounds: 7,
            timeControl: '3+2',
        },
        {
            id: '2',
            name: 'Rapid Masters League',
            format: 'Round Robin',
            participants: 16,
            maxParticipants: 16,
            status: 'active',
            startDate: 'Jan 10, 2024',
            rounds: 15,
            timeControl: '10+5',
        },
        {
            id: '3',
            name: 'Beginner Friendly Tournament',
            format: 'Swiss Tournament',
            participants: 45,
            maxParticipants: 64,
            status: 'upcoming',
            startDate: 'Jan 20, 2024',
            prize: 'Trophies',
            rounds: 6,
            timeControl: '15+10',
        },
        {
            id: '4',
            name: 'December Championship',
            format: 'Knockout',
            participants: 32,
            status: 'completed',
            startDate: 'Dec 1, 2023',
            prize: '$1000',
            rounds: 5,
            timeControl: '5+3',
        },
    ];

    // Filter leagues based on active filter
    const filteredLeagues = useMemo(() => {
        switch (activeFilter) {
            case 'upcoming':
                return mockLeagues.filter(league => league.status === 'upcoming');
            case 'active':
                return mockLeagues.filter(league => league.status === 'active');
            case 'completed':
                return mockLeagues.filter(league => league.status === 'completed');
            case 'joined':
                // Mock: assume user joined leagues with id 1 and 2
                return mockLeagues.filter(league => ['1', '2'].includes(league.id));
            default:
                return mockLeagues;
        }
    }, [activeFilter]);

    // Calculate filter counts
    const filterCounts = useMemo(() => ({
        all: mockLeagues.length,
        upcoming: mockLeagues.filter(l => l.status === 'upcoming').length,
        active: mockLeagues.filter(l => l.status === 'active').length,
        completed: mockLeagues.filter(l => l.status === 'completed').length,
        joined: 2, // Mock joined count
    }), []);

    const onRefresh = async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    };

    const handleLeaguePress = (league: LeagueCardData) => {
        console.log('League pressed:', league.name);
        // Navigate to league details
    };

    const handleJoinLeague = (league: LeagueCardData) => {
        console.log('Join league:', league.name);
        // Handle league joining logic
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        content: {
            padding: 20,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
        },
        title: {
            fontSize: 28,
            fontWeight: 'bold',
            color: theme.text,
        },
        createButton: {
            backgroundColor: theme.primary,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8,
            flexDirection: 'row',
            alignItems: 'center',
        },
        createButtonText: {
            color: '#ffffff',
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 6,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 40,
        },
        emptyText: {
            fontSize: 16,
            color: theme.textSecondary,
            textAlign: 'center',
            marginTop: 16,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            fontSize: 16,
            color: theme.textSecondary,
            marginTop: 16,
        },
    });

    const renderLeagueCard = ({ item }: { item: LeagueCardData }) => (
        <LeagueCard
            league={item}
            onPress={() => handleLeaguePress(item)}
            onJoin={() => handleJoinLeague(item)}
        />
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="trophy-outline" size={64} color={theme.textMuted} />
            <Text style={styles.emptyText}>
                {activeFilter === 'all'
                    ? "No leagues available yet.\nCreate the first one!"
                    : `No ${activeFilter} leagues found.`
                }
            </Text>
        </View>
    );

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <Ionicons name="hourglass-outline" size={48} color={theme.textMuted} />
                <Text style={styles.loadingText}>Loading leagues...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Leagues</Text>
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={() => router.push("/league/create")}
                    >
                        <Ionicons name="add" size={16} color="#ffffff" />
                        <Text style={styles.createButtonText}>Create</Text>
                    </TouchableOpacity>
                </View>

                {/* Stats */}
                <LeagueStats
                    totalLeagues={mockLeagues.length}
                    activeLeagues={filterCounts.active}
                    joinedLeagues={filterCounts.joined}
                    wonTournaments={3} // Mock data
                />

                {/* Filter */}
                <LeagueFilter
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    counts={filterCounts}
                />
            </View>

            {/* League List */}
            <FlatList
                data={filteredLeagues}
                keyExtractor={(item) => item.id}
                renderItem={renderLeagueCard}
                contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={theme.primary}
                    />
                }
                ListEmptyComponent={renderEmptyState}
            />
        </View>
    );
}