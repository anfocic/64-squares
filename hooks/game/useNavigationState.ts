import { useState, useMemo } from 'react';
import {Move, Position} from "@/lib/types/board";
import {applyMove} from "@/lib/game/rulesEngine";
import {Chess} from "chess.js"; // your own logic

const DEFAULT_STARTING_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export function parseFEN(fen: string): Position {
    const chess = new Chess(fen);

    return {
        fen: chess.fen(),
        turn: chess.turn(),
        board: chess.board(), // 8x8 matrix of pieces or null
        // optionally extract other properties if your Position type includes them
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