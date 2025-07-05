// logic/game/rulesEngine.ts

import { Move, Position, Piece } from '../types/board';

export function applyMove(position: Position, move: Move): Position {
    const newBoard = position.board.map(row => row.slice()); // deep copy
    const piece = newBoard[move.from.rank][move.from.file];

    if (!piece) {
        throw new Error('Invalid move: no piece at from square');
    }

    // Handle promotion (default to queen if not provided)
    let movedPiece: Piece = piece;
    if (piece.type === 'pawn' && (move.to.rank === 0 || move.to.rank === 7)) {
        movedPiece = {
            type: move.promotion ?? 'queen',
            color: piece.color,
        };
    }

    // Move the piece
    newBoard[move.from.rank][move.from.file] = null;
    newBoard[move.to.rank][move.to.file] = movedPiece;

    // Update position metadata
    const nextTurn = position.turn === 'white' ? 'black' : 'white';

    return {
        board: newBoard,
        turn: nextTurn,
        castlingRights: { ...position.castlingRights }, // stub, not modified yet
        enPassantTarget: undefined, // stub, not tracked yet
        halfmoveClock: 0, // stub
        fullmoveNumber: position.turn === 'black' ? position.fullmoveNumber + 1 : position.fullmoveNumber,
    };
}