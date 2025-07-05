import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MoveControls from "@/components/game/MoveControls";

const GameControls = () => {
    return (
        <View style={styles.submenu}>
            <TouchableOpacity style={styles.submenuButton}>
                <Ionicons name="menu" size={24} color="#93a1a1" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.submenuButton}>
                <Ionicons name="chatbubble-outline" size={24} color="#93a1a1" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.submenuButton}>
                <Ionicons name="search-outline" size={24} color="#93a1a1" />
            </TouchableOpacity>

            <MoveControls/>
        </View>
    );
};

const styles = StyleSheet.create({
    submenu: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 20,
    },
    submenuButton: {
        backgroundColor: '#073642',
        padding: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default GameControls;