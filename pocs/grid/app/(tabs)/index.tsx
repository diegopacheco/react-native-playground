import { Image } from 'expo-image';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CatFact {
  id: string;
  fact: string;
  date: string;
}

export default function HomeScreen() {
  const [catFacts, setCatFacts] = useState<CatFact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCatFact = async (): Promise<{ fact: string; length: number } | null> => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cat fact:', error);
      return null;
    }
  };

  const fetchAllCatFacts = useCallback(async () => {
    setLoading(true);
    try {
      const promises = Array.from({ length: 5 }, () => fetchCatFact());
      const results = await Promise.all(promises);
      
      const validFacts = results.filter((result): result is { fact: string; length: number } => 
        result !== null
      );

      if (validFacts.length === 0) {
        Alert.alert('Error', 'Failed to fetch cat facts. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const factsWithIds: CatFact[] = validFacts.map((result, index) => ({
        id: `fact-${Date.now()}-${index}`,
        fact: result.fact,
        date: new Date().toLocaleDateString(),
      }));

      setCatFacts(factsWithIds);
    } catch (error) {
      console.error('Error fetching cat facts:', error);
      Alert.alert('Error', 'Failed to fetch cat facts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCatFacts();
  }, [fetchAllCatFacts]);

  const renderCatFactItem = ({ item }: { item: CatFact }) => (
    <ThemedView style={styles.gridItem}>
      <ThemedView style={styles.tableRow}>
        <ThemedView style={[styles.tableCell, styles.idCell]}>
          <ThemedText style={styles.cellText} numberOfLines={1}>{item.id}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.tableCell, styles.dateCell]}>
          <ThemedText style={styles.cellText}>{item.date}</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.tableCell, styles.factCell]}>
          <ThemedText style={styles.cellText}>{item.fact}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Cat Facts Grid</ThemedText>
      </ThemedView>
      <ThemedView style={styles.gridContainer}>
        {loading ? (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText>Loading cat facts...</ThemedText>
          </ThemedView>
        ) : (
          <>
            <ThemedView style={styles.refreshContainer}>
              <ThemedText 
                style={styles.refreshButton} 
                onPress={fetchAllCatFacts}
                type="defaultSemiBold"
              >
                Refresh Facts
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.headerRow}>
              <ThemedView style={styles.tableRow}>
                <ThemedView style={[styles.tableCell, styles.idCell]}>
                  <ThemedText type="defaultSemiBold" style={styles.headerText}>ID</ThemedText>
                </ThemedView>
                <ThemedView style={[styles.tableCell, styles.dateCell]}>
                  <ThemedText type="defaultSemiBold" style={styles.headerText}>Date</ThemedText>
                </ThemedView>
                <ThemedView style={[styles.tableCell, styles.factCell]}>
                  <ThemedText type="defaultSemiBold" style={styles.headerText}>Fact</ThemedText>
                </ThemedView>
              </ThemedView>
            </ThemedView>
            <FlatList
              data={catFacts}
              renderItem={renderCatFactItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContainer}
            />
          </>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  gridContainer: {
    flex: 1,
    minHeight: 400,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 40,
  },
  refreshContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  headerRow: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tableCell: {
    paddingHorizontal: 8,
  },
  idCell: {
    flex: 2,
  },
  dateCell: {
    flex: 1,
  },
  factCell: {
    flex: 4,
  },
  gridItem: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  headerText: {
    fontSize: 16,
    textAlign: 'center',
  },
  cellText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
