import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FetalMovementSetUpScreen() {
  const router = useRouter();
  const [isTwins, setIsTwins] = useState(true);
  const [weeks, setWeeks] = useState('28');
  const [activeTime, setActiveTime] = useState('11a-1p');
  const [showWeeksDropdown, setShowWeeksDropdown] = useState(false);
  const [showActiveTimeDropdown, setShowActiveTimeDropdown] = useState(false);

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
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowWeeksDropdown(!showWeeksDropdown)}>
              <Text style={styles.input}>{weeks} weeks</Text>
              <View style={styles.dropdownArrow}>
                <Text style={styles.arrowText}>{showWeeksDropdown ? '▲' : '▼'}</Text>
              </View>
            </TouchableOpacity>
            {showWeeksDropdown && (
              <View style={styles.dropdownContainer}>
                <ScrollView style={styles.dropdownScroll}>
                  {Array.from({ length: 21 }, (_, i) => i + 20).map((weekOption) => (
                    <TouchableOpacity
                      key={weekOption}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setWeeks(weekOption.toString());
                        setShowWeeksDropdown(false);
                      }}>
                      <Text style={styles.dropdownItemText}>{weekOption} weeks</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.questionContainer}>
            <Text style={styles.question}>What times is your baby the most active?</Text>
            <TouchableOpacity style={styles.inputContainer} onPress={() => setShowActiveTimeDropdown(!showActiveTimeDropdown)}>
              <Text style={styles.input}>{activeTime}</Text>
              <View style={styles.dropdownArrow}>
                <Text style={styles.arrowText}>{showActiveTimeDropdown ? '▲' : '▼'}</Text>
              </View>
            </TouchableOpacity>
            {showActiveTimeDropdown && (
              <View style={styles.dropdownContainer}>
                <ScrollView style={styles.dropdownScroll}>
                  {[
                    '12a-2a', '2a-4a', '4a-6a', '6a-8a', '8a-10a', '10a-12p',
                    '12p-2p', '2p-4p', '4p-6p', '6p-8p', '8p-10p', '10p-12a'
                  ].map((timeOption) => (
                    <TouchableOpacity
                      key={timeOption}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setActiveTime(timeOption);
                        setShowActiveTimeDropdown(false);
                      }}>
                      <Text style={styles.dropdownItemText}>{timeOption}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
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