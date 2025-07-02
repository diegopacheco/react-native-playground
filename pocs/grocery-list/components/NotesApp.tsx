import React, { useState } from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotesApp() {
  const [notes, setNotes] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Notes</ThemedText>
      <ScrollView style={styles.scrollView}>
        <TextInput
          style={styles.textInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Write your notes here..."
          multiline
          textAlignVertical="top"
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 300,
  },
});