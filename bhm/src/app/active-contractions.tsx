import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DeviceMotion } from 'expo-sensors';

export default function ActiveContractions() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const sessionLength = params.sessionLength
    ? parseInt(params.sessionLength as string)
    : 3600000;

  const [contractions, setContractions] = useState<number[]>([]);
  const [contractionDurations, setContractionDurations] = useState<number[]>([]);
  const [remainingTime, setRemainingTime] = useState(sessionLength);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isAtRest, setIsAtRest] = useState(true);
  const [trueContractions, setTrueContractions] = useState<number[]>([]);
  const [totalTrueTime, setTotalTrueTime] = useState(0);
  const [currentContractionStart, setCurrentContractionStart] = useState<number | null>(null);
  const [laborStatus, setLaborStatus] = useState('not_in_labor');
  const [calibrating, setCalibrating] = useState(true);
  const [calibrationTime, setCalibrationTime] = useState(0);

  // TIMER
  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setElapsedTime(elapsed);
      setRemainingTime(Math.max(0, sessionLength - elapsed));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  // LABOR STATUS
  useEffect(() => {
    if (trueContractions.length >= 5) {
      setLaborStatus('possibly_in_labor');
    } else {
      setLaborStatus('not_in_labor');
    }
  }, [trueContractions]);

  // CALIBRATION TIMER (FIXED STALE STATE)
  useEffect(() => {
    if (!calibrating) return;

    const interval = setInterval(() => {
      setCalibrationTime(prev => {
        if (prev >= 5) {
          setCalibrating(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [calibrating]);

  // DEVICE MOTION
  useEffect(() => {
    let subscription: any;

    const startMotionMonitoring = async () => {
      const { status } = await DeviceMotion.requestPermissionsAsync();
      if (status === 'granted') {
        await DeviceMotion.setUpdateInterval(1000);

        subscription = DeviceMotion.addListener((motionData) => {
          const { rotation } = motionData;
          const tilted =
            Math.abs(rotation?.beta || 0) > 0.3 ||
            Math.abs(rotation?.gamma || 0) > 0.3;

          setIsAtRest(!tilted);
        });
      }
    };

    if (startTime) startMotionMonitoring();

    return () => {
      if (subscription) subscription.remove();
    };
  }, [startTime]);

  // WEBSOCKET
  useEffect(() => {
    const socket = new WebSocket("ws://192.168.4.137:3000");

    socket.onopen = () => console.log("Connected to backend");

    socket.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        handleArduinoEvent(parsed);
      } catch {
        console.log("Invalid JSON:", event.data);
      }
    };

    socket.onerror = (err) => console.log("Socket error:", err);

    return () => socket.close();
  }, []);

  // ARDUINO HANDLER (FIXED STATE BUG)
  const handleArduinoEvent = (event: any) => {
    const now = Date.now();

    if (!startTime) setStartTime(now);

    if (event.event === "contraction_start") {
      setCurrentContractionStart(now);
    }

    if (event.event === "contraction_end") {
      const duration = event.data.duration_sec * 1000;

      setContractions(prev => {
        const last = prev.length > 0 ? prev[prev.length - 1] : 0;
        const interval = last ? now - last : 0;

        const isTrue = classifyContraction(duration, interval);

        if (isTrue) {
          setTrueContractions(t => [...t, now]);
          setTotalTrueTime(t => t + duration);
        }

        return [...prev, now];
      });

      setCurrentContractionStart(null);
    }
  };

  const handleContraction = () => {
    const now = Date.now();

    if (!startTime) setStartTime(now);

    if (currentContractionStart) {
      const duration = now - currentContractionStart;

      setContractionDurations(prev => [...prev, duration]);

      setContractions(prev => {
        const last = prev.length > 0 ? prev[prev.length - 1] : 0;
        const interval = last ? now - last : 0;

        const isTrue = classifyContraction(duration, interval);

        if (isTrue) {
          setTrueContractions(t => [...t, now]);
          setTotalTrueTime(t => t + duration);
        }

        return [...prev, now];
      });

      setCurrentContractionStart(null);
    } else {
      setCurrentContractionStart(now);
    }
  };

  const classifyContraction = (duration: number, interval: number) => {
    return duration > 30000 && (interval === 0 || interval < 300000);
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    return `${h.toString().padStart(2, '0')}:${m
      .toString()
      .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const averageTime = () => {
    if (contractions.length < 2) return 0;

    const intervals = [];
    for (let i = 1; i < contractions.length; i++) {
      intervals.push(contractions[i] - contractions[i - 1]);
    }

    return intervals.reduce((a, b) => a + b, 0) / intervals.length;
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>

        {calibrating ? (
          <View style={styles.calibrationContainer}>
            <Text style={styles.calibrationTitle}>Calibrate Flex Sensor</Text>
            <Text style={styles.calibrationText}>Please ensure the flex sensor is properly attached and relaxed.</Text>
            <Text style={styles.calibrationTimer}>{calibrationTime}/5 seconds</Text>
            <TouchableOpacity 
              style={[styles.calibrateButton, calibrationTime < 5 && styles.calibrateButtonDisabled]} 
              onPress={() => calibrationTime >= 5 && setCalibrating(false)}
              disabled={calibrationTime < 5}>
              <Text style={styles.calibrateButtonText}>Calibrate</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Rest Warning */}
            {!isAtRest && (
              <View style={styles.warningContainer}>
                <Text style={styles.warningText}>⚠️ Please remain at rest. Do not tilt your body.</Text>
              </View>
            )}

            {/* Contractions Counter */}
            <View style={styles.counterContainer}>
              <View style={styles.box}>
                <Text style={styles.number}>{contractions.length}</Text>
                <Text style={styles.label}>/10</Text>
                <Text style={styles.subLabel}>Contractions</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.number}>{formatTime(remainingTime)}</Text>
                <Text style={styles.subLabel}>Time Remaining</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.number}>{formatTime(averageTime())}</Text>
                <Text style={styles.subLabel}>Average Time Between Each Contraction</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.number}>{trueContractions.length}</Text>
                <Text style={styles.subLabel}>True Contractions</Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.number}>{formatTime(totalTrueTime)}</Text>
                <Text style={styles.subLabel}>Total True Contraction Time</Text>
              </View>
            </View>

            {/* Labor Status */}
            <View style={{...styles.laborStatusContainer, backgroundColor: laborStatus === 'possibly_in_labor' ? '#FFD700' : '#FFF2E8'}}>
              <Text style={styles.laborStatusText}>
                {laborStatus === 'not_in_labor' 
                  ? 'As of now, you are not in labor.' 
                  : 'Possibly in labor, visit a hospital.'}
              </Text>
            </View>

            {/* Contraction Button */}
            <TouchableOpacity style={styles.contractionButton} onPress={handleContraction}>
              <Text style={styles.contractionText}>
                {currentContractionStart ? 'End Contraction' : 'Start Contraction'}
              </Text>
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
          </>
        )}
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
  calibrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  calibrationTitle: {
    fontFamily: 'DynaPuff',
    fontSize: 32,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  calibrationText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  calibrationTimer: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  calibrateButton: {
    padding: 16,
    borderRadius: 25,
    backgroundColor: '#4C211E',
    alignItems: 'center',
  },
  calibrateButtonDisabled: {
    backgroundColor: '#CCC',
  },
  calibrateButtonText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#FFF',
  },
  warningContainer: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#000',
  },
  warningText: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  laborStatusContainer: {
    width: 330,
    padding: 16,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    marginBottom: 50,
  },
  laborStatusText: {
    fontFamily: 'DynaPuff',
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
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
    padding: 16,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
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
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
    backgroundColor: '#4c211e',
    marginBottom: 50,
  },
  contractionText: {
    fontFamily: 'DynaPuff',
    fontSize: 24,
    color: '#FFF2E8',
  },
  endSessionContainer: {
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
})