import React from "react";
import {StyleSheet, View, Text} from "react-native";

interface PlayerInfoProps {
    name: string;
    rating: number;
    country: string;
    imageUrl?: string;
}


export default function PlayerInfo({name, rating, country}: PlayerInfoProps) {
    return (
        <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{name} ({rating}) {country}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    playerInfo: {
        marginVertical: 8,
    },
    playerName: {
        fontSize: 20,
        fontWeight: '600',
        color: 'red',
    },
    playerImage: {
        width: 50,  // Adjust the width as needed
        height: 50, // Adjust the height as needed
        borderRadius: 25, // Circular image
    },
});