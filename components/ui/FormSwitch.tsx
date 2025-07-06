import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { useTheme } from '@/context/ThemeContext';

interface FormSwitchProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
}

export default function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required = false,
}: FormSwitchProps<T>) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    labelContainer: {
      flex: 1,
      marginRight: 12,
    },
    labelRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.text,
    },
    required: {
      color: theme.error,
      marginLeft: 2,
    },
    description: {
      fontSize: 14,
      color: theme.textSecondary,
      marginTop: 2,
    },
    switch: {
      transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
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
      render={({ field: { onChange, value }, fieldState: { error, isTouched } }) => {
        const hasError = error && isTouched;
        
        return (
          <View style={styles.container}>
            <View style={styles.row}>
              <View style={styles.labelContainer}>
                <View style={styles.labelRow}>
                  <Text style={styles.label}>{label}</Text>
                  {required && <Text style={styles.required}>*</Text>}
                </View>
                {description && (
                  <Text style={styles.description}>{description}</Text>
                )}
              </View>
              
              <Switch
                style={styles.switch}
                value={value || false}
                onValueChange={onChange}
                trackColor={{ 
                  false: theme.border, 
                  true: theme.primary + '40' 
                }}
                thumbColor={value ? theme.primary : theme.textMuted}
                ios_backgroundColor={theme.border}
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
