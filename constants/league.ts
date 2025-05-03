import * as yup from "yup";
import {LeagueFormFields} from "@/types/league";

export const defaultLeagueValues: LeagueFormFields = {
    name: "",
    format: "Standard",
    rounds: 1,
    base_minutes: 0,
    increment_seconds: 0,
    games_per_pairing: 2,
    allow_draws: false,
    auto_pairing: false,
    start_date: new Date(),
};

export const leagueSchema = yup.object().shape({
    name: yup.string().required("League name is required"),
    format: yup.string().required("League format is required"),
    rounds: yup.number().required().positive().integer(),
    base_minutes: yup.number().required().positive().integer(),
    increment_seconds: yup.number().required().positive().integer(),
    games_per_pairing: yup.number().required().positive().integer(),
    allow_draws: yup.boolean().required(),
    auto_pairing: yup.boolean().required(),
    start_date: yup.date().required(),
});