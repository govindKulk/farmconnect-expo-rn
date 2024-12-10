import React, { ReactNode, forwardRef } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

import { theme } from '@/constants';
import { hp } from '@/helpers/';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

interface TextFieldProps extends TextInputProps {
    containerStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode;
}

const TextField = forwardRef<TextInput, TextFieldProps>(({ containerStyle, icon, ...props }, ref) => {

    const textColor = useThemeColor({}, "text");
    return (
        <View style={[styles.container, containerStyle, {
            borderColor: textColor
        }]}>
            {icon && icon}

            <TextInput
                
                placeholderTextColor={textColor}
                ref={ref}
                style={{ flex: 1, paddingHorizontal: 0, color: textColor }}
                {...props}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xxl,
        borderWidth: 0.4,
        flexDirection: 'row',
        gap: 12,
        height: hp(7.2),
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
});

export default TextField;
