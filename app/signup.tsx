import React, { FC, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import Icon from '@/assets/icons';
import { BackButton, Button, ScreenWrapper, TextField } from '@/components';
import { theme } from '@/constants';
import { hp, wp } from '@/helpers';
import { supabase } from '@/lib/supabase';
import CustomPicker from '@/components/CustomPicker';
import { useThemeColor } from '@/hooks/useThemeColor';

const options = [
    {
        value: 'farmer',
        label: 'Farmer'
    }, 
    {
        value: "buyer",
        label: 'Buyer'
    }
]

const SignUp: FC = () => {
    const router = useRouter();

    /** Ref value */
    const emailRef = useRef<string>('');
    const nameRef = useRef<string>('');
    const passwordRef = useRef<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedUserType, setSelectedUserType] = useState("farmer");

    const onSubmit = async () => {
        if (!emailRef.current || !nameRef.current || !passwordRef.current || !selectedUserType) {
            Alert.alert('Sign Up', 'Please fill all the fields!');
            return;
        }

        let email = emailRef.current;
        let name = nameRef.current;
        let password = passwordRef.current;

        setLoading(true);

        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({ email, options: { data: { name, user_type: selectedUserType } }, password });
        setLoading(false);
        console.log('Session >>:', session);
        console.log('Error >>:', error);

        if (error) {
            Alert.alert('Sign Up', error.message);
            return;
        }
    };

    const bgColor = useThemeColor({}, "background")
    const color = useThemeColor({}, "text")
    return (
        <ScreenWrapper bg={bgColor}>
            <StatusBar style={'dark'} />

            <View style={styles.container}>
                <BackButton router={router} />

                {/** Welcome */}
                <View>
                    <Text style={[styles.welcomeText,{
                        color
                    }]}>{"Let's"}</Text>
                    <Text style={[styles.welcomeText,{
                        color
                    }]}>{'Get Started'}</Text>
                </View>

                {/** Form */}
                <View style={styles.form}>
                    <Text style={{ color, fontSize: hp(1.5) }}>
                        {'Please fill the details to create an account'}
                    </Text>

                    {/** Name */}
                    <TextField
                        icon={<Icon name={'user'} size={26} strokeWidth={1.6} />}
                        onChangeText={(value) => (nameRef.current = value)}
                        placeholder={'Enter your name'}
                    />

                    {/** Email */}
                    <TextField
                        autoCapitalize={'none'}
                        autoComplete={'email'}
                        icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}
                        keyboardType={'email-address'}
                        onChangeText={(value) => (emailRef.current = value)}
                        placeholder={'Enter your email'}
                    />

                    {/** Password */}
                    <TextField
                        autoCapitalize={'none'}
                        icon={<Icon name={'lock'} size={26} strokeWidth={1.6} />}
                        onChangeText={(value) => (passwordRef.current = value)}
                        placeholder={'Enter your password'}
                        secureTextEntry
                    />

                    {/** User Type */}

                    <View>

                        <Text style={{ color, fontSize: hp(1.5), marginBottom: hp(1) }}>{'Register as ? '}</Text>
                        <CustomPicker
                            options={options}
                            selectedValue={selectedUserType}
                            setselectedValue={(value) => setSelectedUserType(value)}
                            icon={<Icon name={'lock'} size={26} strokeWidth={1.6} />}
                        />
                    </View>

                    {/** Button Submit */}
                    <Button loading={loading} onPress={onSubmit} title={'Sign Up'} />
                </View>

                {/** Footer */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, {
                        color
                    }]}>{'Already have an account!'}</Text>
                    <Pressable onPress={() => router.push('/login')}>
                        <Text
                            style={[
                                styles.footerText,
                                { color: theme.colors.primary, fontWeight: theme.fonts.semibold },
                            ]}
                        >
                            {'Login'}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 45,
        paddingHorizontal: wp(5),
    },
    forgotPassword: {
        color: theme.colors.text,
        fontWeight: theme.fonts.semibold,
        textAlign: 'right',
    },
    form: {
        gap: 25,
    },
    footer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
    },
    footerText: {
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: hp(1.6),
    },
    welcomeText: {
        color: theme.colors.text,
        fontSize: hp(4),
        fontWeight: theme.fonts.bold,
    },
});

export default SignUp;
