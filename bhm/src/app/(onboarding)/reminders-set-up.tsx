import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RemindersSetUpScreen() {
  const router = useRouter();
  const [wantsReminders, setWantsReminders] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.title}>One Last Thing...</Text>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>Would you like to get reminders to track your baby&apos;s movements?</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, !wantsReminders && styles.buttonSelected]}
                onPress={() => setWantsReminders(false)}>
                <Text style={[styles.buttonText, !wantsReminders && styles.buttonTextSelected]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, wantsReminders && styles.buttonSelected]}
                onPress={() => setWantsReminders(true)}>
                <Text style={[styles.buttonText, wantsReminders && styles.buttonTextSelected]}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}>
            <Text style={styles.backArrow}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.finishButton}
            onPress={() => router.replace('/(tabs)/account')}>
            <Text style={styles.finishText}>Finish</Text>
          </TouchableOpacity>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 84,
    paddingBottom: 104,
  },
  title: {
    fontFamily: 'DynaPuff',
    fontSize: 32,
    color: '#4C211E',
    textAlign: 'center',
    marginBottom: 16,
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#4C211E',
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  button: {
    width: 96,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4C211E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#4C211E',
  },
  buttonText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#4C211E',
  },
  buttonTextSelected: {
    color: '#FFF2E8',
  },
  navigation: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4C211E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#FFF2E8',
  },
  finishButton: {
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#4C211E',
    backgroundColor: '#4C211E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#FFF2E8',
  },
});