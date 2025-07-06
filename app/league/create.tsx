import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { LeagueForm } from "@/components/features/auth";
import { defaultLeagueValues, leagueSchema } from "@/lib/constants/league";
import { LeagueFormFields } from "@/lib/types/league";
import { useCreateLeague } from "@/hooks/league/useCreateLeague";
import { Ionicons } from "@expo/vector-icons";

export default function CreateLeagueScreen() {
    const { theme } = useTheme();
    const { accessToken } = useAuth();
    const { control, handleSubmit, formState: { isSubmitting } } = useForm<LeagueFormFields>({
        defaultValues: defaultLeagueValues,
        resolver: yupResolver(leagueSchema),
    });

    const { createLeagueAsync, isLoading } = useCreateLeague();

    const onSubmit = useCallback(async (data: LeagueFormFields) => {
        try {
            await createLeagueAsync({
                token: accessToken as string,
                data: {
                    name: data.name as string,
                    settings: {
                        name: data.name,
                        format: data.format,
                        rounds: data.rounds,
                        base_minutes: data.base_minutes,
                        increment_seconds: data.increment_seconds,
                        games_per_pairing: data.games_per_pairing,
                        allow_draws: data.allow_draws,
                        auto_pairing: data.auto_pairing,
                        start_date: data.start_date,
                    },
                },
            });
            Alert.alert(
                "Success",
                "League created successfully!",
                [
                    {
                        text: "OK",
                        onPress: () => router.back(),
                    }
                ]
            );
        } catch (err) {
            console.error("Failed to create league", err);
            Alert.alert("Error", "Failed to create league. Please try again.");
        }
    }, [createLeagueAsync, accessToken]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: theme.divider,
        },
        backButton: {
            marginRight: 16,
            padding: 8,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: theme.text,
            flex: 1,
        },
        subtitle: {
            fontSize: 16,
            color: theme.textSecondary,
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 20,
        },
        formContainer: {
            flex: 1,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={24}
                    color={theme.text}
                    style={styles.backButton}
                    onPress={() => router.back()}
                />
                <Text style={styles.title}>Create League</Text>
            </View>
            <Text style={styles.subtitle}>
                Set up a new tournament or league for players to join and compete.
            </Text>
            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
                <LeagueForm
                    control={control}
                    isSubmitting={isSubmitting || isLoading}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                />
            </ScrollView>
        </View>
    );
}