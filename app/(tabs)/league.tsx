import {Button, FlatList, Text, View} from "react-native";
import React from "react";
import {router} from "expo-router";
import {useLeagues} from "@/hooks/league/useGetLeagues";

export default function LeagueScreen() {
    const { data: leagues } = useLeagues();

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
            <Button title="Join League" onPress={() => router.push("/league/create")} />
        </View>
    );
}