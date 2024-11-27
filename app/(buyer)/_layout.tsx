import { Tabs, useRouter } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import LogoHeader from '@/components/LogoHeader';
import { ScreenWrapper } from '@/components';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();

  const bgColor = useThemeColor({}, "background");
  return (



    <ScreenWrapper>
            <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}>
     <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
            headerShown: true,
            header: (props) => (
              <LogoHeader/>
              
            ),
          }}
          />
     
        <Tabs.Screen
          name="bids"
          options={{
            title: 'Bids',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'business' : 'business-outline'} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'chatbox' : 'chatbox-outline'} color={color} />
            )
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person-sharp' : 'person-outline'} color={color} />
            )
          }}
        />

<Tabs.Screen
          name="editprofile"
        
          options={{
            headerShown: false,
            
            href: null
          }}
        />

<Tabs.Screen
          name="product"
        
          options={{
            headerShown: false,
            
            href: null
          }}
        />
<Tabs.Screen
          name="comingsoon"
        
          options={{
            headerShown: false,
            
            href: null
          }}
        />
     
        
      </Tabs>
    </ScreenWrapper>

  );
}


