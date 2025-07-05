export type Color = 'white' | 'black';

export type PieceType = 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king';

export interface Piece {
    type: PieceType;
    color: Color;
}

export interface Square {
    file: number;
    rank: number;
}

export interface Move {
    from: Square;
    to: Square;
    promotion?: PieceType;
}

export interface Position {
    board: (Piece | null)[][];
    turn: Color;
    castlingRights: {
        whiteKingSide: boolean;
        whiteQueenSide: boolean;
        blackKingSide: boolean;
        blackQueenSide: boolean;
    };
    enPassantTarget?: Square;
    halfmoveClock: number;
    fullmoveNumber: number;
}