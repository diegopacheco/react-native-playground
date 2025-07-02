import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, FlatList, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export default function TodoList() {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const addItem = () => {
    if (inputText.trim()) {
      const newItem: TodoItem = {
        id: Date.now().toString(),
        text: inputText.trim(),
        completed: false,
        priority: selectedPriority,
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
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    });
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF3B30';
      case 'medium': return '#FF9500';
      case 'low': return '#34C759';
      default: return '#007AFF';
    }
  };

  const renderItem = ({ item }: { item: TodoItem }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[styles.checkBox, item.completed && styles.checkBoxCompleted]}
        onPress={() => toggleItem(item.id)}
      >
        {item.completed && <ThemedText style={styles.checkMark}>✓</ThemedText>}
      </TouchableOpacity>
      <View style={styles.itemContent}>
        <ThemedText style={[styles.itemText, item.completed && styles.completedText]}>
          {item.text}
        </ThemedText>
        <View style={[styles.priorityTag, { backgroundColor: getPriorityColor(item.priority) }]}>
          <ThemedText style={styles.priorityText}>{item.priority}</ThemedText>
        </View>
      </View>
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
      <ThemedText style={styles.title}>Todo List</ThemedText>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Add todo item..."
          onSubmitEditing={addItem}
        />
        
        <View style={styles.priorityContainer}>
          {(['low', 'medium', 'high'] as const).map((priority) => (
            <TouchableOpacity
              key={priority}
              style={[
                styles.priorityButton,
                { backgroundColor: getPriorityColor(priority) },
                selectedPriority === priority && styles.selectedPriority
              ]}
              onPress={() => setSelectedPriority(priority)}
            >
              <ThemedText style={styles.priorityButtonText}>
                {priority[0].toUpperCase()}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        
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
    alignItems: 'center',
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
  priorityContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  priorityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPriority: {
    borderWidth: 2,
    borderColor: '#000',
  },
  priorityButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  priorityTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 50,
    alignItems: 'center',
  },
  priorityText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
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