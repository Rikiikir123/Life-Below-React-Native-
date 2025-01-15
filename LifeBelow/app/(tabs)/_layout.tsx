import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Fish Scanner"
        options={{
          title: 'Fish Scanner',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/icons/fish.png')}
              style={{
                width: 50,
                height: 50,
                tintColor: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].tabIconDefault,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="SeaLife Scanner"
        options={{
          title: 'SeaLife Scanner',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/icons/sealife.png')}
              style={{
                width: 35,
                height: 35,
                tintColor: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].tabIconDefault,
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: 'Map',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('@/assets/icons/location.png')}
              style={{
                width: 27,
                height: 27,
                tintColor: focused
                  ? Colors[colorScheme ?? 'light'].tint
                  : Colors[colorScheme ?? 'light'].tabIconDefault,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
