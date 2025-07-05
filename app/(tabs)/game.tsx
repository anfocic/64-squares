import React, { useState } from 'react';
import {StyleSheet, View, Text, Dimensions, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import GameControls from "@/components/game/GameControls";
import PlayerInfo from "@/components/board/PlayerInfo";
import Board from "@/components/board/Board";
import BoardSettings from "@/components/board/BoardSettings";
// import MoveList from "@/components/game/MoveList";
import GameTimer from "@/components/game/GameTimer";
import CapturedPieces from "@/components/game/CapturedPieces";
import GameModeSelector from "@/components/game/GameModeSelector";
import { useBoardTheme } from "@/context/BoardThemeContext";
import ComputerThinkingIndicator from "@/components/game/ComputerThinkingIndicator";
import {useGame, GameMode} from "@/context/GameContext";
import {useTheme} from "@/context/ThemeContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function GameScreen() {
    const {
        fen,
        isWhite,
        status,
        makeMove,
        isGameOver,
        winner,
        currentTurn,
        game,
        gameMode,
        isComputerThinking,
        isComputerTurn
    } = useGame();

    const { theme } = useTheme();
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // Game state
    const [showMoveList, setShowMoveList] = useState(false);
    const [showSetup, setShowSetup] = useState(true);
    const [gameStarted, setGameStarted] = useState(false);
    const [showBoardSettings, setShowBoardSettings] = useState(false);

    // Board theme context
    const {
        boardTheme,
        boardStyle,
        setBoardTheme,
        setBoardStyle,
    } = useBoardTheme();

    // Handle starting the game
    const handleStartGame = () => {
        setShowSetup(false);
        setGameStarted(true);
    };

    // Handle showing setup again
    const handleShowSetup = () => {
        setShowSetup(true);
        setGameStarted(false);
    };
    const [showGameMenu, setShowGameMenu] = useState(false);

    // TODO: Replace with real player data from game context or props
    const player1 = {
        name: 'Magnus Carlsen',
        country: '🇳🇴 Norway',
        rating: 2830,
        timeRemaining: '10:30',
        capturedPieces: ['p', 'n', 'b'],
        isOnline: true
    };
    const player2 = {
        name: 'Hikaru Nakamura',
        country: '🇺🇸 USA',
        rating: 2780,
        timeRemaining: '9:45',
        capturedPieces: ['P', 'B'],
        isOnline: true
    };

    // Calculate optimal board size based on available screen space
    const availableHeight = screenHeight - insets.top - insets.bottom;
    const availableWidth = screenWidth;

    // Reserve space for player info, controls, and padding
    const reservedHeight = 200; // Player info + controls + padding
    const maxBoardHeight = availableHeight - reservedHeight;
    const maxBoardWidth = availableWidth - 32; // 16px padding on each side

    // Board should be square, so use the smaller dimension
    const boardSize = Math.min(maxBoardHeight, maxBoardWidth, 400); // Max 400px

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 16,
            paddingVertical: 8,
            backgroundColor: theme.surface,
            borderBottomWidth: 1,
            borderBottomColor: theme.border,
        },
        backButton: {
            padding: 8,
            borderRadius: 8,
            backgroundColor: theme.cardBackground,
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: '600',
            color: theme.text,
        },
        menuButton: {
            padding: 8,
            borderRadius: 8,
            backgroundColor: theme.cardBackground,
        },
        gameModeSection: {
            paddingHorizontal: 16,
            paddingTop: 8,
        },
        setupButtonSection: {
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 8,
        },
        setupButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.surface,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: theme.primary + '30',
        },
        setupButtonText: {
            color: theme.primary,
            fontSize: 14,
            fontWeight: '600',
            marginLeft: 6,
        },
        gameArea: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
        },
        opponentSection: {
            width: '100%',
            marginBottom: 16,
        },
        boardSection: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            width: '100%',
        },
        boardWrapper: {
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        },
        gameInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: 12,
            paddingHorizontal: 8,
        },
        turnIndicator: {
            backgroundColor: theme.cardBackground,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: theme.border,
        },
        turnText: {
            color: theme.text,
            fontSize: 14,
            fontWeight: '500',
        },
        status: {
            marginTop: 8,
            color: theme.error,
            fontSize: 14,
            textAlign: 'center',
            fontWeight: '500',
        },
        gameOver: {
            marginTop: 8,
            color: theme.success,
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        currentPlayerSection: {
            width: '100%',
            marginTop: 16,
        },
        controlsSection: {
            paddingHorizontal: 16,
            paddingVertical: 8,
        },
        moveListOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: theme.background + 'F0',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
        },
        moveListContainer: {
            width: '90%',
            maxHeight: '80%',
            backgroundColor: theme.surface,
            borderRadius: 12,
            padding: 16,
            shadowColor: theme.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
        },
        closeButton: {
            position: 'absolute',
            top: 8,
            right: 8,
            padding: 8,
            borderRadius: 8,
            backgroundColor: theme.cardBackground,
        },
    });

    const opponentPlayer = isWhite ? player2 : player1;
    const currentPlayer = isWhite ? player1 : player2;

    return (
        <GestureHandlerRootView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={theme.text} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>64 Squares</Text>

                <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setShowBoardSettings(true)}
                    >
                        <Ionicons name="color-palette" size={24} color={theme.text} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.menuButton}
                        onPress={() => setShowMoveList(!showMoveList)}
                    >
                        <Ionicons name="list" size={24} color={theme.text} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Game Mode Selector */}
            {showSetup && (
                <View style={styles.gameModeSection}>
                    <GameModeSelector
                        onStartGame={handleStartGame}
                        isVisible={showSetup}
                    />
                </View>
            )}

            {/* Setup Button (when game is started) */}
            {gameStarted && !showSetup && (
                <View style={styles.setupButtonSection}>
                    <TouchableOpacity
                        style={styles.setupButton}
                        onPress={handleShowSetup}
                    >
                        <Ionicons name="settings-outline" size={20} color={theme.primary} />
                        <Text style={styles.setupButtonText}>Game Setup</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Main Game Area - Only show when game is started */}
            {gameStarted && !showSetup && (
                <View style={styles.gameArea}>
                {/* Opponent Info */}
                <View style={styles.opponentSection}>
                    <PlayerInfo
                        name={opponentPlayer.name}
                        country={opponentPlayer.country}
                        rating={opponentPlayer.rating}
                        timeRemaining={opponentPlayer.timeRemaining}
                        capturedPieces={opponentPlayer.capturedPieces}
                        isOnline={opponentPlayer.isOnline}
                        isActive={currentTurn !== (isWhite ? 'w' : 'b')}
                    />
                </View>

                {/* Centered Board Section */}
                <View style={styles.boardSection}>
                    <View style={styles.boardWrapper}>
                        <Board
                            onMove={gameMode === GameMode.COMPUTER_VS_COMPUTER ? () => false : makeMove}
                            fen={fen}
                            isWhite={isWhite}
                            size={boardSize}
                            boardTheme={boardTheme}
                            boardStyle={boardStyle}
                            lastMove={game.history({ verbose: true }).slice(-1)[0] ? {
                                from: game.history({ verbose: true }).slice(-1)[0].from,
                                to: game.history({ verbose: true }).slice(-1)[0].to
                            } : null}
                            checkSquare={game.inCheck() ?
                                (game.turn() === 'w' ? 'e1' : 'e8') // Simplified - would need proper king position detection
                                : null}
                        />
                    </View>

                    <View style={styles.gameInfo}>
                        <View style={styles.turnIndicator}>
                            <Text style={styles.turnText}>
                                {gameMode === GameMode.COMPUTER_VS_COMPUTER
                                    ? `${currentTurn === 'w' ? 'White' : 'Black'} Computer thinking...`
                                    : `${currentTurn === 'w' ? 'White' : 'Black'} to move`
                                }
                            </Text>
                        </View>

                        <GameTimer
                            initialTime={600} // 10 minutes
                            isActive={currentTurn === (isWhite ? 'w' : 'b')}
                            onTimeUp={() => console.log('Time up!')}
                        />
                    </View>

                    {status && <Text style={styles.status}>{status}</Text>}
                    {isGameOver && (
                        <Text style={styles.gameOver}>
                            Game Over! {winner === 'draw' ? 'Draw' : `${winner} wins!`}
                        </Text>
                    )}
                </View>

                {/* Current Player Info */}
                <View style={styles.currentPlayerSection}>
                    <PlayerInfo
                        name={currentPlayer.name}
                        country={currentPlayer.country}
                        rating={currentPlayer.rating}
                        timeRemaining={currentPlayer.timeRemaining}
                        capturedPieces={currentPlayer.capturedPieces}
                        isOnline={currentPlayer.isOnline}
                        isActive={currentTurn === (isWhite ? 'w' : 'b')}
                    />
                </View>
            </View>
            )}

            {/* Computer Thinking Indicator - Only show when game is started */}
            {gameStarted && !showSetup && <ComputerThinkingIndicator />}

            {/* Game Controls - Only show when game is started */}
            {gameStarted && !showSetup && (
                <View style={styles.controlsSection}>
                    <GameControls onReturnToSetup={handleShowSetup} />
                </View>
            )}

            {/* Move List Overlay */}
            {showMoveList && (
                <View style={styles.moveListOverlay}>
                    <View style={styles.moveListContainer}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setShowMoveList(false)}
                        >
                            <Ionicons name="close" size={20} color={theme.text} />
                        </TouchableOpacity>
                        {/* <MoveList maxHeight={400} /> */}
                        <Text style={{ color: theme.text, textAlign: 'center' }}>
                            Move List Coming Soon
                        </Text>
                    </View>
                </View>
            )}

            <BoardSettings
                visible={showBoardSettings}
                onClose={() => setShowBoardSettings(false)}
                boardTheme={boardTheme}
                boardStyle={boardStyle}
                onThemeChange={setBoardTheme}
                onStyleChange={setBoardStyle}
            />
        </GestureHandlerRootView>
    );
}

