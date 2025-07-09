import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CheckinData {
  timestamp: number;
  date: string;
}

export default function CheckinScreen() {
  const [checkins, setCheckins] = useState<CheckinData[]>([]);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkTodayStatus = useCallback((data: CheckinData[]) => {
    const today = new Date().toISOString().split('T')[0];
    const todayCheckin = data.find(checkin => checkin.date === today);
    setTodayCheckedIn(!!todayCheckin);
  }, []);

  const loadCheckins = useCallback(async () => {
    try {
      const fileUri = FileSystem.documentDirectory + 'gym-checkins.json';
      const fileExists = await FileSystem.getInfoAsync(fileUri);
      
      if (fileExists.exists) {
        const content = await FileSystem.readAsStringAsync(fileUri);
        const data = JSON.parse(content);
        setCheckins(data);
        checkTodayStatus(data);
      } else {
        setCheckins([]);
      }
    } catch (error) {
      console.error('Error loading checkins:', error);
      setCheckins([]);
    }
  }, [checkTodayStatus]);

  useEffect(() => {
    loadCheckins();
  }, [loadCheckins]);


  const handleCheckin = async () => {
    if (todayCheckedIn) {
      Alert.alert('Already Checked In', 'You have already checked in today!');
      return;
    }

    setIsLoading(true);
    
    try {
      const now = new Date();
      const timestamp = now.getTime();
      const date = now.toISOString().split('T')[0];
      
      const newCheckin: CheckinData = {
        timestamp,
        date
      };
      
      const updatedCheckins = [...checkins, newCheckin];
      setCheckins(updatedCheckins);
      
      const fileUri = FileSystem.documentDirectory + 'gym-checkins.json';
      await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedCheckins, null, 2));
      
      setTodayCheckedIn(true);
      Alert.alert('Success!', 'Gym check-in recorded successfully! 💪');
    } catch (error) {
      console.error('Error saving checkin:', error);
      Alert.alert('Error', 'Failed to record check-in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getLastCheckinInfo = () => {
    if (checkins.length === 0) return null;
    
    const lastCheckin = checkins[checkins.length - 1];
    const lastDate = new Date(lastCheckin.timestamp);
    
    return {
      date: lastDate.toLocaleDateString(),
      time: lastDate.toLocaleTimeString()
    };
  };

  const getStreakInfo = () => {
    if (checkins.length === 0) return 0;
    
    const sortedCheckins = [...checkins].sort((a, b) => b.timestamp - a.timestamp);
    let streak = 0;
    let currentDate = new Date();
    
    for (const checkin of sortedCheckins) {
      const checkinDate = new Date(checkin.timestamp);
      const daysDiff = Math.floor((currentDate.getTime() - checkinDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === streak) {
        streak++;
        currentDate = checkinDate;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const lastCheckin = getLastCheckinInfo();
  const streak = getStreakInfo();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Gym Check-in</ThemedText>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <ThemedText type="subtitle">Total Check-ins</ThemedText>
          <ThemedText style={styles.statNumber}>{checkins.length}</ThemedText>
        </View>
        
        <View style={styles.statCard}>
          <ThemedText type="subtitle">Current Streak</ThemedText>
          <ThemedText style={styles.statNumber}>{streak}</ThemedText>
        </View>
      </View>

      {lastCheckin && (
        <View style={styles.lastCheckinContainer}>
          <ThemedText type="subtitle">Last Check-in:</ThemedText>
          <ThemedText>{lastCheckin.date} at {lastCheckin.time}</ThemedText>
        </View>
      )}

      <View style={styles.checkinButtonContainer}>
        <Button
          title={todayCheckedIn ? "Already Checked In Today ✅" : "Check In Now 💪"}
          onPress={handleCheckin}
          disabled={todayCheckedIn || isLoading}
        />
      </View>

      {todayCheckedIn && (
        <ThemedText style={styles.successMessage}>
          Great job! You&apos;ve checked in today! 🎉
        </ThemedText>
      )}

      {checkins.length === 0 && (
        <ThemedText style={styles.welcomeMessage}>
          Welcome to Gym Hub! Tap the button above to record your first gym visit.
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    minWidth: 100,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  lastCheckinContainer: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
  },
  checkinButtonContainer: {
    marginVertical: 20,
  },
  successMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#4CAF50',
  },
  welcomeMessage: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    opacity: 0.7,
  },
});
