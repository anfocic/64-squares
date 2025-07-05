import {computePositionFromMoves} from './navigator';
import {Move, Position} from "@/lib/types/board";

export class NavigationState {
    private viewIndex: number = 0;

    constructor(
        private moveHistory: Move[],
        private initialPosition: Position
    ) {}

    public getPosition(): Position {
        return computePositionFromMoves(this.initialPosition, this.moveHistory, this.viewIndex);
    }

    public getIndex(): number {
        return this.viewIndex;
    }

    public canGoBack(): boolean {
        return this.viewIndex > 0;
    }

    public canGoForward(): boolean {
        return this.viewIndex < this.moveHistory.length;
    }

    public goTo(index: number): void {
        this.viewIndex = Math.max(0, Math.min(index, this.moveHistory.length));
    }

    public goForward(): void {
        this.goTo(this.viewIndex + 1);
    }

    public goBackward(): void {
        this.goTo(this.viewIndex - 1);
    }

    public goToStart(): void {
        this.goTo(0);
    }

    public goToEnd(): void {
        this.goTo(this.moveHistory.length);
    }

    public updateMoves(newMoves: Move[]): void {
        this.moveHistory = newMoves;
        this.goToEnd();
    }
}