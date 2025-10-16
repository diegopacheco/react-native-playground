import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const packageJson = require('../../../package.json');

const FooterContentPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Version: {packageJson.version}</Text>
      <Text style={styles.text}>Powered by Repack</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: '#666',
    marginVertical: 2,
  },
});

export default FooterContentPage;
