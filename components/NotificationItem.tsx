import React, { FC, memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Router } from 'expo-router';
import moment from 'moment';

import Avatar from './Avatar';
import { theme } from '@/constants';
import { hp } from '@/helpers/';
import { INotification } from '@/types';

const NotificationItem: FC<{ item: INotification; router: Router }> = ({ item, router }) => {
    const handleClick = () => {
        let { postId, commentId } = JSON.parse(item.data);
        router.push({ pathname: '/(main)/postDetails', params: { postId, commentId } });
    };

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={handleClick} style={styles.container}>
            <Avatar size={hp(5)} uri={item?.sender?.image} />

            <View style={styles.nameTitle}>
                <Text style={styles.text}>{item?.sender?.name}</Text>
                <Text style={[styles.text, { color: theme.colors.textDark }]}>{item?.title}</Text>
            </View>

            <Text style={[styles.text, { color: theme.colors.textLight }]}>
                {moment(item?.create_at).format('MMM d')}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: theme.colors.darkLight,
        borderCurve: 'continuous',
        borderRadius: theme.radius.xxl,
        borderWidth: 0.5,
        flex: 1,
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
        padding: 15,
    },
    nameTitle: {
        flex: 1,
        gap: 2,
    },
    text: {
        color: theme.colors.text,
        fontSize: hp(1.6),
        fontWeight: theme.fonts.medium,
    },
});

export default memo(NotificationItem);
