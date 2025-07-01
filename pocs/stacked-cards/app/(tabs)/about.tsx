import { StyleSheet } from 'react-native';
import packageJson from '../../package.json';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function AboutScreen() {
  const dependencies = Object.entries(packageJson.dependencies);
  const devDependencies = Object.entries(packageJson.devDependencies);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="info.circle.fill"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">About</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.appInfo}>
        {packageJson.name} v{packageJson.version}
      </ThemedText>
      
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Dependencies</ThemedText>
        <ThemedView style={styles.table}>
          <ThemedView style={styles.tableHeader}>
            <ThemedText style={[styles.tableHeaderText, styles.packageColumn]}>Package</ThemedText>
            <ThemedText style={[styles.tableHeaderText, styles.versionColumn]}>Version</ThemedText>
          </ThemedView>
          {dependencies.map(([name, version]) => (
            <ThemedView key={name} style={styles.tableRow}>
              <ThemedText style={[styles.tableCell, styles.packageColumn]}>{name}</ThemedText>
              <ThemedText style={[styles.tableCell, styles.versionColumn]}>{version}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Dev Dependencies</ThemedText>
        <ThemedView style={styles.table}>
          <ThemedView style={styles.tableHeader}>
            <ThemedText style={[styles.tableHeaderText, styles.packageColumn]}>Package</ThemedText>
            <ThemedText style={[styles.tableHeaderText, styles.versionColumn]}>Version</ThemedText>
          </ThemedView>
          {devDependencies.map(([name, version]) => (
            <ThemedView key={name} style={styles.tableRow}>
              <ThemedText style={[styles.tableCell, styles.packageColumn]}>{name}</ThemedText>
              <ThemedText style={[styles.tableCell, styles.versionColumn]}>{version}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
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
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  appInfo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableHeaderText: {
    fontWeight: '600',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    fontSize: 14,
  },
  packageColumn: {
    flex: 2,
  },
  versionColumn: {
    flex: 1,
    textAlign: 'right',
  },
});