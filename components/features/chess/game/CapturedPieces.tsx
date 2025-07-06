import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from "@/context/ThemeContext";

interface CapturedPiecesProps {
    capturedPieces: string[];
    materialAdvantage?: number;
}

const CapturedPieces: React.FC<CapturedPiecesProps> = ({ 
    capturedPieces, 
    materialAdvantage = 0 
}) => {
    const { theme } = useTheme();

    // Unicode chess pieces
    const pieceSymbols: { [key: string]: string } = {
        'p': '♟', 'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚',
        'P': '♙', 'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔'
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            minHeight: 24,
        },
        pieceText: {
            fontSize: 16,
            color: theme.text,
            marginRight: 2,
        },
        advantageContainer: {
            backgroundColor: theme.success + '20',
            borderRadius: 4,
            paddingHorizontal: 6,
            paddingVertical: 2,
            marginLeft: 8,
        },
        advantageText: {
            fontSize: 12,
            fontWeight: '600',
            color: theme.success,
        },
        emptyText: {
            fontSize: 12,
            color: theme.textSecondary,
            fontStyle: 'italic',
        },
    });

    if (capturedPieces.length === 0 && materialAdvantage <= 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>No captures</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {capturedPieces.map((piece, index) => (
                <Text key={index} style={styles.pieceText}>
                    {pieceSymbols[piece] || piece}
                </Text>
            ))}
            
            {materialAdvantage > 0 && (
                <View style={styles.advantageContainer}>
                    <Text style={styles.advantageText}>+{materialAdvantage}</Text>
                </View>
            )}
        </View>
    );
};

export default CapturedPieces;
