import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "@/services/firebase";

export default function LoginScreen() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePrimaryAction = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing information', 'Please enter email and password.');
      return;
    }

    try {
      if (isSignup) {
        // SIGN UP
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Account created!");

        // 👉 NEW USER → GO TO ONBOARDING
        router.replace('/onboarding');

      } else {
        // LOGIN
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Success", "Logged in!");

        // 👉 EXISTING USER → GO TO HOME
        router.replace('/');
      }
      router.replace('/'); // go to home
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleGoogle = async () => {
    Alert.alert('Google Sign-In', 'Frontend button wired. Backend can be added later.');
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.card}>
            <Image
              source={require('../../assets/images/baby-steps.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            <ThemedText style={styles.title}>
              {isSignup ? 'SIGN UP' : 'LOGIN'}
            </ThemedText>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#7d6c61"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#7d6c61"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.primaryButton} onPress={handlePrimaryAction}>
              <ThemedText style={styles.primaryButtonText}>
                {isSignup ? 'Sign Up' : 'Login'}
              </ThemedText>
            </TouchableOpacity>

            <ThemedText style={styles.orText}>or</ThemedText>

            <TouchableOpacity style={styles.googleButton} onPress={handleGoogle}>
              <ThemedText style={styles.googleButtonText}>
                {isSignup ? 'Sign up with Google' : 'Sign in with Google'}
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsSignup((prev) => !prev)}>
              <ThemedText style={styles.switchText}>
                {isSignup
                  ? 'Already have an account? Login'
                  : 'Create an account instead'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: 250,
    backgroundColor: '#f5ede4',
    borderRadius: 2,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  logo: {
    width: 92,
    height: 92,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2b160e',
    marginBottom: 24,
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 34,
    borderWidth: 1,
    borderColor: '#6a4a3b',
    borderRadius: 18,
    paddingHorizontal: 12,
    marginBottom: 10,
    backgroundColor: '#fffaf5',
    color: '#2b160e',
    fontSize: 14,
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#43291f',
    borderRadius: 18,
    paddingVertical: 8,
    paddingHorizontal: 22,
    minWidth: 96,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  orText: {
    marginTop: 18,
    marginBottom: 14,
    color: '#2b160e',
    fontSize: 14,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#43291f',
    borderRadius: 18,
    paddingVertical: 9,
    paddingHorizontal: 18,
    alignItems: 'center',
    width: '100%',
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  switchText: {
    marginTop: 18,
    fontSize: 13,
    color: '#2b160e',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});