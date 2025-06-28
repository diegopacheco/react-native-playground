import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function AboutScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About Calculator</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Built with React Native</ThemedText>
        <ThemedText>
          This calculator app is built using React Native version 0.79.4, providing a native iOS-like calculator experience across platforms.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Features</ThemedText>
        <ThemedText>
          • Basic arithmetic operations (+, -, ×, ÷){'\n'}
          • Percentage calculations{'\n'}
          • Sign toggle (+/-){'\n'}
          • Decimal number support{'\n'}
          • Clear function (AC){'\n'}
          • iPhone calculator-inspired design
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Technology Stack</ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">React Native 0.79.4</ThemedText> - Cross-platform mobile development{'\n'}
          • <ThemedText type="defaultSemiBold">Expo ~53.0.13</ThemedText> - Development platform{'\n'}
          • <ThemedText type="defaultSemiBold">TypeScript</ThemedText> - Type-safe JavaScript{'\n'}
          • <ThemedText type="defaultSemiBold">Expo Router</ThemedText> - File-based navigation
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Design</ThemedText>
        <ThemedText>
          The calculator follows Apple&apos;s iOS calculator design principles with:
          {'\n'}• Dark theme optimized interface
          {'\n'}• Rounded buttons with appropriate sizing
          {'\n'}• Color-coded button categories
          {'\n'}• Large, readable display
          {'\n'}• Responsive touch interactions
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Developer Info</ThemedText>
        <ThemedText>
          Created as part of a React Native playground project to demonstrate mobile app development capabilities and calculator logic implementation.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
    height: 200,
    width: 200,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
