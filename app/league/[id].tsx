import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

// Mock data - replace with real API calls
const mockLeagueDetails = {
    id: '1',
    name: 'Weekly Blitz Championship',
    description: 'A competitive weekly tournament for blitz chess enthusiasts. Join players from around the world in this exciting format.',
    format: 'Swiss Tournament',
    participants: 24,
    maxParticipants: 32,
    status: 'upcoming' as const,
    startDate: 'January 15, 2024',
    endDate: 'January 17, 2024',
    prize: '$500',
    rounds: 7,
    timeControl: '3+2',
    organizer: 'Chess Club International',
    rules: [
        'FIDE rules apply',
        'No engine assistance',
        'Fair play policy enforced',
        'Disconnection = loss after 2 minutes',
    ],
    schedule: [
        { round: 1, date: 'Jan 15, 10:00 AM', status: 'upcoming' },
        { round: 2, date: 'Jan 15, 2:00 PM', status: 'upcoming' },
        { round: 3, date: 'Jan 15, 6:00 PM', status: 'upcoming' },
        { round: 4, date: 'Jan 16, 10:00 AM', status: 'upcoming' },
        { round: 5, date: 'Jan 16, 2:00 PM', status: 'upcoming' },
        { round: 6, date: 'Jan 16, 6:00 PM', status: 'upcoming' },
        { round: 7, date: 'Jan 17, 2:00 PM', status: 'upcoming' },
    ],
    participants_list: [
        { id: '1', name: 'GrandMaster_Alex', rating: 2400, country: '🇺🇸' },
        { id: '2', name: 'ChessQueen_Maria', rating: 2350, country: '🇪🇸' },
        { id: '3', name: 'KnightRider_John', rating: 2300, country: '🇬🇧' },
        { id: '4', name: 'PawnStorm_Lisa', rating: 2250, country: '🇩🇪' },
    ],
};

export default function LeagueDetailScreen() {
    const { theme } = useTheme();
    const { id } = useLocalSearchParams();
    const [activeTab, setActiveTab] = useState<'overview' | 'participants' | 'schedule'>('overview');
    const [isJoined, setIsJoined] = useState(false);

    const league = mockLeagueDetails; // In real app, fetch by id

    const handleJoinLeague = () => {
        if (isJoined) {
            Alert.alert(
                "Leave League",
                "Are you sure you want to leave this league?",
                [
                    { text: "Cancel", style: "cancel" },
                    { 
                        text: "Leave", 
                        style: "destructive",
                        onPress: () => setIsJoined(false)
                    }
                ]
            );
        } else {
            Alert.alert(
                "Join League",
                `Join "${league.name}"?`,
                [
                    { text: "Cancel", style: "cancel" },
                    { 
                        text: "Join", 
                        onPress: () => setIsJoined(true)
                    }
                ]
            );
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: theme.divider,
        },
        backButton: {
            marginRight: 16,
            padding: 8,
        },
        headerContent: {
            flex: 1,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        subtitle: {
            fontSize: 14,
            color: theme.textSecondary,
            marginTop: 2,
        },
        statusBadge: {
            backgroundColor: theme.success + '20',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            marginLeft: 12,
        },
        statusText: {
            fontSize: 12,
            color: theme.success,
            fontWeight: '600',
            textTransform: 'capitalize',
        },
        tabContainer: {
            flexDirection: 'row',
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.divider,
        },
        tab: {
            flex: 1,
            paddingVertical: 16,
            alignItems: 'center',
        },
        tabActive: {
            borderBottomWidth: 2,
            borderBottomColor: theme.primary,
        },
        tabText: {
            fontSize: 14,
            color: theme.textSecondary,
            fontWeight: '500',
        },
        tabTextActive: {
            color: theme.primary,
            fontWeight: '600',
        },
        content: {
            flex: 1,
            padding: 20,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 12,
        },
        infoGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 16,
        },
        infoItem: {
            width: '50%',
            marginBottom: 12,
        },
        infoLabel: {
            fontSize: 12,
            color: theme.textSecondary,
            marginBottom: 4,
        },
        infoValue: {
            fontSize: 16,
            color: theme.text,
            fontWeight: '500',
        },
        description: {
            fontSize: 14,
            color: theme.textSecondary,
            lineHeight: 20,
            marginBottom: 16,
        },
        ruleItem: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 8,
        },
        ruleText: {
            fontSize: 14,
            color: theme.text,
            marginLeft: 8,
        },
        participantItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.card,
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
            borderWidth: 1,
            borderColor: theme.border,
        },
        participantInfo: {
            flex: 1,
            marginLeft: 12,
        },
        participantName: {
            fontSize: 16,
            fontWeight: '500',
            color: theme.text,
        },
        participantRating: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        scheduleItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: theme.card,
            padding: 16,
            borderRadius: 8,
            marginBottom: 8,
            borderWidth: 1,
            borderColor: theme.border,
        },
        roundInfo: {
            flex: 1,
        },
        roundTitle: {
            fontSize: 16,
            fontWeight: '500',
            color: theme.text,
        },
        roundDate: {
            fontSize: 14,
            color: theme.textSecondary,
            marginTop: 2,
        },
        joinButton: {
            backgroundColor: theme.primary,
            margin: 20,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        joinButtonJoined: {
            backgroundColor: theme.error,
        },
        joinButtonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
            marginLeft: 8,
        },
    });

    const renderOverview = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tournament Details</Text>
                <View style={styles.infoGrid}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Format</Text>
                        <Text style={styles.infoValue}>{league.format}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Time Control</Text>
                        <Text style={styles.infoValue}>{league.timeControl}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Participants</Text>
                        <Text style={styles.infoValue}>{league.participants}/{league.maxParticipants}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Prize Pool</Text>
                        <Text style={styles.infoValue}>{league.prize}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Rounds</Text>
                        <Text style={styles.infoValue}>{league.rounds}</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Organizer</Text>
                        <Text style={styles.infoValue}>{league.organizer}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>{league.description}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Rules</Text>
                {league.rules.map((rule, index) => (
                    <View key={index} style={styles.ruleItem}>
                        <Ionicons name="checkmark-circle" size={16} color={theme.success} />
                        <Text style={styles.ruleText}>{rule}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderParticipants = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Participants ({league.participants})</Text>
                {league.participants_list.map((participant) => (
                    <View key={participant.id} style={styles.participantItem}>
                        <Text style={{ fontSize: 20 }}>{participant.country}</Text>
                        <View style={styles.participantInfo}>
                            <Text style={styles.participantName}>{participant.name}</Text>
                            <Text style={styles.participantRating}>Rating: {participant.rating}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color={theme.textMuted} />
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderSchedule = () => (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Tournament Schedule</Text>
                {league.schedule.map((round) => (
                    <View key={round.round} style={styles.scheduleItem}>
                        <View style={styles.roundInfo}>
                            <Text style={styles.roundTitle}>Round {round.round}</Text>
                            <Text style={styles.roundDate}>{round.date}</Text>
                        </View>
                        <Ionicons 
                            name={round.status === 'upcoming' ? 'time-outline' : 'checkmark-circle'} 
                            size={20} 
                            color={round.status === 'upcoming' ? theme.warning : theme.success} 
                        />
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>{league.name}</Text>
                    <Text style={styles.subtitle}>{league.startDate} - {league.endDate}</Text>
                </View>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{league.status}</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                {(['overview', 'participants', 'schedule'] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'participants' && renderParticipants()}
            {activeTab === 'schedule' && renderSchedule()}

            {/* Join Button */}
            {league.status === 'upcoming' && (
                <TouchableOpacity 
                    style={[styles.joinButton, isJoined && styles.joinButtonJoined]}
                    onPress={handleJoinLeague}
                >
                    <Ionicons 
                        name={isJoined ? "exit" : "add-circle"} 
                        size={20} 
                        color="#ffffff" 
                    />
                    <Text style={styles.joinButtonText}>
                        {isJoined ? 'Leave League' : 'Join League'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
