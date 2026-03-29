import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent} // 2. Added container style
        showsVerticalScrollIndicator={false}
      >
      <View style={styles.profileSection}>
        <View style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <Text style={styles.name}>First Last Name</Text>
          <Text style={styles.age}>39 years old</Text>
          <View style={styles.details}>
            <Text style={styles.detail}>Twins</Text>
            <Text style={styles.detail}>29 weeks in</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editIcon}>✏️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Pregnancy is normal</Text>
      </View>

      <View style={styles.downloadSection}>
        <Text style={styles.downloadText}>download full report</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadIcon}>⬇️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logsSection}>
        <Text style={styles.logsTitle}>Recent Logs</Text>
        <View style={styles.logsPlaceholder} />
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
  scrollContent: {
    paddingBottom: 40, // Ensures content doesn't hug the bottom of the screen
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 32,
    gap: 16,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#D9D9D9',
  },
  profileInfo: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
  },
  age: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#000',
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detail: {
    fontFamily: 'DynaPuff',
    fontSize: 12,
    color: '#000',
  },
  editButton: {
    padding: 8,
  },
  editIcon: {
    fontSize: 24,
  },
  card: {
    marginHorizontal: 32,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#BDCAA5',
  },
  cardText: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  downloadSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 13,
    gap: 52,
  },
  downloadText: {
    fontFamily: 'DynaPuff',
    fontSize: 12,
    color: '#000',
    textAlign: 'center',
    width: 65,
  },
  downloadButton: {
    padding: 8,
  },
  downloadIcon: {
    fontSize: 24,
  },
  logsSection: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 13,
  },
  logsTitle: {
    fontFamily: 'DynaPuff',
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  logsPlaceholder: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
});