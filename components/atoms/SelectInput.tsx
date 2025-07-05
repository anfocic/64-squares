import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface SelectOption {
    label: string;
    value: string | number;
}

interface SelectInputProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    placeholder: string;
    options: SelectOption[];
}

export default function SelectInput<T extends FieldValues>({
    control,
    name,
    placeholder,
    options
}: SelectInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 4 }}>{placeholder}</Text>
                    <Picker selectedValue={value} onValueChange={onChange}>
                        {options.map((opt) => (
                            <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
                        ))}
                    </Picker>
                    {error && <Text style={{ color: "red" }}>{error.message}</Text>}
                </View>
            )}
        />
    );
}