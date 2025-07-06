import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { Controller, FieldValues, Path, Control } from 'react-hook-form';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

interface SelectOption {
  label: string;
  value: string | number;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  required?: boolean;
}

export default function FormSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder = 'Select an option',
  options,
  required = false,
}: FormSelectProps<T>) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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
    selectButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      backgroundColor: theme.surface,
      minHeight: 48,
    },
    selectButtonError: {
      borderColor: theme.error,
      borderWidth: 2,
    },
    selectText: {
      fontSize: 16,
      color: theme.text,
      flex: 1,
    },
    placeholderText: {
      fontSize: 16,
      color: theme.textMuted,
      flex: 1,
    },
    chevron: {
      marginLeft: 8,
    },
    errorText: {
      color: theme.error,
      fontSize: 12,
      marginTop: 4,
      marginLeft: 4,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.surface,
      borderRadius: 12,
      padding: 16,
      width: '80%',
      maxHeight: '60%',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 16,
      textAlign: 'center',
    },
    optionItem: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    optionText: {
      fontSize: 16,
      color: theme.text,
    },
    selectedOption: {
      backgroundColor: theme.primary + '20',
    },
    selectedOptionText: {
      color: theme.primary,
      fontWeight: '600',
    },
    closeButton: {
      marginTop: 16,
      padding: 12,
      backgroundColor: theme.primary,
      borderRadius: 8,
      alignItems: 'center',
    },
    closeButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
  });

  const getSelectedLabel = (value: any) => {
    const option = options.find(opt => opt.value === value);
    return option?.label || '';
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error, isTouched } }) => {
        const hasError = error && isTouched;
        const selectedLabel = getSelectedLabel(value);
        
        return (
          <View style={styles.container}>
            {label && (
              <View style={styles.labelContainer}>
                <Text style={styles.label}>{label}</Text>
                {required && <Text style={styles.required}>*</Text>}
              </View>
            )}
            
            <TouchableOpacity
              style={[
                styles.selectButton,
                { borderColor: hasError ? theme.error : theme.border },
                hasError && styles.selectButtonError,
              ]}
              onPress={() => setIsOpen(true)}
            >
              <Text style={selectedLabel ? styles.selectText : styles.placeholderText}>
                {selectedLabel || placeholder}
              </Text>
              <Ionicons 
                name="chevron-down" 
                size={20} 
                color={theme.textMuted} 
                style={styles.chevron}
              />
            </TouchableOpacity>
            
            {hasError && (
              <Text style={styles.errorText}>{error.message}</Text>
            )}

            <Modal
              visible={isOpen}
              transparent
              animationType="fade"
              onRequestClose={() => setIsOpen(false)}
            >
              <View style={styles.modal}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{label || 'Select Option'}</Text>
                  
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={[
                          styles.optionItem,
                          value === item.value && styles.selectedOption,
                        ]}
                        onPress={() => {
                          onChange(item.value);
                          setIsOpen(false);
                        }}
                      >
                        <Text style={[
                          styles.optionText,
                          value === item.value && styles.selectedOptionText,
                        ]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                  
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setIsOpen(false)}
                  >
                    <Text style={styles.closeButtonText}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        );
      }}
    />
  );
}
