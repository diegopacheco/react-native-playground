import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface Tab {
  key: string;
  title: string;
  component: React.ComponentType;
}

interface TopTabNavigatorProps {
  tabs: Tab[];
}

export default function TopTabNavigator({ tabs }: TopTabNavigatorProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '');
  const colorScheme = useColorScheme();
  
  const ActiveComponent = tabs.find(tab => tab.key === activeTab)?.component;

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.tabBar, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              styles.tab,
              activeTab === tab.key && { 
                borderBottomColor: Colors[colorScheme ?? 'light'].tint,
                borderBottomWidth: 3,
              }
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <ThemedText style={[
              styles.tabText,
              activeTab === tab.key && { 
                color: Colors[colorScheme ?? 'light'].tint,
                fontWeight: 'bold'
              }
            ]}>
              {tab.title}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
      
      <ThemedView style={styles.content}>
        {ActiveComponent && <ActiveComponent />}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  tabText: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
});