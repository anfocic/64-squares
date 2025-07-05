import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigationState} from '@/hooks/game/useNavigationState';
import { useTheme } from "@/context/ThemeContext";
import React from 'react';
import {Move} from "@/lib/types/board";

type Props = {
    moves?: Move[],
    startingFEN?: string,
};

const MoveControls = ({moves, startingFEN}: Props) => {
    const { theme } = useTheme();
    const {
        goBack,
        goForward,
        canGoBack,
        canGoForward,
    } = useNavigationState(moves || [], startingFEN || "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            gap: 8,
        },
        moveButton: {
            backgroundColor: theme.cardBackground,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: theme.border,
            minWidth: 48,
        },
        disabledButton: {
            opacity: 0.5,
        },
    });

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.moveButton, !canGoBack && styles.disabledButton]}
                onPress={goBack}
                disabled={!canGoBack}
            >
                <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color={theme.text}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.moveButton, !canGoForward && styles.disabledButton]}
                onPress={goForward}
                disabled={!canGoForward}
            >
                <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color={theme.text}
                />
            </TouchableOpacity>
        </View>
    );
};

export default MoveControls;