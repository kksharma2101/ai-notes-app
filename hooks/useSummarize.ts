import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export const useSummarize = () => {
    return useMutation({
        mutationFn: async (noteContent: string) => {
            const res = await axios.post('/api/summarize', { noteContent });
            return res.data?.summary;
        },
    });
};