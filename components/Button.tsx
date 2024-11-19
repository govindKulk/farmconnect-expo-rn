import React, { FC } from 'react';
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import Loading from './Loading';
import { theme } from '@/constants';
import { hp, wp } from '@/helpers/';

interface ButtonProps {
    buttonStyle?: StyleProp<ViewStyle>;
    loading?: boolean;
    hasShadow?: boolean;
    onPress?: () => void;
    title: string;
    titleStyle?: StyleProp<TextStyle>;
}

const Button: FC<ButtonProps> = ({
    buttonStyle,
    loading = false,
    hasShadow = true,
    onPress = () => {},
    title = '',
    titleStyle,
}) => {
    const shadowStyle = {
        elevation: 4,
        shadowColor: theme.colors.dark,
        shadowOffset: { height: 10, width: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 9,
    } as ViewStyle;

    if (loading) {
        return (
            <View style={[styles.button, buttonStyle, { backgroundColor: 'white ' }]}>
                <Loading />
            </View>
        );
    }

    return (
        <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
            <Text style={[styles.text, titleStyle]}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: theme.colors.primary,
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl,
        height: hp(6.6),
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: hp(2.5),
        fontWeight: theme.fonts.bold,
    },
});

export default Button;
