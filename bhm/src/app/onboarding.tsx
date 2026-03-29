import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);

  const [name, setName] = useState('');
  const [age, setAge] = useState('39');
  const [isPregnant, setIsPregnant] = useState<boolean | null>(null);

  const [isMultiple, setIsMultiple] = useState<boolean | null>(null);
  const [weeks, setWeeks] = useState('28 weeks');
  const [activeTime, setActiveTime] = useState('11a-1p');

  const [contractionCount, setContractionCount] = useState('2');
  const [wantsReminders, setWantsReminders] = useState<boolean | null>(null);

  const nextStep = () => {
    if (step === 0) {
      if (!name.trim() || isPregnant === null) {
        Alert.alert('Please complete this page');
        return;
      }
    }

    if (step === 1) {
      if (isMultiple === null) {
        Alert.alert('Please complete this page');
        return;
      }
    }

    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = async () => {
    if (wantsReminders === null) {
      Alert.alert('Please choose reminder preference');
      return;
    }

    const surveyData = {
      name,
      age,
      isPregnant,
      isMultiple,
      weeks,
      activeTime,
      contractionCount,
      wantsReminders,
      onboardingComplete: true,
    };

    console.log('Survey Data:', surveyData);

    Alert.alert('Setup complete', 'Your profile has been saved.');
    router.replace('/');
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.card}>
          {step === 0 && (
            <>
              <ThemedText style={styles.heading}>Getting to Know You</ThemedText>

              <ThemedText style={styles.label}>What can we call you?</ThemedText>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Serena Williams"
                placeholderTextColor="#7d6c61"
              />

              <ThemedText style={styles.label}>How old are you?</ThemedText>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={age}
                  onValueChange={(itemValue) => setAge(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="35" value="35" />
                  <Picker.Item label="39" value="39" />
                  <Picker.Item label="42" value="42" />
                </Picker>
              </View>

              <ThemedText style={styles.label}>Are you pregnant?</ThemedText>
              <View style={styles.row}>
                <ChoiceButton
                  label="No"
                  selected={isPregnant === false}
                  onPress={() => setIsPregnant(false)}
                />
                <ChoiceButton
                  label="Yes"
                  selected={isPregnant === true}
                  onPress={() => setIsPregnant(true)}
                />
              </View>
            </>
          )}

          {step === 1 && (
            <>
              <ThemedText style={styles.heading}>Fetal Movement Log Set-Up</ThemedText>

              <ThemedText style={styles.label}>Are you expecting twins or more?</ThemedText>
              <ThemedText style={styles.helper}>
                *this information may alter the care you need
              </ThemedText>

              <View style={styles.row}>
                <ChoiceButton
                  label="No"
                  selected={isMultiple === false}
                  onPress={() => setIsMultiple(false)}
                />
                <ChoiceButton
                  label="Yes"
                  selected={isMultiple === true}
                  onPress={() => setIsMultiple(true)}
                />
              </View>

              <ThemedText style={styles.label}>How many weeks along are you?</ThemedText>
              <ThemedText style={styles.helper}>
                *kicks start around 28 weeks for most women
              </ThemedText>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={weeks}
                  onValueChange={(itemValue) => setWeeks(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="20 weeks" value="20 weeks" />
                  <Picker.Item label="24 weeks" value="24 weeks" />
                  <Picker.Item label="26 weeks" value="26 weeks" />
                  <Picker.Item label="28 weeks" value="28 weeks" />
                  <Picker.Item label="30 weeks" value="30 weeks" />
                  <Picker.Item label="32 weeks" value="32 weeks" />
                </Picker>
              </View>

              <ThemedText style={styles.label}>What times is your baby the most active?</ThemedText>
              <ThemedText style={styles.helper}>
                *this helps automate the device
              </ThemedText>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={activeTime}
                  onValueChange={(itemValue) => setActiveTime(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="6a-8a" value="6a-8a" />
                  <Picker.Item label="9a-11a" value="9a-11a" />
                  <Picker.Item label="11a-1p" value="11a-1p" />
                  <Picker.Item label="2p-4p" value="2p-4p" />
                  <Picker.Item label="6p-8p" value="6p-8p" />
                  <Picker.Item label="8p-10p" value="8p-10p" />
                </Picker>
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <ThemedText style={styles.heading}>Contraction Observation Set-Up</ThemedText>

              <ThemedText style={styles.label}>Have you had any contractions?</ThemedText>

              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={contractionCount}
                  onValueChange={(itemValue) => setContractionCount(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="0" value="0" />
                  <Picker.Item label="1" value="1" />
                  <Picker.Item label="2" value="2" />
                  <Picker.Item label="3+" value="3+" />
                </Picker>
              </View>
            </>
          )}

          {step === 3 && (
            <>
              <ThemedText style={styles.heading}>One Last Thing...</ThemedText>

              <ThemedText style={styles.label}>
                Would you like reminders to track your baby’s movements?
              </ThemedText>

              <View style={styles.row}>
                <ChoiceButton
                  label="No"
                  selected={wantsReminders === false}
                  onPress={() => setWantsReminders(false)}
                />
                <ChoiceButton
                  label="Yes"
                  selected={wantsReminders === true}
                  onPress={() => setWantsReminders(true)}
                />
              </View>
            </>
          )}

          <View style={styles.navRow}>
            {step > 0 ? (
              <TouchableOpacity style={styles.circleButton} onPress={prevStep}>
                <ThemedText style={styles.circleButtonText}>‹</ThemedText>
              </TouchableOpacity>
            ) : (
              <View style={styles.emptySpace} />
            )}

            {step < 3 ? (
              <TouchableOpacity style={styles.circleButton} onPress={nextStep}>
                <ThemedText style={styles.circleButtonText}>›</ThemedText>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
                <ThemedText style={styles.finishButtonText}>Finish</ThemedText>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

function ChoiceButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.choiceButton, selected && styles.choiceButtonSelected]}
      onPress={onPress}
    >
      <ThemedText
        style={[styles.choiceText, selected && styles.choiceTextSelected]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#efefef',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: 300,
    minHeight: 560,
    backgroundColor: '#c4d1ad',
    padding: 20,
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4a1f1b',
    marginBottom: 22,
    lineHeight: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4a1f1b',
    marginBottom: 10,
    lineHeight: 22,
  },
  helper: {
    fontSize: 11,
    color: '#4a1f1b',
    marginTop: -4,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#5c2b22',
    borderRadius: 8,
    backgroundColor: '#dce6c8',
    height: 42,
    paddingHorizontal: 12,
    marginBottom: 22,
    color: '#2b160e',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#5c2b22',
    borderRadius: 8,
    backgroundColor: '#dce6c8',
    marginBottom: 28,
    overflow: 'hidden',
  },
  picker: {
    color: '#2b160e',
    height: 50,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 26,
  },
  choiceButton: {
    minWidth: 78,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5c2b22',
    backgroundColor: '#dce6c8',
    alignItems: 'center',
  },
  choiceButtonSelected: {
    backgroundColor: '#5c2b22',
  },
  choiceText: {
    color: '#5c2b22',
    fontWeight: '700',
  },
  choiceTextSelected: {
    color: '#fff',
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
  },
  circleButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#5c2b22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },
  emptySpace: {
    width: 42,
    height: 42,
  },
  finishButton: {
    backgroundColor: '#5c2b22',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  finishButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
});