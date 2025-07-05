import { useQuery } from '@tanstack/react-query';
import {getAllLeagues} from "@/services/leagueService";

export function useLeagues() {
    return useQuery({
        queryKey: ['leagues'],
        queryFn: async () => {
            const res = await getAllLeagues();
            console.log(res)
            if (!res) throw new Error('Failed to fetch leagues');
            return res; // getAllLeagues should already return parsed data
        },
    });
}