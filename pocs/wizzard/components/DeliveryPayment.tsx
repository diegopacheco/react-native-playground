import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface DeliveryPaymentProps {
  onComplete: (deliveryInfo: DeliveryInfo) => void;
  onBack: () => void;
  flavor: string;
  size: string;
  toppings: string[];
  initialDeliveryInfo?: DeliveryInfo;
}

interface DeliveryInfo {
  name: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
}

export default function DeliveryPayment({ onComplete, onBack, flavor, size, toppings, initialDeliveryInfo }: DeliveryPaymentProps) {
  const [name, setName] = useState(initialDeliveryInfo?.name || '');
  const [address, setAddress] = useState(initialDeliveryInfo?.address || '');
  const [city, setCity] = useState(initialDeliveryInfo?.city || '');
  const [zipCode, setZipCode] = useState(initialDeliveryInfo?.zipCode || '');
  const [phone, setPhone] = useState(initialDeliveryInfo?.phone || '');

  const calculateTotal = () => {
    const basePrice = size === '14' ? 12.99 : size === '15' ? 14.99 : 16.99;
    const toppingsPrice = toppings.length * 1.5;
    const tax = (basePrice + toppingsPrice) * 0.08;
    const delivery = 3.99;
    return (basePrice + toppingsPrice + tax + delivery).toFixed(2);
  };

  const handleComplete = () => {
    if (!name.trim() || !address.trim() || !city.trim() || !zipCode.trim() || !phone.trim()) {
      Alert.alert('Missing Information', 'Please fill in all delivery information fields.');
      return;
    }

    const deliveryInfo: DeliveryInfo = {
      name: name.trim(),
      address: address.trim(),
      city: city.trim(),
      zipCode: zipCode.trim(),
      phone: phone.trim(),
    };

    onComplete(deliveryInfo);
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>Order Summary & Delivery</ThemedText>
        
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Your Order</ThemedText>
          <ThemedView style={styles.orderDetails}>
            <ThemedText style={styles.orderItem}>Pizza: {flavor} ({size} inches)</ThemedText>
            <ThemedText style={styles.orderItem}>Toppings: {toppings.join(', ')}</ThemedText>
            <ThemedText style={styles.totalText}>Total: ${calculateTotal()}</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Delivery Information</ThemedText>
          
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={address}
            onChangeText={setAddress}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={zipCode}
            onChangeText={setZipCode}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor="#999"
          />
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ThemedText style={styles.backButtonText}>Back</ThemedText>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
            <ThemedText style={styles.completeButtonText}>Place Order</ThemedText>
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
  orderDetails: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  orderItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
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
  completeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});