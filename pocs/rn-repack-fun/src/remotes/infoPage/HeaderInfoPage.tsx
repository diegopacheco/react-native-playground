import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeaderInfoPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>App Information</Text>
      <Text style={styles.subtitle}>Dependencies and Configuration</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E5E5EA',
  },
});

export default HeaderInfoPage;
