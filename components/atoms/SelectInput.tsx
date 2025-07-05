import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";

export default function SelectInput({ control, name, placeholder, options }) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 4 }}>{placeholder}</Text>
                    <Picker selectedValue={value} onValueChange={onChange}>
                        {options.map((opt) => (
                            <Picker.Item key={opt} label={opt} value={opt} />
                        ))}
                    </Picker>
                    {error && <Text style={{ color: "red" }}>{error.message}</Text>}
                </View>
            )}
        />
    );
}