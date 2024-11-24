import { DarkTheme, DefaultTheme, StackRouter, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Button } from 'react-native';
import React, { FC, useEffect } from 'react';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { getUserData } from '@/services';
import { LogBox } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
LogBox.ignoreLogs(['Warning: TNodeChildrenRender', 'Warning: MemoizedTNodeRender', 'Warning: TRenderEngineProvider']);
const _layout = () => {

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <MainLayout />
      </ThemeProvider>
    </AuthProvider>
  );
};

const MainLayout: FC = () => {
  const router = useRouter();
  const { setAuth, setUserData } = useAuth();

  const updateUserData = async (user: any, email?: string) => {
    let res = await getUserData(user.id);
    if (res.success) {
      if (res.data) {
        setUserData?.({ ...res.data, email });
      }
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('Session User >>:', session?.user);

      if (session) {
        /** Set auth */
        /** Move to home screen */
        setAuth?.(session.user as any);
        updateUserData(session.user, session.user.email);
        router.replace('/(tabs)');
      } else {
        /** Set auth null */
        /** Move to welcome screen */
        setAuth?.(null);
        router.replace('/welcome');
      }
    });
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>

      <Stack.Screen
        name="add-produce"
        options={{
          presentation: "modal",
          headerShown: false
        }}
      />
    </Stack>
  );
};

export default _layout;
