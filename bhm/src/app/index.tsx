import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function IndexScreen() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace('/login');
      } else {
        setEmail(user.email);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <ThemedText style={styles.title}>Baby Health Monitor</ThemedText>
        <ThemedText style={styles.subtitle}>Welcome {email ?? 'User'}</ThemedText>

        <TouchableOpacity style={styles.card}>
          <ThemedText style={styles.cardTitle}>Fetal Movement Tracker</ThemedText>
          <ThemedText>Track baby movement sessions and patterns.</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <ThemedText style={styles.cardTitle}>Contractions Tracker</ThemedText>
          <ThemedText>Track contraction timing and duration.</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
    color: '#2b160e',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 28,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f5ede4',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
    color: '#2b160e',
  },
  logoutButton: {
    marginTop: 18,
    backgroundColor: '#43291f',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '700',
  },
});