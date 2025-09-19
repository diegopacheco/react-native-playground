import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import { Page } from '../services/api';

interface DynamicRendererProps {
  page: Page;
}

export default function DynamicRenderer({ page }: DynamicRendererProps) {
  try {
    // Since the backend now returns the component invocation, just execute it directly
    const executeCode = new Function(
      'React', 'View', 'Text', 'TextInput', 'TouchableOpacity', 'ScrollView', 'Alert',
      'Math', 'parseFloat', 'parseInt', 'isNaN', 'console',
      page.code
    );

    const result = executeCode(
      React,
      View,
      Text,
      TextInput,
      TouchableOpacity,
      ScrollView,
      Alert,
      Math,
      parseFloat,
      parseInt,
      isNaN,
      {
        log: (msg: any) => console.log('[Dynamic Component]:', msg),
        error: (msg: any) => console.error('[Dynamic Component]:', msg),
      }
    );

    // The result should be a React element, return it directly
    return result;

  } catch (error) {
    console.error('Error executing dynamic code:', error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Dynamic Code Error</Text>
        <Text style={styles.errorMessage}>
          Failed to execute dynamic component code from backend.
        </Text>
        <Text style={styles.errorDetails}>
          {error instanceof Error ? error.message : 'Unknown error'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffebee',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c62828',
    marginBottom: 10,
  },
  errorMessage: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorDetails: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});