import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CountingKicksScreen() {
  const [kickCount, setKickCount] = useState(7);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [averageTime, setAverageTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [kickTimes, setKickTimes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    if (kickTimes.length > 1) {
      const diffs = [];
      for (let i = 1; i < kickTimes.length; i++) {
        diffs.push(kickTimes[i] - kickTimes[i - 1]);
      }
      const avg = diffs.reduce((a, b) => a + b, 0) / diffs.length;
      setAverageTime(Math.floor(avg / 1000));
    }
  }, [kickTimes]);

  const handleKick = () => {
    if (kickCount < 10) {
      setKickCount(kickCount + 1);
      setKickTimes([...kickTimes, Date.now()]);
    }
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardNumber}>{kickCount}</Text>
            <Text style={styles.cardDenom}>/10</Text>
          </View>
          <Text style={styles.cardLabel}>Kick Count</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTime}>{formatTime(elapsedTime)}</Text>
          <Text style={styles.cardLabel}>Elapsed Time</Text>
        </View>
        <View style={styles.wideCard}>
          <Text style={styles.cardTime}>{formatTime(averageTime)}</Text>
          <Text style={styles.cardLabel}>Average Time Between Each Kick</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.kickButton} onPress={handleKick}>
        <Text style={styles.kickText}>Kick!</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoIcon}>ℹ️</Text>
        <Text style={styles.infoText}>
          You only have to count 10 kicks continuously. Feel free to leave the app and come back when you feel another kick.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BDCAA5',
  },
  closeButton: {
    position: 'absolute',
    top: 56,
    left: 32,
    zIndex: 1,
  },
  closeText: {
    fontSize: 32,
    color: '#000',
  },
  cardsContainer: {
    padding: 32,
    gap: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    width: 116,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    gap: 8,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
  },
  cardDenom: {
    fontFamily: 'DynaPuff',
    fontSize: 12,
    color: '#000',
  },
  cardTime: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
  },
  cardLabel: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  wideCard: {
    width: 208,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    gap: 8,
  },
  kickButton: {
    width: 151,
    height: 105,
    borderRadius: 43,
    backgroundColor: '#687353',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 27.5,
  },
  kickText: {
    fontFamily: 'DynaPuff',
    fontSize: 41,
    color: '#FFF',
  },
  infoBox: {
    width: 312,
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    alignSelf: 'center',
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
});