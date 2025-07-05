import {League, NewLeague} from "@/lib/types/league";
import {request} from "@/lib/utils/authUtils";

export async function createLeague(data: NewLeague, token: string) {
    return request("/leagues", {
        method: "POST",
        body: JSON.stringify(data),
    }, true, token);
}

export async function getLeague(id: string, token?: string): Promise<League> {
    return request(`/leagues/${id}`, {
        method: "GET",
    }, true, token);
}

export async function getAllLeagues(): Promise<League[]> {
    return request(`/leagues/list`, {
        method: "GET",
    }, true);
}

// Future functions can include:
// export async function updateLeague(...) {...}
// export async function deleteLeague(...) {...}
// export async function listLeagues(...) {...}
