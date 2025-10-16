import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notes_app_content';

const NoteTakingFooter = () => {
  const [characterCount, setCharacterCount] = useState(0);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    loadNoteInfo();
    const interval = setInterval(loadNoteInfo, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadNoteInfo = async () => {
    try {
      const savedNote = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedNote !== null) {
        setCharacterCount(savedNote.length);
        setLastSaved(new Date());
      }
    } catch (error) {
      console.error('Failed to load note info:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Characters: {characterCount}</Text>
      {lastSaved && (
        <Text style={styles.text}>Last saved: {formatTime(lastSaved)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F8F8F8',
  },
  text: {
    fontSize: 12,
    color: '#666',
  },
});

export default NoteTakingFooter;
