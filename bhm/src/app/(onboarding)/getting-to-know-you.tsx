import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function GettingToKnowYouScreen() {
  const router = useRouter();
  const [name, setName] = useState('Serena Williams');
  const [age, setAge] = useState('39');
  const [isPregnant, setIsPregnant] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.inner}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.content}>
          <Text style={styles.title}>Getting to Know You</Text>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>What can we call you?</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholderTextColor="#4C211E"
            />
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>How old are you?</Text>
            <View style={styles.ageInputContainer}>
              <TextInput
                style={styles.ageInput}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
                placeholderTextColor="#4C211E"
              />
              <View style={styles.dropdownArrow}>
                <Text style={styles.arrowText}>▼</Text>
              </View>
            </View>
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>Are you pregnant?</Text>
            <View style={styles.pregnantButtons}>
              <TouchableOpacity
                style={[styles.pregnantButton, !isPregnant && styles.pregnantButtonSelected]}
                onPress={() => setIsPregnant(false)}>
                <Text style={[styles.pregnantButtonText, !isPregnant && styles.pregnantButtonTextSelected]}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.pregnantButton, isPregnant && styles.pregnantButtonSelected]}
                onPress={() => setIsPregnant(true)}>
                <Text style={[styles.pregnantButtonText, isPregnant && styles.pregnantButtonTextSelected]}>YES</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push('/(onboarding)/fetal-movement-set-up')}>
          <Text style={styles.nextArrow}>▶</Text>
        </TouchableOpacity>
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
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4C211E',
    backgroundColor: '#FFF2E8',
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#4C211E',
  },
  ageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4C211E',
    backgroundColor: '#FFF2E8',
  },
  ageInput: {
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
  pregnantButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 40,
  },
  pregnantButton: {
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
  pregnantButtonSelected: {
    backgroundColor: '#4C211E',
  },
  pregnantButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#4C211E',
  },
  pregnantButtonTextSelected: {
    color: '#FFF2E8',
  },
  nextButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#4C211E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextArrow: {
    fontSize: 24,
    color: '#FFF2E8',
  },
});