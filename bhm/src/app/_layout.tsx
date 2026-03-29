import { Stack } from 'expo-router';
import React from 'react';
import { useFonts, DynaPuff_400Regular } from '@expo-google-fonts/dynapuff';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'DynaPuff': DynaPuff_400Regular,
    'Roboto': Roboto_400Regular,
  });

  if (!fontsLoaded) return null;
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="counting-kicks" options={{ presentation: 'modal' }} />
      <Stack.Screen name="active-contractions" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
