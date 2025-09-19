import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Component } from '../services/api';

interface DynamicRendererProps {
  components: Component[];
}

interface ActionHandlers {
  [key: string]: (params?: any) => void;
}

export default function DynamicRenderer({ components }: DynamicRendererProps) {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [notes, setNotes] = useState<Array<{ title: string; content: string }>>([]);
  const [result, setResult] = useState<string>('Result will appear here');

  const inputRefs = useRef<{ [key: string]: TextInput | null }>({});

  const actionHandlers: ActionHandlers = {
    add: () => performCalculation('add'),
    subtract: () => performCalculation('subtract'),
    multiply: () => performCalculation('multiply'),
    divide: () => performCalculation('divide'),
    saveNote: () => {
      const title = inputValues.noteTitle?.trim();
      const content = inputValues.noteContent?.trim();

      if (!title || !content) {
        Alert.alert('Error', 'Please enter both title and content');
        return;
      }

      setNotes(prev => [...prev, { title, content }]);
      setInputValues(prev => ({ ...prev, noteTitle: '', noteContent: '' }));

      // Clear the input fields
      if (inputRefs.current.noteTitle) {
        inputRefs.current.noteTitle.clear();
      }
      if (inputRefs.current.noteContent) {
        inputRefs.current.noteContent.clear();
      }

      Alert.alert('Success', 'Note saved successfully!');
    },
  };

  const performCalculation = (operation: string) => {
    const num1 = parseFloat(inputValues.num1 || '0');
    const num2 = parseFloat(inputValues.num2 || '0');

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert('Error', 'Please enter valid numbers');
      return;
    }

    let calcResult: number;
    switch (operation) {
      case 'add':
        calcResult = num1 + num2;
        break;
      case 'subtract':
        calcResult = num1 - num2;
        break;
      case 'multiply':
        calcResult = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          Alert.alert('Error', 'Cannot divide by zero');
          return;
        }
        calcResult = num1 / num2;
        break;
      default:
        return;
    }

    setResult(`${num1} ${getOperatorSymbol(operation)} ${num2} = ${calcResult}`);
  };

  const getOperatorSymbol = (operation: string): string => {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '';
    }
  };

  const handleInputChange = (id: string, value: string) => {
    setInputValues(prev => ({ ...prev, [id]: value }));
  };

  const renderComponent = (component: Component, index: number): React.ReactNode => {
    const { type, props = {}, children = [], text, actions } = component;

    // Convert style objects to proper React Native styles
    const style = props.style ? convertStyle(props.style) : undefined;

    // Handle special cases for text content
    let displayText = text;
    if (props.id === 'result') {
      displayText = result;
    }

    switch (type) {
      case 'View':
        // Handle special case for notes list
        if (props.id === 'notesList') {
          return (
            <View key={index} style={style}>
              <Text style={styles.notesTitle}>Saved Notes</Text>
              {notes.length === 0 ? (
                <Text style={styles.noNotesText}>
                  No notes saved yet. Create your first note above!
                </Text>
              ) : (
                notes.map((note, noteIndex) => (
                  <View key={noteIndex} style={styles.noteItem}>
                    <Text style={styles.noteTitle}>{note.title}</Text>
                    <Text style={styles.noteContent}>{note.content}</Text>
                  </View>
                ))
              )}
            </View>
          );
        }
        return (
          <View key={index} style={style}>
            {children.map((child, childIndex) => renderComponent(child, childIndex))}
          </View>
        );

      case 'Text':
        return (
          <Text key={index} style={style}>
            {displayText}
          </Text>
        );

      case 'TextInput':
        return (
          <TextInput
            key={index}
            ref={(ref) => {
              if (props.id) {
                inputRefs.current[props.id] = ref;
              }
            }}
            style={style}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            multiline={props.multiline}
            value={props.id ? inputValues[props.id] || '' : undefined}
            onChangeText={(value) => {
              if (props.id) {
                handleInputChange(props.id, value);
              }
            }}
          />
        );

      case 'TouchableOpacity':
        const onPressAction = actions?.onPress;
        return (
          <TouchableOpacity
            key={index}
            style={style}
            onPress={() => {
              if (onPressAction && actionHandlers[onPressAction]) {
                actionHandlers[onPressAction]();
              }
            }}
          >
            {children.map((child, childIndex) => renderComponent(child, childIndex))}
          </TouchableOpacity>
        );

      case 'ScrollView':
        return (
          <ScrollView key={index} style={style}>
            {children.map((child, childIndex) => renderComponent(child, childIndex))}
          </ScrollView>
        );

      default:
        return (
          <View key={index}>
            <Text>Unknown component type: {type}</Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      {components.map((component, index) => renderComponent(component, index))}
    </View>
  );
}

// Helper function to convert backend style objects to React Native styles
function convertStyle(style: any): any {
  const convertedStyle: any = {};

  Object.keys(style).forEach(key => {
    const value = style[key];

    // Handle nested objects (like shadowOffset)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      convertedStyle[key] = value;
    } else {
      convertedStyle[key] = value;
    }
  });

  return convertedStyle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  noNotesText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  noteItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#007AFF',
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  noteContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});