export type League = {
    id: string;
    name: string;
    created_at: string;
    // add any other fields from your backend model
};

export type NewLeague = {
    name: string;
    settings: LeagueFormFields;
};

export interface LeagueFormFields {
    name?: string;
    format: string;
    rounds: number;
    base_minutes: number;
    increment_seconds: number;
    games_per_pairing: number;
    allow_draws: boolean;
    auto_pairing: boolean;
    start_date: any;
}