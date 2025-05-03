import { useMutation } from '@tanstack/react-query';
import { createLeague } from '@/services/leagueService';
import type { NewLeague } from '@/types/league';

export function useCreateLeague() {
    const mutation = useMutation({
        mutationFn: ({ data, token }: { data: NewLeague; token: string }) => createLeague(data, token),
    });

    return {
        createLeague: mutation.mutate,
        createLeagueAsync: mutation.mutateAsync,
        isLoading: mutation.isLoading,
        ...mutation,
    };
}