import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

interface SettingItem {
    title: string;
    subtitle?: string;
    icon: string;
    type: 'navigation' | 'toggle' | 'info';
    value?: boolean;
    onPress?: () => void;
    onToggle?: (value: boolean) => void;
}

interface SettingsSectionProps {
    title: string;
    items: SettingItem[];
}

export default function SettingsSection({ title, items }: SettingsSectionProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.textSecondary,
            marginBottom: 12,
            marginLeft: 4,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
        },
        item: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.card,
            padding: 16,
            borderRadius: 12,
            marginBottom: 8,
            borderWidth: 1,
            borderColor: theme.border,
        },
        itemIcon: {
            marginRight: 16,
        },
        itemContent: {
            flex: 1,
        },
        itemTitle: {
            fontSize: 16,
            color: theme.text,
            marginBottom: 2,
        },
        itemSubtitle: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        itemAction: {
            marginLeft: 12,
        },
        chevron: {
            opacity: 0.6,
        },
    });

    const renderItem = (item: SettingItem, index: number) => {
        const ItemWrapper = item.type === 'info' ? View : TouchableOpacity;
        
        return (
            <ItemWrapper
                key={index}
                style={styles.item}
                onPress={item.type === 'navigation' ? item.onPress : undefined}
                activeOpacity={item.type === 'navigation' ? 0.7 : 1}
            >
                <Ionicons 
                    name={item.icon as any} 
                    size={20} 
                    color={theme.textSecondary} 
                    style={styles.itemIcon}
                />
                <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                    {item.subtitle && (
                        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
                    )}
                </View>
                <View style={styles.itemAction}>
                    {item.type === 'toggle' && (
                        <Switch
                            value={item.value || false}
                            onValueChange={item.onToggle}
                            trackColor={{ 
                                false: theme.border, 
                                true: theme.primary + '40' 
                            }}
                            thumbColor={item.value ? theme.primary : theme.textMuted}
                        />
                    )}
                    {item.type === 'navigation' && (
                        <Ionicons 
                            name="chevron-forward" 
                            size={16} 
                            color={theme.textMuted} 
                            style={styles.chevron}
                        />
                    )}
                </View>
            </ItemWrapper>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {items.map(renderItem)}
        </View>
    );
}
