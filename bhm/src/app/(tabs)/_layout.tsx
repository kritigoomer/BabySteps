import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
        }}
      />
      <Tabs.Screen
        name="kicks"
        options={{
          title: 'Kicks',
        }}
      />
      <Tabs.Screen
        name="contractions"
        options={{
          title: 'Contractions',
        }}
      />
    </Tabs>
  );
}