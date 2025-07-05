import React from "react";
import {Button, Text, View} from "react-native";
import TextInput from "@/components/atoms/TextInput";
import SwitchInput from "@/components/atoms/SwitchInput";
import {FieldValues} from "react-hook-form";
import {FormProps} from "@/lib/types/props";

export default function LeagueForm<T extends FieldValues>({control, onSubmit, handleSubmit, isSubmitting}: FormProps<T>) {
    return (
        <View style={{flex: 1, padding: 16}}>
            <Text style={{fontSize: 24, fontWeight: "bold", marginBottom: 16}}>
                Create a New League
            </Text>

            <TextInput control={control} name="name" placeholder="League name"/>
            <TextInput control={control} name="format" placeholder="Format"/>
            <TextInput control={control} name="rounds" placeholder="Rounds" keyboardType="numeric"/>
            <TextInput control={control} name="base_minutes" placeholder="Base Minutes" keyboardType="numeric"/>
            <TextInput control={control} name="increment_seconds" placeholder="Increment Seconds"
                       keyboardType="numeric"/>
            <TextInput control={control} name="games_per_pairing" placeholder="Games Per Pairing"
                       keyboardType="numeric"/>
            <SwitchInput control={control} name="allow_draws" placeholder="Allow Draws"/>
            <SwitchInput control={control} name="auto_pairing" placeholder="Auto Pairing"/>


            <Button
                title={isSubmitting ? "Creating..." : "Create League"}
                onPress={handleSubmit(onSubmit)}
                disabled={isSubmitting}
            />
        </View>
    );
}