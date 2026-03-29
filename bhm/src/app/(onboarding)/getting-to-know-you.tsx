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

export default function GettingToKnowYouScreen() {
  const router = useRouter();
  const [name, setName] = useState('Serena Williams');
  const [age, setAge] = useState('39');
  const [isPregnant, setIsPregnant] = useState(true);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);

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
            <TouchableOpacity style={styles.ageInputContainer} onPress={() => setShowAgeDropdown(!showAgeDropdown)}>
              <Text style={styles.ageInput}>{age}</Text>
              <View style={styles.dropdownArrow}>
                <Text style={styles.arrowText}>{showAgeDropdown ? '▲' : '▼'}</Text>
              </View>
            </TouchableOpacity>
            {showAgeDropdown && (
              <View style={styles.dropdownContainer}>
                <ScrollView style={styles.dropdownScroll}>
                  {Array.from({ length: 51 }, (_, i) => i + 15).map((ageOption) => (
                    <TouchableOpacity
                      key={ageOption}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setAge(ageOption.toString());
                        setShowAgeDropdown(false);
                      }}>
                      <Text style={styles.dropdownItemText}>{ageOption}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
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
  dropdownContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#FFF2E8',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4C211E',
    maxHeight: 150,
    zIndex: 1,
  },
  dropdownScroll: {
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4C211E',
  },
  dropdownItemText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
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