import { supabase } from '@/lib/supabase';

export const createNotification = async (notification: any) => {
    try {
        const { data, error } = await supabase.from('notifications').insert(notification).select().single();

        if (error) {
            console.log('Notification error >>:', error);
            return { msg: 'Could not create the notification', success: false };
        }

        return { data, success: true };
    } catch (error) {
        console.log('Notification error >>:', error);
        return { msg: 'Could not create the notification', success: false };
    }
};

export const fetchNotifications = async (receiverId?: string) => {
    try {
        const { data, error } = await supabase
            .from('notifications')
            .select(`*, sender: senderId(id, name, image)`)
            .eq('receiverId', receiverId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log('Fetch notifications error >>:', error);
            return { msg: 'Could not fetch the notifications', success: false };
        }

        return { data, success: true };
    } catch (error) {
        console.log('Fetch notifications error >>:', error);
        return { msg: 'Could not fetch the notifications', success: false };
    }
};
