import React, { FC, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

import Icon from '@/assets/icons';
import { BackButton, Button, ScreenWrapper, TextField } from '@/components';
import { theme } from '@/constants';
import { hp, wp } from '@/helpers';
import { supabase } from '@/lib/supabase';

const SignUp: FC = () => {
    const router = useRouter();

    /** Ref value */
    const emailRef = useRef<string>('');
    const nameRef = useRef<string>('');
    const passwordRef = useRef<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        if (!emailRef.current && !nameRef.current && !passwordRef.current) {
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
        } = await supabase.auth.signUp({ email, options: { data: { name } }, password });
        setLoading(false);
        console.log('Session >>:', session);
        console.log('Error >>:', error);

        if (error) {
            Alert.alert('Sign Up', error.message);
            return;
        }
    };

    return (
        <ScreenWrapper bg={'white'}>
            <StatusBar style={'dark'} />

            <View style={styles.container}>
                <BackButton router={router} />

                {/** Welcome */}
                <View>
                    <Text style={styles.welcomeText}>{"Let's"}</Text>
                    <Text style={styles.welcomeText}>{'Get Started'}</Text>
                </View>

                {/** Form */}
                <View style={styles.form}>
                    <Text style={{ color: theme.colors.text, fontSize: hp(1.5) }}>
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

                    {/** Button Submit */}
                    <Button loading={loading} onPress={onSubmit} title={'Sign Up'} />
                </View>

                {/** Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>{'Already have an account!'}</Text>
                    <Pressable onPress={() => router.back()}>
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
