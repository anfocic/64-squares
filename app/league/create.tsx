import React, {useCallback} from "react";
import {Alert} from "react-native";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateLeague} from "@/hooks/useCreateLeague";
import {useAuth} from "@/context/AuthContext";
import LeagueForm from "@/components/LeagueForm";
import {defaultLeagueValues, leagueSchema} from "@/constants/league";
import {LeagueFormFields} from "@/types/league";

export default function CreateLeagueScreen() {
    const {accessToken} = useAuth();
    const {control, handleSubmit, formState: {isSubmitting}} = useForm<LeagueFormFields>({
        defaultValues: defaultLeagueValues,
        resolver: yupResolver(leagueSchema),
    });

    const {createLeagueAsync, isLoading} = useCreateLeague();

    const onSubmit = useCallback(async (data: LeagueFormFields) => {
        try {
            await createLeagueAsync({
                token: accessToken as string,
                data: {
                    name: data.name as string,
                    settings: {
                        format: data.format,
                        rounds: data.rounds,
                        base_minutes: data.base_minutes,
                        increment_seconds: data.increment_seconds,
                        games_per_pairing: data.games_per_pairing,
                        allow_draws: data.allow_draws,
                        auto_pairing: data.auto_pairing,
                        start_date: data.start_date.toISOString().split("T")[0],
                    },
                },
            });
            Alert.alert("Success", "League created!");
        } catch (err) {
            console.error("Failed to create league", err);
            Alert.alert("Error", "Failed to create league.");
        }
    }, [createLeagueAsync, accessToken]);

    return (
        <LeagueForm control={control}
                    isSubmitting={isSubmitting || isLoading}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
        />
    );
}