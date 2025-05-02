import { View, Text, FlatList, Button } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const mockLeagues = [
    { id: "1", name: "Winter Chess League" },
    { id: "2", name: "Rapid Fire League" },
    { id: "3", name: "Weekly Blitz" },
];

export default function LeagueScreen() {
    const [leagues, setLeagues] = useState(mockLeagues);

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>Leagues</Text>

            <FlatList
                data={leagues}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 12, backgroundColor: "#eee", marginBottom: 10, borderRadius: 8 }}>
                        <Text style={{ fontSize: 18 }}>{item.name}</Text>
                    </View>
                )}
            />

            <Button title="Create New League" onPress={() => router.push("/league/create")} />
        </View>
    );
}