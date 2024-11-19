import { supabase } from '@/lib/supabase';
import { IUser } from '@/types';

export const getUserData = async (userId: string) => {
    try {
        const { data, error } = await supabase.from('users').select().eq('id', userId).single();

        if (error) {
            return { msg: error.message, success: false };
        }

        return { data, success: true };
    } catch (error: any) {
        console.log('Got error >>:', error);
        return { msg: error.message, success: false };
    }
};

export const updateUser = async (data: any, userId?: string) => {
    try {
        const { error } = await supabase.from('users').update(data).eq('id', userId);

        if (error) {
            return { msg: error.message, success: false };
        }

        return { data, success: true };
    } catch (error: any) {
        console.log('Got error >>:', error);
        return { msg: error.message, success: false };
    }
};
