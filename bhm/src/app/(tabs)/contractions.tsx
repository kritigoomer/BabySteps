import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ContractionsScreen() {
  const router = useRouter();
  const [sessionLength, setSessionLength] = useState('1');
  const [customTime, setCustomTime] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.question}>How long should this session be?</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.option, sessionLength === '1' && styles.optionSelected]}
            onPress={() => setSessionLength('1')}>
            <Text style={styles.optionText}>1 hour (recommended)</Text>
          </TouchableOpacity>

          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              1 hour is the minimum period of time needed to reveal if labor has been induced.
            </Text>
          </View>
        </View>

        <Text style={styles.orText}>or enter a custom time in hours:</Text>

        <TextInput
          style={styles.customInput}
          value={customTime}
          onChangeText={(text) => {
            setCustomTime(text);
            setSessionLength(text);
          }}
          placeholder="custom time"
          placeholderTextColor="#000"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.beginButton}
          onPress={() => router.push('/active-contractions')}>
          <Text style={styles.beginButtonText}>Begin Contractions</Text>
        </TouchableOpacity>

        <View style={styles.finalInfoRow}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.finalInfoText}>
            Please ensure you remain in a stable/upright position. Do not tilt your body. Lay flat or sit in a relaxed, upright manner.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 64,
    paddingTop: 154,
    paddingBottom: 106,
  },
  question: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  options: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  option: {
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
  },
  optionSelected: {
    // No background, just border
  },
  optionText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    width: 222,
  },
  infoIcon: {
    fontSize: 16,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#000',
  },
  orText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  customInput: {
    width: 212,
    height: 42,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    alignSelf: 'center',
  },
  beginButton: {
    padding: 16,
    borderRadius: 25,
    backgroundColor: '#4C211E',
    alignItems: 'center',
    marginBottom: 16,
  },
  beginButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#FFF',
  },
  finalInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  finalInfoText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#000',
  },
});