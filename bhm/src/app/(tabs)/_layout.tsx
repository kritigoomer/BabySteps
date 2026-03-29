import { Tabs } from 'expo-router';
import React from 'react';
import AccountIcon from '../../components/AccountIcon';
import KicksIcon from '../../components/KicksIcon';
import ContractionsIcon from '../../components/ContractionsIcon';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ focused }) => (
            <AccountIcon focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="kicks"
        options={{
          title: 'Kicks',
          tabBarIcon: ({ focused }) => (
            <KicksIcon focused={focused} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="contractions"
        options={{
          title: 'Contractions',
          tabBarIcon: ({ focused }) => (
            <ContractionsIcon focused={focused} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}