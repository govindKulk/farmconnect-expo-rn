import { Avatar, Header } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { useChatContext } from "@/contexts/ChatContext";
import { hp, wp } from "@/helpers";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
import { getUserImageSrc } from "@/services";
import { subscribeToConversations } from "@/services/messageService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";




const chatData = [
    {
        user: "Rushikesh Shinde",
        lastSeen: "3 hours ago"
    },
    {
        user: "Vedant Kulkarni",
        lastSeen: "1 day ago"
    },
]
export default function ChatScreen() {


    const textColor  = useThemeColor({light: "black", dark: "white"}, "text");

    const router = useRouter();
    const {user} = useAuth();

    // const [conversations, setConversations] = useState<any[]>([]);
  

    const {getAllConversations, conversations } = useChatContext();
    useEffect(() => {
        if (!user?.id) {
            console.log("User ID not available!");
            return;
        }
    
        // Fetch initial conversations
        // const fetchConversations = async () => {
        //     const { data, error } = await supabase
        //         .from("conversations")
        //         .select("*, buyer: users!conversations_buyer_id_fkey (name, image)")
        //         .eq("farmer_id", user.id); // Fetch conversations where the user is the farmer
    
        //     if (error) {
        //         console.error("Error fetching conversations:", error);
        //         Alert.alert("Error while loading conversations! Please try again later");
        //         return;
        //     }
    
        //     console.log("Fetched conversations:", data);
        //     setConversations(data || []);
        // };

    
        // fetchConversations();

        getAllConversations();
    

        // Subscribe to new conversations
        const unsubscribe = subscribeToConversations(user.id, "buyer", (conversation) => {
            console.log("New conversation received:", conversation);
    
            // Update conversations state with the new conversation
            // setConversations((prev: any) => {
            //     // Prevent duplicates
            //     if (prev.some((c: any) => c.id === conversation.id)) return prev;
            //     return [...prev, conversation];
            // });

            getAllConversations();
        });
    
        // Cleanup
        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [user?.id]);
    

    return (

        <View
            style={{
                flex: 1,
            }}
        >
            <Header title="Your Chats" showBackButton={false} />
            <FlatList
                data={conversations}
                contentContainerStyle={{
                    gap: 10
                }}
                renderItem={({item}) => (

                    <TouchableOpacity
                    onPress={() => router.push({
                        pathname: '/(tabs)/single_chat',
                        params: {
                            conversationId: item.id
                        }
                    })}
                    >
                        <View
                            style={{
                                gap: 5,
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: "center",
                                paddingVertical: 5,
                                paddingHorizontal: 10,
                                
                            }}
                            key={item.farmer_id}>
       

                            <Avatar size={60} rounded={wp(100)} uri={item.farmer?.image} />
                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}
                            >
                                <View
                                    style={{

                                        flexDirection: "row",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: hp(2),
                                            fontWeight: theme.fonts.semibold,
                                            color: textColor
                                        }}
                                    >{item.farmer && item?.farmer?.name}</Text>
                                    <Text style={{ fontSize: hp(1.5) }}>{"2 hours ago"}</Text>
                                </View>

                                {/* <Text
                                    style={{
                                        color: theme.colors.textLight
                                    }}
                                >
                                    Hi, I want to buy your yield.
                                </Text> */}
                            </View>

                        </View>
                    </TouchableOpacity>)}
            />

        </View>

    )

}