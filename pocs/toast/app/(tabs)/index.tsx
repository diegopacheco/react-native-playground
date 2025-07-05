import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Animated, Modal, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [salary, setSalary] = useState('');
  const [splitPay, setSplitPay] = useState('1');
  const [toastVisible, setToastVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);

  const splitPayOptions = [
    { label: '1 month', value: '1' },
    { label: '3 months', value: '3' },
    { label: '6 months', value: '6' },
    { label: '12 months', value: '12' },
    { label: '24 months', value: '24' },
  ];

  const showToast = () => {
    setToastVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setToastVisible(false);
      });
    }, 2000);
  };

  const formatSalary = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue === '') return '';
    
    const number = parseInt(numericValue, 10);
    return number.toLocaleString();
  };

  const handleSalaryChange = (text: string) => {
    const formatted = formatSalary(text);
    setSalary(formatted);
  };

  const handleApply = () => {
    if (salary.trim() === '') {
      return;
    }
    showToast();
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>Salary Application</ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="subtitle" style={styles.label}>Salary</ThemedText>
          <TextInput
            style={styles.input}
            value={salary}
            onChangeText={handleSalaryChange}
            placeholder="Enter salary amount"
            keyboardType="numeric"
            placeholderTextColor="#666"
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText type="subtitle" style={styles.label}>Split Pay</ThemedText>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText style={styles.pickerButtonText}>
              {splitPayOptions.find(option => option.value === splitPay)?.label || 'Select option'}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <ThemedText type="defaultSemiBold" style={styles.buttonText}>Apply</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {toastVisible && (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
          <ThemedText style={styles.toastText}>Application submitted!</ThemedText>
        </Animated.View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ThemedView style={styles.modalOverlay}>
          <ThemedView style={styles.modalContent}>
            <ThemedText type="subtitle" style={styles.modalTitle}>Select Split Pay</ThemedText>
            <ScrollView style={styles.optionsList}>
              {splitPayOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionItem,
                    splitPay === option.value && styles.selectedOption
                  ]}
                  onPress={() => {
                    setSplitPay(option.value);
                    setModalVisible(false);
                  }}
                >
                  <ThemedText style={[
                    styles.optionText,
                    splitPay === option.value && styles.selectedOptionText
                  ]}>
                    {option.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  formContainer: {
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    alignItems: 'center',
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#000',
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
  },
  toast: {
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000',
  },
  optionsList: {
    maxHeight: 200,
  },
  optionItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  selectedOptionText: {
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#000',
  },
});
