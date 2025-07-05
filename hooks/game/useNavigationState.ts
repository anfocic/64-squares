import { useState, useMemo } from 'react';
import {Move, Position} from "@/lib/types/board";
import {applyMove} from "@/lib/game/rulesEngine";
import {Chess} from "chess.js"; // your own logic

const DEFAULT_STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function parseFEN(fen: string): Position {
    const chess = new Chess(fen);

    return {
        turn: chess.turn() === 'w' ? 'white' : 'black',
        board: chess.board().map(row =>
            row.map(piece => piece ? {
                type: piece.type === 'p' ? 'pawn' :
                      piece.type === 'n' ? 'knight' :
                      piece.type === 'b' ? 'bishop' :
                      piece.type === 'r' ? 'rook' :
                      piece.type === 'q' ? 'queen' : 'king',
                color: piece.color === 'w' ? 'white' : 'black'
            } : null)
        ),
        castlingRights: {
            whiteKingSide: chess.getCastlingRights('w').k,
            whiteQueenSide: chess.getCastlingRights('w').q,
            blackKingSide: chess.getCastlingRights('b').k,
            blackQueenSide: chess.getCastlingRights('b').q,
        },
        halfmoveClock: 0, // Chess.js doesn't expose this easily
        fullmoveNumber: chess.moveNumber(),
    };
}

export function useNavigationState(moves: Move[], startingFEN: string) {
    const [index, setIndex] = useState(0); // currenti move index

    const positions: Position[] = useMemo(() => {
        const baseFEN = startingFEN || DEFAULT_STARTING_FEN;
        const posList: Position[] = [parseFEN(baseFEN)];

        if (!moves) return [];

        for (const move of moves) {
            const last = posList[posList.length - 1];
            const next = applyMove(last, move);
            posList.push(next);
        }

        return posList;
    }, [moves, startingFEN]);

    const currentPosition = positions[index];

    const canGoBack = index > 0;
    const canGoForward = index < moves?.length;

    const goBack = () => {
        console.log('idem nazad')
        if (canGoBack) setIndex(i => i - 1);
    };

    const goForward = () => {
        console.log('idem naprijed')
        if (canGoForward) setIndex(i => i + 1);
    };

    return {
        currentPosition,
        goBack,
        goForward,
        canGoBack,
        canGoForward,
    };
}