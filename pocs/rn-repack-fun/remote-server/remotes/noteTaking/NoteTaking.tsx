import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notes_app_content';

const NoteTaking = () => {
  const [text, setText] = useState('');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadNote();
  }, []);

  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveNote(text);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [text]);

  const loadNote = async () => {
    try {
      const savedNote = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedNote !== null) {
        setText(savedNote);
      }
    } catch (error) {
      console.error('Failed to load note:', error);
    }
  };

  const saveNote = async (content: string) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, content);
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Start typing your notes here..."
        placeholderTextColor="#999"
        value={text}
        onChangeText={setText}
        textAlignVertical="top"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    lineHeight: 24,
  },
});

export default NoteTaking;
