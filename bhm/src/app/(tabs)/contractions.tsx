import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
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
  const logs = [
    { date: '2024-03-28', duration: '1h 15m', trueContractions: 5, totalTime: '45m' },
    { date: '2024-03-27', duration: '1h 0m', trueContractions: 3, totalTime: '30m' },
    { date: '2024-03-26', duration: '1h 30m', trueContractions: 7, totalTime: '50m' },
  ];

  const startArduinoSession = async (durationMs: number) => {
  try {
    await fetch(`http://192.168.4.137:3000/start-session?duration=${durationMs}`);
    console.log(`✅ Session started — duration: ${durationMs} ms`);
  } catch (err) {
    console.log("Failed to start session:", err);
    // Still continue to the active screen even if the request fails
  }
};
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.pageTitle}>Contractions</Text>

        <Text style={styles.question}>How long should this session be?</Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.option, sessionLength === '1' && styles.optionSelected]}
            onPress={() => setSessionLength('1')}>
            <Text style={[styles.optionText, sessionLength === '1' && styles.optionTextSelected]}>1 hour (recommended)</Text>
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
          placeholderTextColor="#dcb1b1"
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={styles.beginButton}
          onPress={async () => {
            const durationMs = parseFloat(sessionLength) * 3600000;
            // 🔥 FIRST-TIME LOGIC — now happens right here on the Begin button
            await startArduinoSession(durationMs);
            // Then navigate to the active contractions screen
            router.push({
              pathname: '/active-contractions',
              params: { sessionLength: durationMs },
            });
          }}
        >
          <Text style={styles.beginButtonText}>Begin Contractions</Text>
        </TouchableOpacity>

        <View style={styles.finalInfoRow}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.finalInfoText}>
            Please ensure you remain in a stable/upright position. Do not tilt your body. Lay flat or sit in a relaxed, upright manner.
          </Text>
        </View>

        <View style={styles.logsSection}>
          <Text style={styles.logsTitle}>Recent Logs</Text>
          <ScrollView style={styles.logsScroll}>
            {logs.map((log, index) => (
              <View key={index} style={styles.logItem}>
                <Text style={styles.logDate}>{log.date}</Text>
                <Text style={styles.logDetails}>Duration: {log.duration} | True: {log.trueContractions} | Total: {log.totalTime}</Text>
              </View>
            ))}
          </ScrollView>
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
    marginHorizontal: 16,
    paddingTop: 128,
  },
  question: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  pageTitle: {
    fontFamily: 'DynaPuff',
    fontSize: 32,
    color: '#4C211E',
    textAlign: 'center',
    marginBottom: 32,
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
    backgroundColor: '#4C211E',
  },
  optionText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#000',
  },
  optionTextSelected: {
    color: '#FFF2E8',
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
    paddingHorizontal: 16,
    paddingVertical: 4,
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
    marginTop: 64,
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
  logsSection: {
    paddingVertical: 32,
  },
  logsTitle: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#4c211e',
    marginBottom: 8,
  },
  logsScroll: {
    maxHeight: 200,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#4c211e',
  },
  logDate: {
    fontFamily: 'Roboto',
    fontSize: 16,
    marginRight: 8,
    color: '#000',
  },
  logDetails: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#4c211e',
  },
});