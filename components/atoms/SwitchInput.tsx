import React from "react";
import {View, Text, Switch} from "react-native";
import {Controller, FieldValues} from "react-hook-form";
import type {InputProps} from "@/types/props";

function SwitchInput<T extends FieldValues>({control, name, placeholder}: InputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({field: {onChange, value}, fieldState: {error}}) => (
                <View style={{marginBottom: 8}}>
                    <Text style={{marginBottom: 4}}>{placeholder}</Text>
                    <Switch value={value ?? false} onValueChange={onChange}/>
                    {error && <Text style={{color: "red"}}>{error.message}</Text>}
                </View>
            )}
        />
    );
}

export default React.memo(SwitchInput);