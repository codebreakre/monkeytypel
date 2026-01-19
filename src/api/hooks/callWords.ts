import {useQuery} from '@tanstack/react-query'
import { fetchWords } from '../API'

export const callWords = (wordNumber:number) => {
    return useQuery<string[]> ({
        queryKey: ["words", wordNumber],
        queryFn: () => fetchWords(wordNumber),
        refetchOnWindowFocus: false,
        refetchOnReconnect: false
    });
}