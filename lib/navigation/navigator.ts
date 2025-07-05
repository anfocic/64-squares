
import { applyMove } from '../game/rulesEngine';
import {Position, Move} from "@/lib/types/board";

export function computePositionFromMoves(initial: Position, moves: Move[], upTo?: number): Position {
    let position = initial;
    const end = upTo ?? moves.length;

    for (let i = 0; i < end; i++) {
        position = applyMove(position, moves[i]);
    }

    return position;
}