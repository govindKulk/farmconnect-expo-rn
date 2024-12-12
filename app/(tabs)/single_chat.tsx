import React, { useState, useEffect } from 'react';
import { fetchMessages, sendMessage, subscribeToMessages } from '@/services/messageService';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { Text, View } from 'react-native';
import { Avatar } from '@/components';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { hp } from '@/helpers';
import { theme } from '@/constants';
import { useChatContext } from '@/contexts/ChatContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as Crypto from 'expo-crypto'
import { Alert } from 'react-native';

const ChatScreen = () => {
    const params = useLocalSearchParams<{ conversationId: string }>();
    const { conversationId } = params;
    const { user } = useAuth();

    if (!user) return;

    const {conversations} = useChatContext();

    const [messages, setMessages] = useState<any>([]);
    const [currentConversation, setCurrentConversation] = useState<any>();

    useEffect(() => {
        const loadMessages = async () => {
            const initialMessages = await fetchMessages(conversationId);
            if (initialMessages.data) {
                setMessages(
                    initialMessages.data.map((msg) => ({
                        _id: msg.id,
                        text: msg.message,
                        createdAt: new Date(msg.created_at),
                        user: { _id: msg.sender_id },
                    }))
                );
            }
        };

        loadMessages();

        // Subscribe to new messages
        const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
            setMessages((prev: any) => {
                // Avoid adding duplicate messages
                const exists = prev.some((msg: any) => msg._id === newMessage.id);
                console.log("exists: ", exists, "newMessage: ", newMessage)
                if (!exists) {

                    console.log("in the if : ", messages)
                    return [
                        {
                            _id: newMessage.id,
                            text: newMessage.message,
                            createdAt: new Date(newMessage.created_at),
                            user: { _id: newMessage.sender_id },
                        },
                        ...prev,
                    ];
                }
                return prev;
            });
        });

        setCurrentConversation(conversations.find(c => c.id == conversationId));
        console.log("conversations id ", conversationId)
        return () => unsubscribe();
    }, [conversationId]);

    const onSend = async (newMessages: any = []) => {
        try{
            const message = newMessages[0];

        // Send the message to the backend
        await sendMessage(conversationId, user?.id, message.text);

        // Optimistically add the message to the UI
        // setMessages((prev: any) => {
        //   const exists = prev.some((msg: any) => msg._id === message._id);
        //    // Check if already exists

        //    console.log("exists: ", exists)
        // //   if (!exists) {
        // //     return GiftedChat.append(prev, message);
        // //   }
        //   return prev;
        // });
        }catch(error){
            console.log(error);
            Alert.alert("Error while sending message: ", error as string)
        }
    };

    console.log("current conversations: ", currentConversation)
    const headerBgColor = useThemeColor({light: "#dfdfdf", dark: "#232323"}, "background")
    const bgColor = useThemeColor({light: "white", dark: "#232323"}, "background")
    const textColor = useThemeColor({}, "text")

    const renderCustomBubble = (props: any) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: "#e6f7ff", // Background for received messages
                    },
                    right: {
                        backgroundColor: "#0078d4", // Background for sent messages
                    },
                }}
                textStyle={{
                    left: {
                        color: "#000", // Text color for received messages
                    },
                    right: {
                        color: "#fff", // Text color for sent messages
                    },
                }}
            />
        );
    };

    return (
        <View
        style={{
            flex: 1
        }}
        >
            <View style={{
                flexDirection: "row",
                backgroundColor: headerBgColor,
                paddingVertical: hp(1.5),
                justifyContent: "center",
                alignItems: "center",
                gap: 10
            }}>
                <Avatar size={50} uri={user?.user_type === "farmer" ? currentConversation?.buyer?.image: currentConversation?.farmer?.image} />
                <Text
                style={{
                    fontSize: hp(2),
                    fontWeight: theme.fonts.semibold,
                    color: textColor
                }}
                >
                    {user?.user_type === "farmer" ? currentConversation?.buyer?.name: currentConversation?.farmer?.name}
                </Text>
            </View>
            <GiftedChat
                alignTop={true}
                
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{ _id: user.id }}
                messageIdGenerator={() => Crypto.randomUUID() as string}
                renderBubble={renderCustomBubble}
            />
        </View>
    );
};

export default ChatScreen;
