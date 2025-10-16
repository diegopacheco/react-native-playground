import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const packageJson = require('../../../package.json');

const ContentInfoPage = () => {
  const reactDependencies = Object.entries(packageJson.dependencies || {})
    .filter(([name]) => name.includes('react'))
    .map(([name, version]) => ({ name, version: String(version), key: name }));

  const repackPlugins = [
    { name: '@callstack/repack', version: packageJson.devDependencies['@callstack/repack'], key: 'repack' },
  ];

  const renderDependency = ({ item }: { item: { name: string; version: string } }) => (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemVersion}>{item.version}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>React Dependencies</Text>
        <FlatList
          data={reactDependencies}
          renderItem={renderDependency}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Repack Plugins</Text>
        <FlatList
          data={repackPlugins}
          renderItem={renderDependency}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    flex: 1,
  },
  itemVersion: {
    fontSize: 14,
    color: '#666',
  },
});

export default ContentInfoPage;
