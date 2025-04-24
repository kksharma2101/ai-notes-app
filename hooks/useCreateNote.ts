// hooks/useCreateNote.ts
import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from './useSupabase';

export const useCreateNote = () => {
    const supabase = createClient()
    const uuid = uuidv4()
    return useMutation({
        mutationFn: async (noteContent: string) => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                alert('Please sign in first!');
                return;
            }
            const {
                data,
                error,
            } = await supabase.from('note').insert([{
                id: uuid,
                content: noteContent,
                user_id: user.id,
                created_at: new Date().toISOString()
            }]);
            if (error)
                console.log("Error in add note", error)
            return data;
        },
    });
};

// export const useUpdateNote = () => {}