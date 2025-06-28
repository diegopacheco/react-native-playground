import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

interface FormData {
  id: string;
  name: string;
  age: string;
  dob: Date | null;
  email: string;
}

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [formData, setFormData] = useState<FormData>({
    id: '',
    name: '',
    age: '',
    dob: null,
    email: '',
  });
  const [dataList, setDataList] = useState<FormData[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      age: '',
      dob: null,
      email: '',
    });
    setEditingId(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Name is required');
      return false;
    }
    if (!formData.age.trim() || isNaN(Number(formData.age))) {
      Alert.alert('Error', 'Please enter a valid age');
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return false;
    }
    return true;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

    if (editingId) {
      setDataList(prev => 
        prev.map(item => 
          item.id === editingId 
            ? { ...formData, id: editingId }
            : item
        )
      );
    } else {
      const newItem: FormData = {
        ...formData,
        id: Date.now().toString(),
      };
      setDataList(prev => [...prev, newItem]);
    }
    
    resetForm();
    Alert.alert('Success', editingId ? 'Data updated successfully!' : 'Data added successfully!');
  };

  const handleEdit = (item: FormData) => {
    setFormData(item);
    setEditingId(item.id);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData(prev => ({ ...prev, dob: selectedDate }));
    }
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return 'Select Date';
    return date.toLocaleDateString();
  };

  const renderItem = ({ item }: { item: FormData }) => (
    <TouchableOpacity 
      style={[styles.listItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      onPress={() => handleEdit(item)}
    >
      <ThemedText style={styles.listItemText}>
        <ThemedText type="defaultSemiBold">{item.name}</ThemedText> (Age: {item.age})
      </ThemedText>
      <ThemedText style={styles.listItemEmail}>{item.email}</ThemedText>
      {item.dob && (
        <ThemedText style={styles.listItemDate}>DOB: {formatDate(item.dob)}</ThemedText>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>
          {editingId ? 'Edit Entry' : 'User Form'}
        </ThemedText>
        
        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Name *</ThemedText>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].text,
                color: Colors[colorScheme ?? 'light'].text,
              }
            ]}
            value={formData.name}
            onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
            placeholder="Enter name"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Age *</ThemedText>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].text,
                color: Colors[colorScheme ?? 'light'].text,
              }
            ]}
            value={formData.age}
            onChangeText={(text) => setFormData(prev => ({ ...prev, age: text }))}
            placeholder="Enter age"
            keyboardType="numeric"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          />
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Date of Birth</ThemedText>
          <TouchableOpacity
            style={[
              styles.input, 
              styles.dateButton,
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].text,
              }
            ]}
            onPress={() => setShowDatePicker(true)}
          >
            <ThemedText style={{ 
              color: formData.dob ? Colors[colorScheme ?? 'light'].text : Colors[colorScheme ?? 'light'].tabIconDefault 
            }}>
              {formatDate(formData.dob)}
            </ThemedText>
          </TouchableOpacity>
          
          {showDatePicker && Platform.OS === 'ios' && (
            <ThemedView style={styles.datePickerContainer}>
              <DateTimePicker
                value={formData.dob || new Date()}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={new Date()}
                style={styles.datePicker}
              />
              <TouchableOpacity
                style={[styles.datePickerDone, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
                onPress={() => setShowDatePicker(false)}
              >
                <ThemedText style={styles.datePickerDoneText}>Done</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
        </ThemedView>

        {showDatePicker && Platform.OS === 'android' && (
          <DateTimePicker
            value={formData.dob || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}

        <ThemedView style={styles.inputContainer}>
          <ThemedText style={styles.label}>Email *</ThemedText>
          <TextInput
            style={[
              styles.input, 
              { 
                backgroundColor: Colors[colorScheme ?? 'light'].background,
                borderColor: Colors[colorScheme ?? 'light'].text,
                color: Colors[colorScheme ?? 'light'].text,
              }
            ]}
            value={formData.email}
            onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          />
        </ThemedView>

        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
          onPress={handleAdd}
        >
          <ThemedText style={styles.addButtonText}>
            {editingId ? 'Update' : 'Add'}
          </ThemedText>
        </TouchableOpacity>

        {editingId && (
          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={resetForm}
          >
            <ThemedText style={[styles.cancelButtonText, { color: Colors[colorScheme ?? 'light'].tint }]}>
              Cancel Edit
            </ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>

      <ThemedView style={styles.listContainer}>
        <ThemedText type="subtitle" style={styles.listTitle}>
          Entries ({dataList.length})
        </ThemedText>
        {dataList.length === 0 ? (
          <ThemedText style={styles.emptyText}>No entries yet. Add one above!</ThemedText>
        ) : (
          <FlatList
            data={dataList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            scrollEnabled={false}
          />
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  formContainer: {
    marginBottom: 24,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  dateButton: {
    justifyContent: 'center',
  },
  datePickerContainer: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  datePicker: {
    height: 120,
  },
  datePickerDone: {
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 8,
  },
  datePickerDoneText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: 'transparent',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  listTitle: {
    marginBottom: 12,
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  listItemText: {
    fontSize: 16,
    marginBottom: 4,
  },
  listItemEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 2,
  },
  listItemDate: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.6,
    marginTop: 20,
  },
});
