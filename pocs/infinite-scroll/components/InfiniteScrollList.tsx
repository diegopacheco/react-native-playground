import React, { useState, useCallback } from 'react';
import { FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';

interface ListItem {
  id: string;
  title: string;
  description: string;
}

interface InfiniteScrollListProps {
  itemsPerPage?: number;
}

export default function InfiniteScrollList({ itemsPerPage = 10 }: InfiniteScrollListProps) {
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const generateMockData = useCallback((pageNum: number, limit: number): ListItem[] => {
    const items: ListItem[] = [];
    const start = pageNum * limit;
    
    for (let i = start; i < start + limit; i++) {
      items.push({
        id: `item-${i}`,
        title: `Item ${i + 1}`,
        description: `This is the description for item ${i + 1}. Lorem ipsum dolor sit amet.`
      });
    }
    
    return items;
  }, []);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newData = generateMockData(0, itemsPerPage);
      setData(newData);
      setPage(1);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  }, [generateMockData, itemsPerPage]);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newData = generateMockData(page, itemsPerPage);
      
      if (page >= 10) {
        setHasMore(false);
      }
      
      setData(prevData => [...prevData, ...newData]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, generateMockData, itemsPerPage]);

  React.useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const renderItem = ({ item }: { item: ListItem }) => (
    <ThemedView style={styles.itemContainer}>
      <ThemedText type="subtitle" style={styles.itemTitle}>
        {item.title}
      </ThemedText>
      <ThemedText style={styles.itemDescription}>
        {item.description}
      </ThemedText>
    </ThemedView>
  );

  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" />
        <ThemedText style={styles.loadingText}>Loading more items...</ThemedText>
      </View>
    );
  };

  const renderEmptyComponent = () => {
    if (loading) {
      return (
        <View style={styles.emptyContainer}>
          <ActivityIndicator size="large" />
          <ThemedText style={styles.loadingText}>Loading...</ThemedText>
        </View>
      );
    }
    
    return (
      <View style={styles.emptyContainer}>
        <ThemedText>No items to display</ThemedText>
      </View>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={data.length === 0 ? styles.emptyContentContainer : undefined}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  itemTitle: {
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  footerLoader: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyContentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});