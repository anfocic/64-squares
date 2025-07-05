import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BoardTheme, BoardStyle } from '@/components/board/Board';

interface BoardThemeContextType {
    boardTheme: BoardTheme;
    boardStyle: BoardStyle;
    setBoardTheme: (theme: Partial<BoardTheme>) => void;
    setBoardStyle: (style: Partial<BoardStyle>) => void;
    resetToDefaults: () => void;
}

const BoardThemeContext = createContext<BoardThemeContextType | undefined>(undefined);

const DEFAULT_BOARD_THEME: BoardTheme = {
    lightSquare: '#f0d9b5',
    darkSquare: '#b58863',
    highlightSquare: '#ffff00',
    selectedSquare: '#ff6b6b',
    checkSquare: '#ff4444',
    lastMoveSquare: '#8bc34a60',
};

const DEFAULT_BOARD_STYLE: BoardStyle = {
    showCoordinates: true,
    showLastMove: true,
    showPossibleMoves: true,
    animationDuration: 200,
    borderRadius: 8,
    shadowEnabled: true,
};

export const BoardThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [boardTheme, setBoardThemeState] = useState<BoardTheme>(DEFAULT_BOARD_THEME);
    const [boardStyle, setBoardStyleState] = useState<BoardStyle>(DEFAULT_BOARD_STYLE);

    useEffect(() => {
        loadBoardSettings();
    }, []);

    const loadBoardSettings = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('boardTheme');
            const savedStyle = await AsyncStorage.getItem('boardStyle');

            if (savedTheme) {
                const parsedTheme = JSON.parse(savedTheme);
                setBoardThemeState({ ...DEFAULT_BOARD_THEME, ...parsedTheme });
            }

            if (savedStyle) {
                const parsedStyle = JSON.parse(savedStyle);
                setBoardStyleState({ ...DEFAULT_BOARD_STYLE, ...parsedStyle });
            }
        } catch (error) {
            console.error('Error loading board settings:', error);
        }
    };

    const saveBoardTheme = async (theme: BoardTheme) => {
        try {
            await AsyncStorage.setItem('boardTheme', JSON.stringify(theme));
        } catch (error) {
            console.error('Error saving board theme:', error);
        }
    };

    const saveBoardStyle = async (style: BoardStyle) => {
        try {
            await AsyncStorage.setItem('boardStyle', JSON.stringify(style));
        } catch (error) {
            console.error('Error saving board style:', error);
        }
    };

    const setBoardTheme = (themeUpdate: Partial<BoardTheme>) => {
        const newTheme = { ...boardTheme, ...themeUpdate };
        setBoardThemeState(newTheme);
        saveBoardTheme(newTheme);
    };

    const setBoardStyle = (styleUpdate: Partial<BoardStyle>) => {
        const newStyle = { ...boardStyle, ...styleUpdate };
        setBoardStyleState(newStyle);
        saveBoardStyle(newStyle);
    };

    const resetToDefaults = () => {
        setBoardThemeState(DEFAULT_BOARD_THEME);
        setBoardStyleState(DEFAULT_BOARD_STYLE);
        saveBoardTheme(DEFAULT_BOARD_THEME);
        saveBoardStyle(DEFAULT_BOARD_STYLE);
    };

    return (
        <BoardThemeContext.Provider
            value={{
                boardTheme,
                boardStyle,
                setBoardTheme,
                setBoardStyle,
                resetToDefaults,
            }}
        >
            {children}
        </BoardThemeContext.Provider>
    );
};

export const useBoardTheme = () => {
    const context = useContext(BoardThemeContext);
    if (!context) {
        throw new Error('useBoardTheme must be used within a BoardThemeProvider');
    }
    return context;
};
