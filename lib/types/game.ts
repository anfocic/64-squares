export interface Game {

}

export enum GameStatus {
    Waiting = 0,
    InProgress = 1,
    Finished = 2,
    Aborted = 3,
}

export enum GameResult {
    WhiteWin,
    BlackWin,
    Draw,
    ResignationWhite,
    ResignationBlack,
    TimeoutWhite,
    TimeoutBlack,
    Aborted,
}

export type GameState = {
    whiteId: string;
    blackId: string;
    status: GameStatus;
    result: GameResult;
    rules: GameRules;
    fen: string;
    pgn: string;
    createdAt: string;
    updatedAt: string;
};

export type GameRules = {

}