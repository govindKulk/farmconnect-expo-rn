import { Avatar, Header } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { theme } from "@/constants";
import { hp, wp } from "@/helpers";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRouter } from "expo-router";
import { Text, View, FlatList, TouchableOpacity } from "react-native";



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

    const router = useRouter();
    const textColor  = useThemeColor({light: "black", dark: "white"}, "text");
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
                    onPress={() => {
                        router.push('./comingsoon')
                    }}
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