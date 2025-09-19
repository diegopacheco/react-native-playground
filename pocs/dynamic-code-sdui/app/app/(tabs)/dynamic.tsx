import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ApiService, Page } from '../../services/api';
import DynamicRenderer from '../../components/DynamicRenderer';

const pageOptions = [
  { key: 'header', label: 'Header' },
  { key: 'footer', label: 'Footer' },
  { key: 'page_calculator', label: 'Calculator' },
  { key: 'page_note_page', label: 'Notes' },
  { key: 'page_info', label: 'Info' },
];

export default function DynamicPage() {
  const insets = useSafeAreaInsets();
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPageKey, setSelectedPageKey] = useState<string>('page_calculator');

  useEffect(() => {
    loadPage(selectedPageKey);
  }, [selectedPageKey]);

  const loadPage = async (pageName: string) => {
    setLoading(true);
    try {
      const page = await ApiService.fetchPage(pageName);
      setCurrentPage(page);
    } catch (error) {
      Alert.alert('Error', 'Failed to load page. Make sure the backend server is running on localhost:8080');
      console.error('Failed to load page:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Page selector */}
      <View style={styles.pageSelector}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {pageOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.pageButton,
                selectedPageKey === option.key && styles.selectedPageButton
              ]}
              onPress={() => setSelectedPageKey(option.key)}
            >
              <Text style={[
                styles.pageButtonText,
                selectedPageKey === option.key && styles.selectedPageButtonText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Dynamic content */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : currentPage ? (
          <DynamicRenderer components={currentPage.components} />
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No page loaded</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageSelector: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pageButton: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
  },
  selectedPageButton: {
    backgroundColor: '#007AFF',
  },
  pageButtonText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  selectedPageButtonText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
  },
});