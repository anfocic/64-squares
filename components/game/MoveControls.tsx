import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigationState} from '@/hooks/game/useNavigationState';
import React from 'react';
import {Move} from "@/lib/types/board";

type Props = {
    moves?: Move[],
    startingFEN?: string,
};

const MoveControls = ({moves, startingFEN}: Props) => {
    const {
        goBack,
        goForward,
        canGoBack,
        canGoForward,
    } = useNavigationState(moves, startingFEN);
    console.log('hello moves')
    const disabledColor = '#586e75';
    const activeColor = '#93a1a1';

    return (
        <View style={styles.submenu}>
            <TouchableOpacity
                style={styles.submenuButton}
                onPress={goBack}
                disabled={!canGoBack}
            >
                <Ionicons
                    name="chevron-back-outline"
                    size={24}
                    color={canGoBack ? activeColor : disabledColor}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.submenuButton}
                onPress={goForward}
                disabled={!canGoForward}
            >
                <Ionicons
                    name="chevron-forward-outline"
                    size={24}
                    color={canGoForward ? activeColor : disabledColor}
                />
            </TouchableOpacity>
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

export default MoveControls;