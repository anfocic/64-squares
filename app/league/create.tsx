import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useCreateLeague } from "@/hooks/useCreateLeague";
import {useAuth} from "@/context/AuthContext"; // adjust path

export default function CreateLeagueScreen() {
    const [name, setName] = useState("");
    const { mutateAsync, isPending } = useCreateLeague();
    const { accessToken } = useAuth(); // optional, depending on how you handle auth
    console.log(accessToken)
    const handleCreateLeague = async () => {
        if (!name.trim()) {
            return Alert.alert("Error", "League name is required.");
        }

        if (!accessToken) {
            return Alert.alert("Error", "You must be logged in to create a league.");
        }

        try {
            await mutateAsync({
                data: { name },
                token: accessToken,
            });

            Alert.alert("Success", "League created!");
            router.back();
        } catch (err) {
            console.error("Failed to create league", err);
            Alert.alert("Error", "Failed to create league.");
        }
    };

    return (
        <View style={{ flex: 1, padding: 16 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
                Create a New League
            </Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    padding: 12,
                    marginBottom: 20,
                    borderRadius: 6,
                }}
                placeholder="League name"
                value={name}
                onChangeText={setName}
            />
            <Button
                title={isPending ? "Creating..." : "Create League"}
                onPress={handleCreateLeague}
                disabled={isPending}
            />
        </View>
    );
}