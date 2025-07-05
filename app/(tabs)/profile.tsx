import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useUser } from "@/context/UserContext";
import { Ionicons } from "@expo/vector-icons";
import ProfileCard from "@/components/profile/ProfileCard";
import UserStats from "@/components/profile/UserStats";
import SettingsSection from "@/components/profile/SettingsSection";

export default function ProfileScreen() {
    const { theme, isDark, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const { user, loading: userLoading } = useUser();
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Use real user data or fallback to mock data
    const userData = user ? {
        name: user.username,
        username: `@${user.username}`,
        email: user.email,
        rating: user.rating,
        country: user.country || "🌍 Global",
        joinDate: new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        }),
        gamesPlayed: user.gamesPlayed,
        wins: user.gamesWon,
        losses: user.gamesLost,
        draws: user.gamesDrawn,
        avatar: user.avatar,
    } : {
        name: "Chess Player",
        username: "@player",
        email: "player@64squares.com",
        rating: 1200,
        country: "🌍 Global",
        joinDate: "Recently",
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        avatar: null,
    };

    const stats = [
        { label: "Games Played", value: userData.gamesPlayed, icon: "game-controller" },
        { label: "Wins", value: userData.wins, icon: "trophy", color: theme.success },
        { label: "Rating", value: userData.rating, icon: "trending-up", color: theme.primary },
        { label: "Win Rate", value: `${Math.round((userData.wins / userData.gamesPlayed) * 100)}%`, icon: "stats-chart", color: theme.accent },
    ];

    const gameSettings = [
        {
            title: "Notifications",
            subtitle: "Game invites and updates",
            icon: "notifications",
            type: "toggle" as const,
            value: notificationsEnabled,
            onToggle: setNotificationsEnabled,
        },
        {
            title: "Sound Effects",
            subtitle: "Move sounds and alerts",
            icon: "volume-high",
            type: "toggle" as const,
            value: soundEnabled,
            onToggle: setSoundEnabled,
        },
        {
            title: "Theme",
            subtitle: isDark ? "Dark mode" : "Light mode",
            icon: isDark ? "moon" : "sunny",
            type: "navigation" as const,
            onPress: toggleTheme,
        },
    ];

    const accountSettings = [
        {
            title: "Edit Profile",
            subtitle: "Update your information",
            icon: "person",
            type: "navigation" as const,
            onPress: () => console.log("Edit Profile"),
        },
        {
            title: "Privacy Settings",
            subtitle: "Control your privacy",
            icon: "shield-checkmark",
            type: "navigation" as const,
            onPress: () => console.log("Privacy"),
        },
        {
            title: "Help & Support",
            subtitle: "Get help and contact us",
            icon: "help-circle",
            type: "navigation" as const,
            onPress: () => console.log("Help"),
        },
    ];

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        scrollContainer: {
            padding: 20,
        },
        header: {
            alignItems: 'center',
        },
        avatarContainer: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: theme.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 16,
            borderWidth: 3,
            borderColor: theme.border,
        },
        avatarText: {
            fontSize: 28,
            color: '#ffffff',
            fontWeight: 'bold',
        },
        name: {
            fontSize: 22,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 4,
        },
        username: {
            fontSize: 16,
            color: theme.textSecondary,
            marginBottom: 4,
        },
        country: {
            fontSize: 14,
            color: theme.textMuted,
            marginBottom: 4,
        },
        joinDate: {
            fontSize: 12,
            color: theme.textMuted,
            fontStyle: 'italic',
        },
        logoutButton: {
            backgroundColor: theme.error,
            padding: 16,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 40,
        },
        logoutButtonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

    if (userLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color={theme.primary} />
                <Text style={{ color: theme.text, marginTop: 16 }}>Loading profile...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <ProfileCard title="Profile" icon="person">
                    <View style={styles.header}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>
                                {userData.name.split(' ').map(n => n[0]).join('')}
                            </Text>
                        </View>
                        <Text style={styles.name}>{userData.name}</Text>
                        <Text style={styles.username}>{userData.username}</Text>
                        <Text style={styles.country}>{userData.country}</Text>
                        <Text style={styles.joinDate}>Member since {userData.joinDate}</Text>
                    </View>
                </ProfileCard>

                {/* Stats */}
                <ProfileCard title="Statistics" icon="stats-chart">
                    <UserStats stats={stats} layout="grid" />
                </ProfileCard>

                {/* Game Settings */}
                <SettingsSection title="Game Settings" items={gameSettings} />

                {/* Account Settings */}
                <SettingsSection title="Account" items={accountSettings} />

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out" size={20} color="#ffffff" style={{ marginRight: 8 }} />
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}