import { useRouter } from 'expo-router';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function KicksScreen() {
  const router = useRouter();
  // Placeholder for stored data
  const lastAverage = 11; // Would be loaded from storage
  const currentAverage = 11; // Would be calculated
  const comparison = currentAverage > lastAverage ? 'increased' : currentAverage < lastAverage ? 'decreased' : 'same';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardNumber}>{currentAverage}</Text>
          <Text style={styles.cardLabel}>Average Mins Between Kicks</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>this morning</Text>
          <Text style={styles.cardLabel}>Last Active</Text>
        </View>
        <View style={styles.wideCard}>
          <Text style={styles.wideCardText}>11AM-1PM</Text>
          <Text style={styles.cardLabel}>Your baby is most active</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>{comparison}</Text>
          <Text style={styles.cardLabel}>Compared to last session</Text>
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
    gap: 32,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  card: {
    maxWidth: 128,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#687353',
    backgroundColor: '#BDCAA5',
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
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
  },
  wideCard: {
    width: 288,
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
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontFamily: 'Roboto',
    fontSize: 12,
    color: '#000',
  },
});