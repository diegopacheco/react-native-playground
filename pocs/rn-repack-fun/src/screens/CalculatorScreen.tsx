import React, { Suspense } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { createRemoteLazyComponent } from '../utils/RemoteComponentLoader';

const Calculator = createRemoteLazyComponent('Calculator');

export default function CalculatorScreen() {
  return (
    <View style={styles.container}>
      <Suspense
        fallback={
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading Calculator...</Text>
          </View>
        }
      >
        <Calculator />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#FFF',
  },
});
