import { Tabs } from "expo-router";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs>
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
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" size={size} color={color} />
                    ),
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
        </Tabs>
    );
}