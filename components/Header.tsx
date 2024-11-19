import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import BackButton from './BackButton';
import { theme } from '@/constants';
import { hp } from '@/helpers/';
import { useThemeColor } from '@/hooks/useThemeColor';

interface HeaderProps {
    mb?: number;
    showBackButton?: boolean;
    title: string;
}

const Header: FC<HeaderProps> = ({ mb = 10, showBackButton = true, title }) => {
    const router = useRouter();
    const textColor  = useThemeColor({light: "black", dark: "white"}, "text");
    return (
        <View style={[styles.container, { marginBottom: mb }]}>
            {showBackButton && (
                <View style={styles.showBackButton}>
                    <BackButton router={router} />
                </View>
            )}

            <Text style={[{color: textColor}, styles.title]}>{title || ''}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
        marginTop: 5,
    },
    showBackButton: {
        left: 0,
        position: 'absolute',
    },
    title: {
        color: theme.colors.text,
        fontSize: hp(2.7),
        fontWeight: theme.fonts.semibold,
    },
});

export default Header;
