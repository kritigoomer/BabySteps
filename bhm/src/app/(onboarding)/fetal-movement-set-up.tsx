import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FetalMovementSetUpScreen() {
  const router = useRouter();
  const [isTwins, setIsTwins] = useState(true);
  const [weeks, setWeeks] = useState('28 weeks');
  const [activeTime, setActiveTime] = useState('11a-1p');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Fetal Movement Log Set-Up</Text>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>Are you expecting twins or more?</Text>
            <Text style={styles.note}>*this information may alter the care you need</Text>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, !isTwins && styles.buttonSelected]}
                onPress={() => setIsTwins(false)}>
                <Text style={[styles.buttonText, !isTwins && styles.buttonTextSelected]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, isTwins && styles.buttonSelected]}
                onPress={() => setIsTwins(true)}>
                <Text style={[styles.buttonText, isTwins && styles.buttonTextSelected]}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>How many weeks along are you?</Text>
            <Text style={styles.note}>*kicks start around 28 weeks for most women</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={weeks}
                onChangeText={setWeeks}
                placeholderTextColor="#4C211E"
              />
              <View style={styles.dropdownArrow}>
                <Text style={styles.arrowText}>▼</Text>
              </View>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>What times is your baby the most active?</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={activeTime}
                onChangeText={setActiveTime}
                placeholderTextColor="#4C211E"
              />
              <View style={styles.dropdownArrow}>
                <Text style={styles.arrowText}>▼</Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.back()}>
            <Text style={styles.navArrow}>◀</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => router.push('/(onboarding)/contraction-set-up')}>
            <Text style={styles.navArrow}>▶</Text>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 84,
    paddingBottom: 120, // space for navigation
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
    marginBottom: 8,
  },
  note: {
    fontFamily: 'DynaPuff',
    fontSize: 14,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4C211E',
    backgroundColor: '#FFF2E8',
  },
  input: {
    flex: 1,
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#4C211E',
  },
  dropdownArrow: {
    marginLeft: 8,
  },
  arrowText: {
    fontSize: 12,
    color: '#4C211E',
  },
  navigation: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#4C211E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrow: {
    fontSize: 24,
    color: '#FFF2E8',
  },
});