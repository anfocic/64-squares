// Predefined board themes for the chess application
export interface BoardThemePreset {
    name: string;
    description: string;
    lightSquare: string;
    darkSquare: string;
    highlightSquare?: string;
    selectedSquare?: string;
    checkSquare?: string;
    lastMoveSquare?: string;
}

export const BOARD_THEMES: { [key: string]: BoardThemePreset } = {
    classic: {
        name: 'Classic',
        description: 'Traditional wooden chess board',
        lightSquare: '#f0d9b5',
        darkSquare: '#b58863',
        highlightSquare: '#ffff00',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#8bc34a60',
    },
    green: {
        name: 'Green',
        description: 'Fresh green tournament style',
        lightSquare: '#eeeed2',
        darkSquare: '#769656',
        highlightSquare: '#ffff00',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#8bc34a60',
    },
    blue: {
        name: 'Blue',
        description: 'Cool blue ocean theme',
        lightSquare: '#dee3e6',
        darkSquare: '#8ca2ad',
        highlightSquare: '#ffff00',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#8bc34a60',
    },
    purple: {
        name: 'Purple',
        description: 'Royal purple elegance',
        lightSquare: '#e8e4e6',
        darkSquare: '#9f90b0',
        highlightSquare: '#ffff00',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#8bc34a60',
    },
    wood: {
        name: 'Wood',
        description: 'Rich wooden texture',
        lightSquare: '#f7e394',
        darkSquare: '#d08b2c',
        highlightSquare: '#ffff00',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#8bc34a60',
    },
    marble: {
        name: 'Marble',
        description: 'Elegant marble finish',
        lightSquare: '#f5f5dc',
        darkSquare: '#696969',
        highlightSquare: '#ffff00',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#8bc34a60',
    },
    neon: {
        name: 'Neon',
        description: 'Modern neon glow',
        lightSquare: '#2a2a2a',
        darkSquare: '#1a1a1a',
        highlightSquare: '#00ff00',
        selectedSquare: '#ff00ff',
        checkSquare: '#ff0000',
        lastMoveSquare: '#00ffff60',
    },
    coral: {
        name: 'Coral',
        description: 'Warm coral reef colors',
        lightSquare: '#ffeaa7',
        darkSquare: '#fab1a0',
        highlightSquare: '#fdcb6e',
        selectedSquare: '#e17055',
        checkSquare: '#d63031',
        lastMoveSquare: '#00b89460',
    },
    ice: {
        name: 'Ice',
        description: 'Cool ice crystal theme',
        lightSquare: '#ddd6fe',
        darkSquare: '#a78bfa',
        highlightSquare: '#fbbf24',
        selectedSquare: '#f87171',
        checkSquare: '#ef4444',
        lastMoveSquare: '#34d39960',
    },
    forest: {
        name: 'Forest',
        description: 'Deep forest greens',
        lightSquare: '#d1fae5',
        darkSquare: '#065f46',
        highlightSquare: '#fbbf24',
        selectedSquare: '#f87171',
        checkSquare: '#ef4444',
        lastMoveSquare: '#34d39960',
    },
    sunset: {
        name: 'Sunset',
        description: 'Warm sunset colors',
        lightSquare: '#fed7aa',
        darkSquare: '#ea580c',
        highlightSquare: '#fbbf24',
        selectedSquare: '#f87171',
        checkSquare: '#ef4444',
        lastMoveSquare: '#34d39960',
    },
    monochrome: {
        name: 'Monochrome',
        description: 'Classic black and white',
        lightSquare: '#ffffff',
        darkSquare: '#000000',
        highlightSquare: '#808080',
        selectedSquare: '#ff6b6b',
        checkSquare: '#ff4444',
        lastMoveSquare: '#80808060',
    },
};

// Board style presets
export interface BoardStylePreset {
    name: string;
    description: string;
    showCoordinates: boolean;
    showLastMove: boolean;
    showPossibleMoves: boolean;
    animationDuration: number;
    borderRadius: number;
    shadowEnabled: boolean;
}

export const BOARD_STYLES: { [key: string]: BoardStylePreset } = {
    tournament: {
        name: 'Tournament',
        description: 'Official tournament settings',
        showCoordinates: true,
        showLastMove: true,
        showPossibleMoves: false,
        animationDuration: 150,
        borderRadius: 0,
        shadowEnabled: false,
    },
    casual: {
        name: 'Casual',
        description: 'Relaxed casual play',
        showCoordinates: true,
        showLastMove: true,
        showPossibleMoves: true,
        animationDuration: 250,
        borderRadius: 8,
        shadowEnabled: true,
    },
    minimal: {
        name: 'Minimal',
        description: 'Clean minimal design',
        showCoordinates: false,
        showLastMove: false,
        showPossibleMoves: false,
        animationDuration: 100,
        borderRadius: 0,
        shadowEnabled: false,
    },
    modern: {
        name: 'Modern',
        description: 'Modern sleek appearance',
        showCoordinates: true,
        showLastMove: true,
        showPossibleMoves: true,
        animationDuration: 200,
        borderRadius: 12,
        shadowEnabled: true,
    },
    beginner: {
        name: 'Beginner',
        description: 'Helpful for new players',
        showCoordinates: true,
        showLastMove: true,
        showPossibleMoves: true,
        animationDuration: 300,
        borderRadius: 8,
        shadowEnabled: true,
    },
};

// Utility functions
export function getThemeByName(name: string): BoardThemePreset | undefined {
    return BOARD_THEMES[name];
}

export function getStyleByName(name: string): BoardStylePreset | undefined {
    return BOARD_STYLES[name];
}

export function getAllThemeNames(): string[] {
    return Object.keys(BOARD_THEMES);
}

export function getAllStyleNames(): string[] {
    return Object.keys(BOARD_STYLES);
}

// Color utility functions
export function hexToRgba(hex: string, alpha: number = 1): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function isLightColor(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
}
