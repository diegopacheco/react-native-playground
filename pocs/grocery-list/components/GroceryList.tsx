import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface GroceryItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function GroceryList() {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [inputText, setInputText] = useState('');

  const addItem = () => {
    if (inputText.trim()) {
      const newItem: GroceryItem = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
      };
      setItems([...items, newItem]);
      setInputText('');
    }
  };

  const toggleItem = (id: string) => {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );
      return updatedItems.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
      });
    });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: GroceryItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[styles.checkBox, item.completed && styles.checkBoxCompleted]}
        onPress={() => toggleItem(item.id)}
      >
        {item.completed && <ThemedText style={styles.checkMark}>✓</ThemedText>}
      </TouchableOpacity>
      <ThemedText style={[styles.itemText, item.completed && styles.completedText]}>
        {item.text}
      </ThemedText>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <ThemedText style={styles.deleteText}>×</ThemedText>
      </TouchableOpacity>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Grocery List</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add grocery item..."
          onSubmitEditing={addItem}
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <ThemedText style={styles.addButtonText}>Add</ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxCompleted: {
    backgroundColor: '#007AFF',
  },
  checkMark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  deleteText: {
    fontSize: 20,
    color: '#FF3B30',
  },
});