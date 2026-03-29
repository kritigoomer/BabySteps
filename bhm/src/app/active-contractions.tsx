import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function ActiveContractions() {
  const router = useRouter();
  const [contractions, setContractions] = useState<number[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTime]);

  const handleContraction = () => {
    const now = Date.now();
    if (!startTime) {
      setStartTime(now);
    }
    setContractions(prev => [...prev, now]);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const averageTime = () => {
    if (contractions.length < 2) return 0;
    const intervals = [];
    for (let i = 1; i < contractions.length; i++) {
      intervals.push(contractions[i] - contractions[i - 1]);
    }
    const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    return avg;
  };

  const handleEndSession = () => {
    Alert.alert(
      'End Session',
      'This will end your current session and will make you lose the current statistics.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'End', onPress: () => router.back() },
      ]
    );
  };

  const handleNotInLabor = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {/* Contractions Counter */}
        <View style={styles.counterContainer}>
          <View style={styles.box}>
            <Text style={styles.number}>{contractions.length}</Text>
            <Text style={styles.label}>/10</Text>
            <Text style={styles.subLabel}>Contractions</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.number}>{formatTime(elapsedTime)}</Text>
            <Text style={styles.subLabel}>Elapsed Time</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.number}>{formatTime(averageTime())}</Text>
            <Text style={styles.subLabel}>Average Time Between Each Contraction</Text>
          </View>
        </View>

        {/* Not in Labor Button */}
        <TouchableOpacity style={styles.notInLaborButton} onPress={handleNotInLabor}>
          <Text style={styles.notInLaborText}>Not in Labor</Text>
        </TouchableOpacity>

        {/* Contraction Button - Implicit, user taps anywhere or specific area */}
        <TouchableOpacity style={styles.contractionButton} onPress={handleContraction}>
          <Text style={styles.contractionText}>Tap to Record Contraction</Text>
        </TouchableOpacity>

        {/* End Session */}
        <View style={styles.endSessionContainer}>
          <TouchableOpacity onPress={handleEndSession}>
            <Text style={styles.endSessionText}>End Session</Text>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={styles.infoText}>
              This will end your current session and will make you lose the current statistics.
            </Text>
          </View>
        </View>

        {/* Navbar */}
        <View style={styles.navbar}>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>🏠</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👶</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>⏰</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navIcon}>👤</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAAEA8', // Pink background for contractions
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 32,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    left: 32,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 24,
    color: '#000',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginTop: 90,
    marginBottom: 50,
    flexWrap: 'wrap',
  },
  box: {
    width: 116,
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
  },
  number: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
  },
  label: {
    fontFamily: 'DynaPuff',
    fontSize: 12,
    color: '#000',
  },
  subLabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  notInLaborButton: {
    width: 330,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FFF2E8',
    marginBottom: 50,
  },
  notInLaborText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
  },
  contractionButton: {
    width: 330,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#FFF2E8',
    marginBottom: 50,
  },
  contractionText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
  },
  endSessionContainer: {
    width: 291,
    padding: 18,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
  },
  endSessionText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    alignSelf: 'stretch',
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    width: 222,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#000',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 32,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
  },
});