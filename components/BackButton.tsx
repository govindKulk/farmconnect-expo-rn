import React, { FC } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Router } from 'expo-router';

import Icon from '@/assets/icons';
import { theme } from '@/constants';
import { useThemeColor } from '@/hooks/useThemeColor';

const BackButton: FC<{ router: Router; size?: number }> = ({ router, size = 26 }) => {

    const color = useThemeColor({}, "text");
    const bgColor = useThemeColor({light: "rgba(0, 0, 0, 0.07)", dark: "rgba(165, 157, 157, 0.423)"}, "background")
    return (
        <Pressable onPress={() => router.back()} style={[styles.button, {
            backgroundColor: bgColor
        }]}>
            <Icon color={color} name={'arrowLeft'} strokeWidth={2.5} size={size} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignSelf: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
        borderRadius: theme.radius.sm,
        padding: 5,
    },
});

export default BackButton;
