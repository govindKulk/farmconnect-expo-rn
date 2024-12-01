import { FC, PropsWithChildren, createContext, useContext, useState } from 'react';

import { IUser } from '@/types';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';

const ChatContext = createContext<{
        conversations: any[],
        getAllConversations: () => void
    } >({
        conversations: [],
        getAllConversations: () => {}
    });

export const ChatProvider: FC<PropsWithChildren> = ({ children }) => {

    const [conversations, setConversations] = useState<any[]>([]);

    const {user} = useAuth();

    const filter = `${user?.user_type === 'farmer' ? 'buyer: users!conversations_buyer_id_fkey (name, image)' : 'farmer: users!conversations_farmer_id_fkey (name, image)'}`
    const filterString = `*, ${filter}`;
    // console.log("filter: ", filterString)

    const condition = `${user?.user_type === 'farmer' ? 'farmer_id' : 'buyer_id'}`
    const getAllConversations =  async () => {
        const { data, error } = await supabase
            .from("conversations")
            .select(filterString)
            .eq(condition, user?.id); // Fetch conversations where the user is the farmer

        if (error) {
            console.error("Error fetching conversations:", error);
            Alert.alert("Error while loading conversations! Please try again later");
            return;
        }

        console.log("Fetched conversations:", data);
        setConversations(data || []);
    };

    return <ChatContext.Provider value={{ conversations, getAllConversations }}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
