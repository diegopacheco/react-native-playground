import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface PizzaFlavorSizeProps {
  onNext: (flavor: string, size: string) => void;
  initialFlavor?: string;
  initialSize?: string;
}

const FLAVORS = ['Pepperoni', 'Cheese', 'Steak', 'Hawaiian', 'Margherita', 'Veggie'];
const SIZES = ['14', '15', '16'];

export default function PizzaFlavorSize({ onNext, initialFlavor = '', initialSize = '' }: PizzaFlavorSizeProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<string>(initialFlavor);
  const [selectedSize, setSelectedSize] = useState<string>(initialSize);

  const handleNext = () => {
    if (!selectedFlavor || !selectedSize) {
      Alert.alert('Missing Selection', 'Please select both flavor and size before continuing.');
      return;
    }
    onNext(selectedFlavor, selectedSize);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Choose Your Pizza</ThemedText>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Select Flavor</ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {FLAVORS.map((flavor) => (
              <TouchableOpacity
                key={flavor}
                style={[
                  styles.option,
                  selectedFlavor === flavor && styles.selectedOption
                ]}
                onPress={() => setSelectedFlavor(flavor)}
              >
                <ThemedText style={[
                  styles.optionText,
                  selectedFlavor === flavor && styles.selectedOptionText
                ]}>
                  {flavor}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Select Size</ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.option,
                  selectedSize === size && styles.selectedOption
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <ThemedText style={[
                  styles.optionText,
                  selectedSize === size && styles.selectedOptionText
                ]}>
                  {size} inches
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <ThemedText style={styles.nextButtonText}>Next: Select Toppings</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: 'transparent',
  },
  selectedOption: {
    borderColor: '#007AFF',
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});