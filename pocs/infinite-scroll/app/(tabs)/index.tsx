import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import InfiniteScrollList from '@/components/InfiniteScrollList';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Infinite Scroll Demo</ThemedText>
        <ThemedText style={styles.subtitle}>
          Pull down to refresh, scroll to load more items
        </ThemedText>
      </ThemedView>
      <InfiniteScrollList itemsPerPage={15} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  subtitle: {
    marginTop: 8,
    opacity: 0.8,
    textAlign: 'center',
  },
});
