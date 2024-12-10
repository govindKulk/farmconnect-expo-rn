import React, { FC, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Router, useRouter } from 'expo-router';

import Icon from '@/assets/icons';

import { theme } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';
import { hp, wp } from '@/helpers';
import { supabase } from '@/lib/supabase';
// import { fetchPosts } from '@/services';
import { IPost, IUser } from '@/types';
import { Avatar, Header, Loading, ScreenWrapper } from '@/components';
import { useThemeColor } from '@/hooks/useThemeColor';

interface UserHeader {
    handleLogout?: () => void;
    router: Router;
    user: IUser | null;
}

const UserHeader: FC<UserHeader> = ({ handleLogout, router, user }) => {
    const bgColor = useThemeColor({}, "background");
    const color = useThemeColor({}, "text");


    return (
        <View style={{ flex: 1, paddingHorizontal: wp(4), backgroundColor: bgColor }}>

            {/* header */}
            <View>
                <Header mb={30} title={'Profile'} />
                <TouchableOpacity activeOpacity={0.7} onPress={handleLogout} style={styles.logoutButton}>
                    <Icon color={theme.colors.rose} name={'logout'} />
                </TouchableOpacity>
            </View>


            <View style={styles.container}>
                <View style={{ gap: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar rounded={theme.radius.xxl} size={hp(12)} uri={user?.image}  />

                        <Pressable style={styles.editIcon} onPress={() => router.push('./editprofile')}>
                            <Icon name={'edit'} size={20} strokeWidth={2.5} />
                        </Pressable>
                    </View>

                    {/** Username and address */}
                    <View style={{ alignItems: 'center', gap: 4 }}>
  
                        <Text style={[styles.userName, {color}]}>{user && user.name}</Text>
                        <Text style={[styles.infoText, {color}]}>Address: --</Text>
                    </View>

                    {/** Email, phone & bio */}
                    <View style={{ gap: 10, alignItems: 'center' }}>
                        {/** Email */}
                        <View style={styles.info}>
                            <Icon color={color} name={'mail'} size={20} />
                            <Text style={[styles.infoText, {color}]}>{user && user.email}</Text>
                        </View>

                        {/** Phone */}
                        {user && user.phonenumber && (
                            <View style={styles.info}>
                                <Icon color={color} name={'call'} size={20} />
                                <Text style={[styles.infoText, {color}]}>Phone: {user.phonenumber}</Text>
                            </View>
                        )}
                        {user && user.village && (
                            <View style={styles.info}>
                                <Icon color={color} name={'location'} size={20} />
                                <Text style={[styles.infoText, {color}]}>Village: {user.village}</Text>
                            </View>
                        )}
                        {user && user.city && (
                            <View style={styles.info}>
                                <Icon color={color} name={'location'} size={20} />
                                <Text style={[styles.infoText, {color}]}>City: {user.city}</Text>
                            </View>
                        )}

                        {/** Bio */}
                        {user && user.bio && <Text style={[styles.infoText, {color}]}>{user.bio}</Text>}
                    </View>
                </View>
            </View>
        </View>
    );
};

var limit = 0;
const Profile: FC = () => {
    const { user, setAuth } = useAuth();
    console.log("user ", user)
    const router = useRouter();

    const [posts, setPosts] = useState<IPost[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const onLogout = async () => {
        setAuth?.(null);
        const { error } = await supabase.auth.signOut();

        if (error) {
            Alert.alert('Sign out', 'Error signing out');
        }
    };

    // const getPosts = async () => {
    //     if (!hasMore) {
    //         return null;
    //     }

    //     limit = limit + 10;

    //     // let res = await fetchPosts(limit, user?.id);
    //     // if (res.success) {
    //     //     if (posts.length === res.data?.length) {
    //     //         setHasMore(false);
    //     //     }
    //     //     setPosts(res.data || []);
    //     // }
    // };

    const handleLogout = () => {
        /** Show confirm modal */
        Alert.alert('Confirm', 'Are you sure you want to logout?', [
            {
                onPress: () => console.log('Modal cancel'),
                style: 'cancel',
                text: 'Cancel',
            },
            {
                onPress: () => onLogout(),
                style: 'destructive',
                text: 'Logout',
            },
        ]);
    };

    return (
        
            <UserHeader handleLogout={handleLogout} router={router} user={user} />
       
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        alignSelf: 'center',
        height: hp(12),
        width: hp(12),
    },
    container: {
        flex: 1,
    },
    editIcon: {
        backgroundColor: 'white',
        borderRadius: 50,
        bottom: 0,
        elevation: 7,
        padding: 7,
        position: 'absolute',
        right: -12,
        shadowColor: theme.colors.textLight,
        shadowOffset: { height: 4, width: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20,
    },
    headerShape: {
        height: hp(20),
        width: wp(100),
    },
    info: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    infoText: {
        color: theme.colors.textLight,
        fontSize: hp(1.6),
        fontWeight: '500',
    },
    listStyle: {
        paddingHorizontal: wp(4),
        paddingBottom: 30,
    },
    logoutButton: {
        backgroundColor: '#FEE2E2',
        borderRadius: theme.radius.sm,
        padding: 5,
        position: 'absolute',
        right: 0,
    },
    noPosts: {
        color: theme.colors.text,
        fontSize: hp(2),
        textAlign: 'center',
    },
    userName: {
        color: theme.colors.textDark,
        fontSize: hp(3),
        fontWeight: '500',
    },
});

export default Profile;