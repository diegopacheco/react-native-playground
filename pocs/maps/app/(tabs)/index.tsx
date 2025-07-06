import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Platform, Linking, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<{latitude: number; longitude: number; address: string} | null>(null);

  const searchAddress = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter an address');
      return;
    }

    try {
      const geocoded = await Location.geocodeAsync(address);
      if (geocoded.length > 0) {
        const result = geocoded[0];
        setLocation({
          latitude: result.latitude,
          longitude: result.longitude,
          address: address,
        });
      } else {
        Alert.alert('Error', 'Address not found');
      }
    } catch {
      Alert.alert('Error', 'Failed to geocode address');
    }
  };

  const openInMaps = () => {
    if (!location) return;

    const { latitude, longitude } = location;
    
    if (Platform.OS === 'ios') {
      const url = `maps://maps.apple.com/?q=${latitude},${longitude}`;
      Linking.openURL(url);
    } else if (Platform.OS === 'android') {
      const url = `geo:${latitude},${longitude}`;
      Linking.openURL(url);
    } else {
      const url = `https://maps.google.com/?q=${latitude},${longitude}`;
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.searchContainer}>
        <ThemedText type="title">Maps App</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Enter an address..."
          value={address}
          onChangeText={setAddress}
          onSubmitEditing={searchAddress}
        />
        <Button title="Search" onPress={searchAddress} />
      </ThemedView>
      <View style={styles.resultContainer}>
        {location ? (
          <View style={styles.locationResult}>
            <ThemedText type="subtitle">Location Found!</ThemedText>
            <ThemedText>Address: {location.address}</ThemedText>
            <ThemedText>Latitude: {location.latitude.toFixed(6)}</ThemedText>
            <ThemedText>Longitude: {location.longitude.toFixed(6)}</ThemedText>
            <TouchableOpacity style={styles.mapButton} onPress={openInMaps}>
              <ThemedText style={styles.mapButtonText}>
                📍 Open in {Platform.OS === 'ios' ? 'Apple Maps' : Platform.OS === 'android' ? 'Google Maps' : 'Maps'}
              </ThemedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <ThemedText>Enter an address above to search for its location</ThemedText>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  resultContainer: {
    flex: 1,
    padding: 16,
  },
  locationResult: {
    backgroundColor: '#e8f5e8',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapButton: {
    marginTop: 12,
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
