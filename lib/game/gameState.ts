import {Move, Position} from "@/lib/types/board";
import {applyMove} from "@/lib/game/rulesEngine";

// Default starting position
const INITIAL_POSITION: Position = {
    board: [], // This would be populated with the initial chess position
    turn: 'white',
    castlingRights: {
        whiteKingSide: true,
        whiteQueenSide: true,
        blackKingSide: true,
        blackQueenSide: true,
    },
    halfmoveClock: 0,
    fullmoveNumber: 1,
};

export class GameState {
    private moveHistory: Move[] = [];
    private currentPosition: Position;

    constructor(initialPosition: Position) {
        this.currentPosition = initialPosition;
    }

    public getCurrentPosition(): Position {
        return this.currentPosition;
    }

    public getMoveHistory(): Move[] {
        return [...this.moveHistory];
    }

    public makeMove(move: Move): void {
        const newPosition = applyMove(this.currentPosition, move);
        this.moveHistory.push(move);
        this.currentPosition = newPosition;
    }

    public undoLastMove(): void {
        if (this.moveHistory.length === 0) return;

        this.moveHistory.pop();
        this.currentPosition = this.recomputePosition();
    }

    private recomputePosition(): Position {
        // Rebuild from scratch using initial position + move history
        let position = INITIAL_POSITION;
        for (const move of this.moveHistory) {
            position = applyMove(position, move);
        }
        return position;
    }
}