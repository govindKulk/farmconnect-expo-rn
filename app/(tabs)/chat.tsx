import { Avatar, Header } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants";
import { useAuth } from "@/contexts/AuthContext";
import { hp, wp } from "@/helpers";
import { useThemeColor } from "@/hooks/useThemeColor";
import { supabase } from "@/lib/supabase";
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

    const [conversations, setConversations] = useState<any>();
    const getAllConversations = async function () {
        const {data, error} = await supabase.from('conversations').select('*, buyer: users!conversations_buyer_id_fkey (name)').eq('farmer_id', user?.id);
        if(error){
            console.log(error);
            Alert.alert("Error while loading conversations! Please try again later");
            return;
        }
        // console.log(data);
        setConversations(data);
    }
    useEffect(() => {
        getAllConversations();
        const unsubscribe = subscribeToConversations(user?.id,"farmer",  (conversation) => {
            console.log("new ", conversation)
            setConversations((prev: any) => {
                return [
                    ...prev,
                    conversation
                ]
            })
        })

        return () => {
            if(unsubscribe){
                unsubscribe();
            }
        }
    }, [])

    useEffect(() => {

        console.log("conversations state", conversations);
    }, [conversations])

    return (

        <View
            style={{
                flex: 1,
            }}
        >
            <Header title="Your Chats" showBackButton={false} />
            <FlatList
                data={chatData}
                contentContainerStyle={{
                    gap: 10
                }}
                renderItem={({ item }) => (

                    <TouchableOpacity
                    onPress={() => router.push('/(tabs)/single_chat')}
                    >
                        <View
                            style={{
                                gap: 5,
                                flexDirection: "row",
                                alignItems: 'center',
                                justifyContent: "center",
                                paddingVertical: 5,
                                paddingHorizontal: 10
                            }}
                            key={item.user}>
                            <Avatar size={60} rounded={wp(100)} />
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
                                    >{item.user}</Text>
                                    <Text style={{ fontSize: hp(1.5) }}>{item.lastSeen}</Text>
                                </View>

                                <Text
                                    style={{
                                        color: theme.colors.textLight
                                    }}
                                >
                                    Hi, I want to buy your yield.
                                </Text>
                            </View>

                        </View>
                    </TouchableOpacity>)}
            />

        </View>

    )

}