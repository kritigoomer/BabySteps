import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://api.builder.io/api/v1/image/assets/TEMP/3e28c9dfdc8b64e19c1ab2acfac669229da92117?width=228',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>LOGIN</Text>

          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#ad8e8c"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ad8e8c"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => router.replace('/(tabs)/account')}>
              <Text style={styles.primaryButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => router.replace('/(tabs)/account')}>
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <TouchableOpacity onPress={() => router.replace('/(auth)/sign-up')}>
              <Text style={styles.footerLink}>Create an account</Text>
            </TouchableOpacity>
            <Text style={styles.footerText}> instead</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDCAA5',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    width: 114,
    height: 114,
  },
  formContainer: {
    width: '100%',
    paddingHorizontal: 64,
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#4C211E',
    textAlign: 'center',
    marginBottom: 4,
  },
  inputGroup: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  input: {
    width: 236,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4C211E',
    backgroundColor: '#FFF2E8',
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#4C211E',
  },
  primaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#4C211E',
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#FFF2E8',
  },
  orText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#4C211E',
    textAlign: 'center',
  },
  googleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#4C211E',
    alignItems: 'center',
  },
  googleButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#FFF2E8',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontFamily: 'DynaPuff',
    fontSize: 14,
    color: '#4C211E',
  },
  footerLink: {
    fontFamily: 'DynaPuff',
    fontSize: 14,
    color: '#4C211E',
    textDecorationLine: 'underline',
  },
});
