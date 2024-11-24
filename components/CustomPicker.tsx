import React, { ReactNode, forwardRef, useState } from 'react';
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native';

import { theme } from '@/constants';
import { hp } from '@/helpers/';

import { Picker, PickerItemProps } from '@react-native-picker/picker';
import { Text } from 'react-native';
interface CustomPickerProps extends PickerItemProps {
    containerStyle?: StyleProp<ViewStyle>;
    icon?: ReactNode;
    selectedValue: string | boolean | undefined;
    setselectedValue: (value: any) => void;
    options: Array<{
        value: string,
        label: string
    }>;
    labelText?: string;
}

const CustomPicker = forwardRef<TextInput, CustomPickerProps>(({ containerStyle, icon, selectedValue, setselectedValue, labelText, options, ...props }, ref) => {

    return (
        <View>

          {labelText &&  <Text  style={{ color: theme.colors.text, fontSize: hp(1.5), marginBottom: hp(1) }}>{labelText}</Text>}
            <View style={[styles.container, containerStyle]}>
                {icon && icon}

                <Picker
                    // placeholderTextColor={theme.colors.textLight}
                    selectedValue={selectedValue}
                    onValueChange={(value, i) => setselectedValue(value)}
                    style={{ flex: 1, paddingHorizontal: 0 }}
                    {...props}
                >

                    {
                        options.map((option, i) => (
                            <Picker.Item label={option.label} value={option.value} key={i} />
                        ))
                    }

                </Picker>
            </View>
        </View>
    );
});



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderColor: theme.colors.text,
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

export default CustomPicker;
