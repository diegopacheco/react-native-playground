import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, ScrollView } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface Country {
  id: string;
  name: string;
}

interface State {
  id: string;
  name: string;
  countryId: string;
}

interface City {
  id: string;
  name: string;
  stateId: string;
}

const countries: Country[] = [
  { id: 'us', name: 'United States' },
  { id: 'br', name: 'Brazil' },
];

const states: State[] = [
  { id: 'ca', name: 'California', countryId: 'us' },
  { id: 'tx', name: 'Texas', countryId: 'us' },
  { id: 'ny', name: 'New York', countryId: 'us' },
  { id: 'sp', name: 'São Paulo', countryId: 'br' },
  { id: 'rj', name: 'Rio de Janeiro', countryId: 'br' },
  { id: 'mg', name: 'Minas Gerais', countryId: 'br' },
];

const cities: City[] = [
  { id: 'la', name: 'Los Angeles', stateId: 'ca' },
  { id: 'sf', name: 'San Francisco', stateId: 'ca' },
  { id: 'houston', name: 'Houston', stateId: 'tx' },
  { id: 'dallas', name: 'Dallas', stateId: 'tx' },
  { id: 'nyc', name: 'New York City', stateId: 'ny' },
  { id: 'buffalo', name: 'Buffalo', stateId: 'ny' },
  { id: 'sao-paulo', name: 'São Paulo', stateId: 'sp' },
  { id: 'campinas', name: 'Campinas', stateId: 'sp' },
  { id: 'rio', name: 'Rio de Janeiro', stateId: 'rj' },
  { id: 'niteroi', name: 'Niterói', stateId: 'rj' },
  { id: 'bh', name: 'Belo Horizonte', stateId: 'mg' },
  { id: 'uberlandia', name: 'Uberlândia', stateId: 'mg' },
];

interface DropdownProps {
  label: string;
  options: { id: string; name: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

function Dropdown({ label, options, selectedValue, onValueChange, placeholder, disabled = false }: DropdownProps) {
  const [isVisible, setIsVisible] = useState(false);
  const selectedItem = options.find(item => item.id === selectedValue);

  return (
    <ThemedView style={styles.pickerContainer}>
      <ThemedText type="subtitle" style={styles.label}>{label}:</ThemedText>
      <TouchableOpacity
        style={[styles.dropdown, disabled && styles.dropdownDisabled]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
      >
        <ThemedText style={[styles.dropdownText, disabled && styles.dropdownTextDisabled]}>
          {selectedItem ? selectedItem.name : placeholder}
        </ThemedText>
        <ThemedText style={styles.arrow}>▼</ThemedText>
      </TouchableOpacity>
      
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <TouchableOpacity
                style={styles.option}
                onPress={() => {
                  onValueChange('');
                  setIsVisible(false);
                }}
              >
                <ThemedText style={styles.optionText}>{placeholder}</ThemedText>
              </TouchableOpacity>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={styles.option}
                  onPress={() => {
                    onValueChange(option.id);
                    setIsVisible(false);
                  }}
                >
                  <ThemedText style={styles.optionText}>{option.name}</ThemedText>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsVisible(false)}
            >
              <ThemedText style={styles.closeButtonText}>Close</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

export default function HomeScreen() {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [availableStates, setAvailableStates] = useState<State[]>([]);
  const [availableCities, setAvailableCities] = useState<City[]>([]);

  useEffect(() => {
    if (selectedCountry) {
      const filteredStates = states.filter(state => state.countryId === selectedCountry);
      setAvailableStates(filteredStates);
      setSelectedState('');
      setSelectedCity('');
      setAvailableCities([]);
    } else {
      setAvailableStates([]);
      setSelectedState('');
      setSelectedCity('');
      setAvailableCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const filteredCities = cities.filter(city => city.stateId === selectedState);
      setAvailableCities(filteredCities);
      setSelectedCity('');
    } else {
      setAvailableCities([]);
      setSelectedCity('');
    }
  }, [selectedState]);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Location Selector</ThemedText>
      
      <Dropdown
        label="Country"
        options={countries}
        selectedValue={selectedCountry}
        onValueChange={setSelectedCountry}
        placeholder="Select a country..."
      />

      <Dropdown
        label="State"
        options={availableStates}
        selectedValue={selectedState}
        onValueChange={setSelectedState}
        placeholder="Select a state..."
        disabled={availableStates.length === 0}
      />

      <Dropdown
        label="City"
        options={availableCities}
        selectedValue={selectedCity}
        onValueChange={setSelectedCity}
        placeholder="Select a city..."
        disabled={availableCities.length === 0}
      />

      {selectedCountry && selectedState && selectedCity && (
        <ThemedView style={styles.selectionContainer}>
          <ThemedText type="subtitle">Selected Location:</ThemedText>
          <ThemedText>
            {cities.find(c => c.id === selectedCity)?.name}, {' '}
            {states.find(s => s.id === selectedState)?.name}, {' '}
            {countries.find(c => c.id === selectedCountry)?.name}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  dropdownDisabled: {
    backgroundColor: '#e0e0e0',
    opacity: 0.6,
  },
  dropdownText: {
    flex: 1,
  },
  dropdownTextDisabled: {
    color: '#999',
  },
  arrow: {
    fontSize: 12,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  selectionContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
  },
});
