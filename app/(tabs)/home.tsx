import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
    const { logout } = useAuth();
    const { theme, isDark, toggleTheme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            padding: 20
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 40,
        },
        title: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.text,
            textAlign: 'center',
            flex: 1,
        },
        subtitle: {
            fontSize: 18,
            color: theme.textSecondary,
            textAlign: 'center',
            marginBottom: 40,
        },
        themeButton: {
            backgroundColor: theme.surface,
            padding: 12,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.border,
        },
        logoutButton: {
            backgroundColor: theme.error,
            padding: 16,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
        },
        logoutButtonText: {
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 'bold',
        },
        welcomeCard: {
            backgroundColor: theme.card,
            padding: 24,
            borderRadius: 12,
            marginBottom: 20,
            borderWidth: 1,
            borderColor: theme.border,
        },
        cardTitle: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            marginBottom: 8,
        },
        cardText: {
            fontSize: 16,
            color: theme.textSecondary,
            lineHeight: 24,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 44 }} />
                <Text style={styles.title}>64 Squares</Text>
                <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
                    <Ionicons
                        name={isDark ? "sunny" : "moon"}
                        size={20}
                        color={theme.text}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>Welcome to your chess journey!</Text>

            <View style={styles.welcomeCard}>
                <Text style={styles.cardTitle}>🎯 Ready to Play?</Text>
                <Text style={styles.cardText}>
                    Start a new game, join a tournament, or practice your skills.
                    Your chess adventure awaits!
                </Text>
            </View>

            <View style={styles.welcomeCard}>
                <Text style={styles.cardTitle}>🏆 Tournaments & Leagues</Text>
                <Text style={styles.cardText}>
                    Compete with players worldwide in organized tournaments
                    and climb the leaderboards.
                </Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}