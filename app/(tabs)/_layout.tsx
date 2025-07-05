import { Tabs } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@/context/ThemeContext";

export default function TabsLayout() {
    const { theme } = useTheme();

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.surface,
                    borderTopColor: theme.border,
                },
                tabBarActiveTintColor: theme.primary,
                tabBarInactiveTintColor: theme.textMuted,
                headerStyle: {
                    backgroundColor: theme.surface,
                },
                headerTintColor: theme.text,
                headerTitleStyle: {
                    color: theme.text,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="game"
                options={{
                    title: "Game",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="game-controller-outline" size={size} color={color} />
                    ),
                    tabBarStyle: { display: 'none' },
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="league"
                options={{
                    title: "League",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="trophy" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}