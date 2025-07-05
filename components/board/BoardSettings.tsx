import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BoardTheme, BoardStyle } from './Board';
import { BOARD_THEMES, BOARD_STYLES } from './BoardThemes';

interface BoardSettingsProps {
    visible: boolean;
    onClose: () => void;
    boardTheme: BoardTheme;
    boardStyle: BoardStyle;
    onThemeChange: (theme: Partial<BoardTheme>) => void;
    onStyleChange: (style: Partial<BoardStyle>) => void;
}

export default function BoardSettings({
    visible,
    onClose,
    boardTheme,
    boardStyle,
    onThemeChange,
    onStyleChange,
}: BoardSettingsProps) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
        },
        modal: {
            backgroundColor: theme.surface,
            borderRadius: 16,
            padding: 24,
            width: '90%',
            maxWidth: 400,
            maxHeight: '80%',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: theme.text,
        },
        closeButton: {
            padding: 8,
        },
        section: {
            marginBottom: 24,
        },
        sectionTitle: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 12,
        },
        themeGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
        },
        themeOption: {
            width: 80,
            alignItems: 'center',
        },
        themePreview: {
            width: 60,
            height: 60,
            borderRadius: 8,
            marginBottom: 8,
            borderWidth: 2,
            borderColor: 'transparent',
        },
        themePreviewSelected: {
            borderColor: theme.primary,
        },
        themeSquare: {
            width: '50%',
            height: '50%',
        },
        themeName: {
            fontSize: 12,
            color: theme.textSecondary,
            textAlign: 'center',
        },
        settingItem: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.divider,
        },
        settingLabel: {
            fontSize: 14,
            color: theme.text,
        },
        switch: {
            transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
        },
        presetGrid: {
            gap: 8,
        },
        presetButton: {
            backgroundColor: theme.card,
            borderRadius: 8,
            padding: 12,
            borderWidth: 1,
            borderColor: theme.border,
        },
        presetButtonSelected: {
            borderColor: theme.primary,
            backgroundColor: theme.primary + '20',
        },
        presetButtonText: {
            fontSize: 14,
            fontWeight: '600',
            color: theme.text,
            marginBottom: 4,
        },
        presetButtonTextSelected: {
            color: theme.primary,
        },
        presetDescription: {
            fontSize: 12,
            color: theme.textSecondary,
        },
    });

    const renderThemeOption = (key: string, themeOption: any) => {
        const isSelected = boardTheme.lightSquare === themeOption.lightSquare;

        return (
            <TouchableOpacity
                key={key}
                style={styles.themeOption}
                onPress={() => onThemeChange({
                    lightSquare: themeOption.lightSquare,
                    darkSquare: themeOption.darkSquare,
                    highlightSquare: themeOption.highlightSquare,
                    selectedSquare: themeOption.selectedSquare,
                    checkSquare: themeOption.checkSquare,
                    lastMoveSquare: themeOption.lastMoveSquare,
                })}
            >
                <View style={[
                    styles.themePreview,
                    isSelected && styles.themePreviewSelected,
                ]}>
                    <View style={{ flexDirection: 'row', height: '50%' }}>
                        <View style={[styles.themeSquare, { backgroundColor: themeOption.lightSquare }]} />
                        <View style={[styles.themeSquare, { backgroundColor: themeOption.darkSquare }]} />
                    </View>
                    <View style={{ flexDirection: 'row', height: '50%' }}>
                        <View style={[styles.themeSquare, { backgroundColor: themeOption.darkSquare }]} />
                        <View style={[styles.themeSquare, { backgroundColor: themeOption.lightSquare }]} />
                    </View>
                </View>
                <Text style={styles.themeName}>{themeOption.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Board Settings</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Ionicons name="close" size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Board Theme</Text>
                            <View style={styles.themeGrid}>
                                {Object.entries(BOARD_THEMES).map(([key, themeOption]) =>
                                    renderThemeOption(key, themeOption)
                                )}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Style Presets</Text>
                            <View style={styles.presetGrid}>
                                {Object.entries(BOARD_STYLES).map(([key, stylePreset]) => (
                                    <TouchableOpacity
                                        key={key}
                                        style={[
                                            styles.presetButton,
                                            boardStyle.showCoordinates === stylePreset.showCoordinates &&
                                            boardStyle.showLastMove === stylePreset.showLastMove &&
                                            boardStyle.showPossibleMoves === stylePreset.showPossibleMoves &&
                                            styles.presetButtonSelected
                                        ]}
                                        onPress={() => onStyleChange(stylePreset)}
                                    >
                                        <Text style={[
                                            styles.presetButtonText,
                                            boardStyle.showCoordinates === stylePreset.showCoordinates &&
                                            boardStyle.showLastMove === stylePreset.showLastMove &&
                                            boardStyle.showPossibleMoves === stylePreset.showPossibleMoves &&
                                            styles.presetButtonTextSelected
                                        ]}>
                                            {stylePreset.name}
                                        </Text>
                                        <Text style={styles.presetDescription}>
                                            {stylePreset.description}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Display Options</Text>
                            
                            <View style={styles.settingItem}>
                                <Text style={styles.settingLabel}>Show Coordinates</Text>
                                <TouchableOpacity
                                    onPress={() => onStyleChange({ showCoordinates: !boardStyle.showCoordinates })}
                                >
                                    <Ionicons
                                        name={boardStyle.showCoordinates ? "checkbox" : "square-outline"}
                                        size={20}
                                        color={boardStyle.showCoordinates ? theme.primary : theme.textMuted}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.settingItem}>
                                <Text style={styles.settingLabel}>Show Last Move</Text>
                                <TouchableOpacity
                                    onPress={() => onStyleChange({ showLastMove: !boardStyle.showLastMove })}
                                >
                                    <Ionicons
                                        name={boardStyle.showLastMove ? "checkbox" : "square-outline"}
                                        size={20}
                                        color={boardStyle.showLastMove ? theme.primary : theme.textMuted}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.settingItem}>
                                <Text style={styles.settingLabel}>Show Possible Moves</Text>
                                <TouchableOpacity
                                    onPress={() => onStyleChange({ showPossibleMoves: !boardStyle.showPossibleMoves })}
                                >
                                    <Ionicons
                                        name={boardStyle.showPossibleMoves ? "checkbox" : "square-outline"}
                                        size={20}
                                        color={boardStyle.showPossibleMoves ? theme.primary : theme.textMuted}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.settingItem}>
                                <Text style={styles.settingLabel}>Board Shadow</Text>
                                <TouchableOpacity
                                    onPress={() => onStyleChange({ shadowEnabled: !boardStyle.shadowEnabled })}
                                >
                                    <Ionicons
                                        name={boardStyle.shadowEnabled ? "checkbox" : "square-outline"}
                                        size={20}
                                        color={boardStyle.shadowEnabled ? theme.primary : theme.textMuted}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}
