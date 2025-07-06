import React from 'react';
import { View, Text, TextInput as RNTextInput, StyleSheet, TextInputProps } from 'react-native';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { useTheme } from '@/context/ThemeContext';

interface FormFieldProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

export default function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required = false,
  multiline = false,
  numberOfLines = 1,
  ...textInputProps
}: FormFieldProps<T>) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    labelContainer: {
      flexDirection: 'row',
      marginBottom: 6,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.text,
    },
    required: {
      color: theme.error,
      marginLeft: 2,
    },
    inputContainer: {
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: theme.surface,
    },
    input: {
      padding: 12,
      fontSize: 16,
      color: theme.text,
      minHeight: multiline ? numberOfLines * 20 + 24 : 48,
    },
    inputFocused: {
      borderColor: theme.primary,
      borderWidth: 2,
    },
    inputError: {
      borderColor: theme.error,
      borderWidth: 2,
    },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error, isTouched } }) => {
        const hasError = error && isTouched;
        
        return (
          <View style={styles.container}>
            {label && (
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                {required && <Text style={styles.required}>*</Text>}
              </View>
            )}
            
            <View style={[
              styles.inputContainer,
              { borderColor: hasError ? theme.error : theme.border },
              hasError && styles.inputError,
            ]}>
              <RNTextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={theme.textMuted}
                value={value?.toString() || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? 'top' : 'center'}
                {...textInputProps}
              />
            </View>
            
            {hasError && (
              <Text style={styles.errorText}>{error.message}</Text>
            )}
          </View>
        );
      }}
    />
  );
}
