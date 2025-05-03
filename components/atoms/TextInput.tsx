import React from "react";
import {Text, TextInput as RNTextInput} from "react-native";
import {Controller, FieldValues} from "react-hook-form";
import type {InputProps} from "@/types/props";

function TextInput<T extends FieldValues>({control, name, placeholder, keyboardType = "default",}: InputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <>
                    <RNTextInput
                        style={{
                            borderWidth: 1,
                            borderColor: error ? "red" : "#ccc",
                            padding: 12,
                            marginBottom: 8,
                            borderRadius: 6,
                        }}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        value={String(value ?? "")}
                        onChangeText={onChange}
                    />
                    {error && <Text style={{color: "red"}}>{error.message}</Text>}
                </>
            )}
        />
    );
}

export default React.memo(TextInput);