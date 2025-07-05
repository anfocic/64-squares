import React, {useState} from "react";
import {View, Text, Button, Platform} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Controller} from "react-hook-form";
import {InputProps} from "@/lib/types/props";


export default function DatePickerInput<T extends Record<string, any>>({control, name, placeholder,}: InputProps<T>) {
    const [show, setShow] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            render={({field: {value, onChange}, fieldState: {error}}) => (
                <View style={{marginBottom: 16}}>
                    <Text style={{marginBottom: 4}}>{placeholder}</Text>
                    <Button title={value ? value.toDateString() : "Pick a date"} onPress={() => setShow(true)}/>
                    {show && (
                        <DateTimePicker
                            value={value || new Date()}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShow(Platform.OS === "ios"); // iOS keeps it open
                                if (selectedDate) {
                                    onChange(selectedDate);
                                }
                            }}
                        />
                    )}
                    {error && <Text style={{color: "red"}}>{error.message}</Text>}
                </View>
            )}
        />
    );
}