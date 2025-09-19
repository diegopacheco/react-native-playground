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
  // Create a stable component function that won't change on re-renders
  const DynamicComponent = React.useMemo(() => {
    try {
      // Execute the code to get the component function
      const executeCode = new Function(
        'React', 'View', 'Text', 'TextInput', 'TouchableOpacity', 'ScrollView', 'Alert',
        'Math', 'parseFloat', 'parseInt', 'isNaN', 'console',
        `
          ${page.code.replace('return CalculatorComponent();', 'return CalculatorComponent;')
                     .replace('return HeaderComponent();', 'return HeaderComponent;')
                     .replace('return FooterComponent();', 'return FooterComponent;')
                     .replace('return NotesComponent();', 'return NotesComponent;')
                     .replace('return InfoComponent();', 'return InfoComponent;')}
        `
      );

      const ComponentFunction = executeCode(
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

      return ComponentFunction;
    } catch (error) {
      console.error('Error creating dynamic component:', error);
      // eslint-disable-next-line react/display-name
      return () => (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Dynamic Code Error</Text>
          <Text style={styles.errorMessage}>
            Failed to create dynamic component from backend.
          </Text>
          <Text style={styles.errorDetails}>
            {error instanceof Error ? error.message : 'Unknown error'}
          </Text>
        </View>
      );
    }
  }, [page.code]);

  // Render the stable component
  return React.createElement(DynamicComponent);
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