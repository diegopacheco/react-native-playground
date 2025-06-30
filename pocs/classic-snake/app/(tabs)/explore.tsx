import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      <ThemedText>Project dependencies and information.</ThemedText>
      <Collapsible title="Dependencies">
        <ThemedView style={styles.tableContainer}>
          <ThemedView style={styles.tableHeader}>
            <ThemedText type="defaultSemiBold" style={styles.tableHeaderCell}>Package</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.tableHeaderCell}>Version</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>@expo/vector-icons</ThemedText>
            <ThemedText style={styles.tableCell}>^14.1.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>@react-navigation/bottom-tabs</ThemedText>
            <ThemedText style={styles.tableCell}>^7.3.10</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>@react-navigation/elements</ThemedText>
            <ThemedText style={styles.tableCell}>^2.3.8</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>@react-navigation/native</ThemedText>
            <ThemedText style={styles.tableCell}>^7.1.6</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo</ThemedText>
            <ThemedText style={styles.tableCell}>~53.0.13</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-blur</ThemedText>
            <ThemedText style={styles.tableCell}>~14.1.5</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-constants</ThemedText>
            <ThemedText style={styles.tableCell}>~17.1.6</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-font</ThemedText>
            <ThemedText style={styles.tableCell}>~13.3.1</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-haptics</ThemedText>
            <ThemedText style={styles.tableCell}>~14.1.4</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-image</ThemedText>
            <ThemedText style={styles.tableCell}>~2.3.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-linking</ThemedText>
            <ThemedText style={styles.tableCell}>~7.1.5</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-router</ThemedText>
            <ThemedText style={styles.tableCell}>~5.1.1</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-splash-screen</ThemedText>
            <ThemedText style={styles.tableCell}>~0.30.9</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-status-bar</ThemedText>
            <ThemedText style={styles.tableCell}>~2.2.3</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-symbols</ThemedText>
            <ThemedText style={styles.tableCell}>~0.4.5</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-system-ui</ThemedText>
            <ThemedText style={styles.tableCell}>~5.0.9</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>expo-web-browser</ThemedText>
            <ThemedText style={styles.tableCell}>~14.2.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react</ThemedText>
            <ThemedText style={styles.tableCell}>19.0.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-dom</ThemedText>
            <ThemedText style={styles.tableCell}>19.0.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native</ThemedText>
            <ThemedText style={styles.tableCell}>0.79.4</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native-gesture-handler</ThemedText>
            <ThemedText style={styles.tableCell}>~2.24.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native-reanimated</ThemedText>
            <ThemedText style={styles.tableCell}>~3.17.4</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native-safe-area-context</ThemedText>
            <ThemedText style={styles.tableCell}>5.4.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native-screens</ThemedText>
            <ThemedText style={styles.tableCell}>~4.11.1</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native-web</ThemedText>
            <ThemedText style={styles.tableCell}>~0.20.0</ThemedText>
          </ThemedView>
          <ThemedView style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>react-native-webview</ThemedText>
            <ThemedText style={styles.tableCell}>13.13.5</ThemedText>
          </ThemedView>
        </ThemedView>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tableContainer: {
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
    marginBottom: 4,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
  },
});
