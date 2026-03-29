import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { defaultKickSessions, defaultUserStats, KickSession } from '../../constants/dataTypes';

export default function KicksScreen() {
  const router = useRouter();

  // Load data from database/storage (using defaults for now)
  const kickSessions: KickSession[] = defaultKickSessions;
  const userStats = defaultUserStats;

  // Calculate current stats
  const lastSession = kickSessions[0]; // Most recent
  const previousSession = kickSessions[1]; // Second most recent

  const currentAverage = lastSession ? lastSession.averageMinutes : 0;
  const lastAverage = previousSession ? previousSession.averageMinutes : currentAverage;
  const comparison = currentAverage > lastAverage ? 'increased' : currentAverage < lastAverage ? 'decreased' : 'same';

  // Format logs for display
  const logs = kickSessions.map(session => ({
    date: session.date,
    average: session.averageMinutes,
    count: session.count,
  }));

  // Calculate display values
  const lastActiveTime = lastSession ? new Date(lastSession.startTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).toLowerCase().replace(' ', '') : 'this morning';

  const activeTimeRange = `${userStats.activeTimeStart}-${userStats.activeTimeEnd}`;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Kicks</Text>

        <View style={styles.cardsContainer}>
        <View style={styles.timeCard}>
          <Text style={styles.cardNumber}>{currentAverage}</Text>
          <Text style={styles.cardLabel}>Average Mins Between Kicks</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>{lastActiveTime}</Text>
          <Text style={styles.cardLabel}>Last Active</Text>
        </View>
        <View style={styles.wideCard}>
          <Text style={styles.wideCardText}>{activeTimeRange}</Text>
          <Text style={styles.cardLabel}>Your baby is most active</Text>
        </View>
        <View style={styles.compCard}>
          <Text style={styles.cardText}>{comparison}</Text>
          <Text style={styles.cardLabel}>Compared to last session</Text>
          <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            If significantly different, consider seeing a doctor.
          </Text>
      </View>
        </View>
      </View>
      

      <View style={styles.trackSection}>
        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => router.push('/counting-kicks')}>
          <Text style={styles.trackButtonText}>Track Kicks Now</Text>
        </TouchableOpacity>
        <View style={styles.infoRow}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            Fetuses are most active in the evening around 1 hour after their mother eats.
          </Text>
        </View>
      </View>

      <View style={styles.logsSection}>
        <Text style={styles.logsTitle}>Recent Logs</Text>
        <ScrollView style={styles.logsScroll}>
          {logs.map((log, index) => (
            <View key={index} style={styles.logItem}>
              <Text style={styles.logDate}>{log.date}</Text>
              <Text style={styles.logDetails}>Count: {log.count} | Avg: {log.average} min</Text>
            </View>
          ))}
        </ScrollView>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  cardsContainer: {
    marginTop: 128,
    padding: 16,
    gap: 16,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingBottom: 120, // space for navigation
  },
  timeCard: {
    maxWidth: 128,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#687353',
    backgroundColor: '#BDCAA5',
    alignItems: 'center',
    gap: 8,
  },
  card: {
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#687353',
    backgroundColor: '#BDCAA5',
    justifyContent: "space-evenly",
    alignItems: 'center',
    gap: 8,
  },
  compCard: {
    width: 330,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#687353',
    backgroundColor: '#BDCAA5',
    justifyContent: "space-evenly",
    alignItems: 'center',
    gap: 8,
  },
  cardNumber: {
    fontFamily: 'DynaPuff',
    fontSize: 32,
    color: '#000',
  },
  cardText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
  },
  cardLabel: {
    fontFamily: 'Roboto',
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  wideCard: {
    width: 330,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    gap: 8,
  },
  wideCardText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
  },
  trackSection: {
    paddingHorizontal: 90,
    paddingVertical: 16,
    gap: 16,
  },
  trackButton: {
    marginTop: 64,
    padding: 16,
    borderRadius: 25,
    backgroundColor: '#687353',
    alignItems: 'center',
  },
  trackButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#FFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  infoIcon: {
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#000',
  },
  logsSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logsTitle: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#687353',
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
    borderBottomColor: '#BDCAA5',
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
    color: '#687353',
  },
  pageTitle: {
    fontFamily: 'DynaPuff',
    fontSize: 32,
    color: '#687353',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
});