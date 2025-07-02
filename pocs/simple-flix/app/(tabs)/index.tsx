import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Video {
  id: string;
  title: string;
  url: string;
}

export default function AddScreen() {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const extractVideoId = (url: string): string | null => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const saveVideo = async () => {
    if (!title.trim() || !url.trim()) {
      Alert.alert('Error', 'Please fill in both title and YouTube URL');
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      Alert.alert('Error', 'Please enter a valid YouTube URL');
      return;
    }

    try {
      const existingVideos = await AsyncStorage.getItem('videos');
      const videos: Video[] = existingVideos ? JSON.parse(existingVideos) : [];
      
      const newVideo: Video = {
        id: Date.now().toString(),
        title: title.trim(),
        url: `https://www.youtube.com/watch?v=${videoId}`
      };

      videos.push(newVideo);
      await AsyncStorage.setItem('videos', JSON.stringify(videos));
      
      setTitle('');
      setUrl('');
      Alert.alert('Success', 'Video added successfully!');
    } catch {
      Alert.alert('Error', 'Failed to save video');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Add Video</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="subtitle" style={styles.label}>Title</ThemedText>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter video title"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="subtitle" style={styles.label}>YouTube URL</ThemedText>
          <TextInput
            style={styles.input}
            value={url}
            onChangeText={setUrl}
            placeholder="https://www.youtube.com/watch?v=..."
            placeholderTextColor="#999"
            keyboardType="url"
            autoCapitalize="none"
          />
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={saveVideo}>
          <ThemedText style={styles.buttonText}>Add Video</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
