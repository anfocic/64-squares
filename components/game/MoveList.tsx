import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";
import { useGame } from "@/context/GameContext";

interface MoveListProps {
    maxHeight?: number;
}

const MoveList: React.FC<MoveListProps> = ({ maxHeight = 200 }) => {
    const { theme } = useTheme();
    const { game } = useGame();

    // Get move history from chess.js
    const moveHistory = game.history({ verbose: true });

    // Group moves into pairs (white, black)
    const movePairs: Array<{
        moveNumber: number;
        white?: any;
        black?: any;
    }> = [];

    for (let i = 0; i < moveHistory.length; i += 2) {
        const moveNumber = Math.floor(i / 2) + 1;
        movePairs.push({
            moveNumber,
            white: moveHistory[i],
            black: moveHistory[i + 1],
        });
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: theme.cardBackground,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.border,
            maxHeight,
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 12,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        headerText: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text,
        },
        moveCount: {
            fontSize: 14,
            color: theme.textSecondary,
        },
        scrollContainer: {
            flex: 1,
        },
        moveRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderBottomWidth: 1,
            borderBottomColor: theme.border + '20',
        },
        moveNumber: {
            width: 30,
            fontSize: 14,
            fontWeight: '500',
            color: theme.textSecondary,
        },
        moveButton: {
            flex: 1,
            paddingVertical: 4,
            paddingHorizontal: 8,
            marginHorizontal: 2,
            borderRadius: 4,
        },
        moveText: {
            fontSize: 14,
            color: theme.text,
            textAlign: 'center',
        },
        activeMoveButton: {
            backgroundColor: theme.primary + '20',
        },
        activeMoveText: {
            color: theme.primary,
            fontWeight: '600',
        },
        emptyState: {
            padding: 20,
            alignItems: 'center',
        },
        emptyText: {
            color: theme.textSecondary,
            fontSize: 14,
            fontStyle: 'italic',
        },
    });

    const handleMovePress = (moveIndex: number) => {
        // TODO: Implement move navigation
        console.log('Navigate to move:', moveIndex);
    };

    if (moveHistory.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Moves</Text>
                    <Text style={styles.moveCount}>0 moves</Text>
                </View>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No moves yet</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Moves</Text>
                <Text style={styles.moveCount}>{moveHistory.length} moves</Text>
            </View>

            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {movePairs.map((pair, index) => (
                    <View key={index} style={styles.moveRow}>
                        <Text style={styles.moveNumber}>{pair.moveNumber}.</Text>

                        {pair.white && (
                            <TouchableOpacity
                                style={styles.moveButton}
                                onPress={() => handleMovePress(index * 2)}
                            >
                                <Text style={styles.moveText}>{pair.white.san}</Text>
                            </TouchableOpacity>
                        )}

                        {pair.black ? (
                            <TouchableOpacity
                                style={styles.moveButton}
                                onPress={() => handleMovePress(index * 2 + 1)}
                            >
                                <Text style={styles.moveText}>{pair.black.san}</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.moveButton} />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default MoveList;