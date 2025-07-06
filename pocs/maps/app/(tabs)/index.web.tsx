import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [address, setAddress] = useState('');

  const searchAddress = async () => {
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter an address');
      return;
    }

    Alert.alert('Info', 'Maps and geocoding are not supported on web. Please use the mobile app for full functionality.');
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
      <View style={styles.webMapContainer}>
        <ThemedText style={styles.infoText}>
          📱 Maps functionality is available on mobile devices only.
        </ThemedText>
        <ThemedText style={styles.infoText}>
          Please use the iOS or Android app to search for addresses and view maps.
        </ThemedText>
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
  webMapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 16,
  },
});