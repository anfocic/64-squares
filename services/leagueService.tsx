import { request } from "@/utils/authUtils";
import { League, NewLeague } from "@/types/league";

export async function createLeague(data: NewLeague, token?: string) {
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

// Future functions can include:
// export async function updateLeague(...) {...}
// export async function deleteLeague(...) {...}
// export async function listLeagues(...) {...}
