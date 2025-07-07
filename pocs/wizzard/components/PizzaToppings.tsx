import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface PizzaToppingsProps {
  onNext: (toppings: string[]) => void;
  onBack: () => void;
  initialToppings?: string[];
}

const TOPPINGS = [
  'Extra Cheese',
  'Olives',
  'Canadian Bacon',
  'Tomatoes',
  'Pineapple',
  'Mushrooms',
  'Bell Peppers',
  'Onions'
];

export default function PizzaToppings({ onNext, onBack, initialToppings = [] }: PizzaToppingsProps) {
  const [selectedToppings, setSelectedToppings] = useState<string[]>(initialToppings);

  const handleToppingToggle = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) 
        ? prev.filter(t => t !== topping)
        : [...prev, topping]
    );
  };

  const handleNext = () => {
    if (selectedToppings.length === 0) {
      Alert.alert('Missing Selection', 'Please select at least one topping before continuing.');
      return;
    }
    onNext(selectedToppings);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Choose Your Toppings</ThemedText>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Select Toppings ({selectedToppings.length} selected)
          </ThemedText>
          <ThemedView style={styles.optionsContainer}>
            {TOPPINGS.map((topping) => (
              <TouchableOpacity
                key={topping}
                style={[
                  styles.option,
                  selectedToppings.includes(topping) && styles.selectedOption
                ]}
                onPress={() => handleToppingToggle(topping)}
              >
                <ThemedText style={[
                  styles.optionText,
                  selectedToppings.includes(topping) && styles.selectedOptionText
                ]}>
                  {topping}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <ThemedText style={styles.nextButtonText}>Next: Delivery Info</ThemedText>
          </TouchableOpacity>
        </ThemedView>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});