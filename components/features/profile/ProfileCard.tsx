import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface ProfileCardProps {
    title: string;
    children: React.ReactNode;
    icon?: string;
}

export default function ProfileCard({ title, children, icon }: ProfileCardProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.card,
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: theme.border,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            color: theme.text,
            marginLeft: icon ? 12 : 0,
        },
        content: {
            // Content styling can be customized by children
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {icon && (
                    <Ionicons 
                        name={icon as any} 
                        size={20} 
                        color={theme.primary} 
                    />
                )}
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}
