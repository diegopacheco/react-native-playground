import React from 'react';
import TopTabNavigator from '@/components/TopTabNavigator';
import GroceryList from '@/components/GroceryList';
import TodoList from '@/components/TodoList';
import NotesApp from '@/components/NotesApp';

export default function HomeScreen() {
  const tabs = [
    { key: 'grocery', title: 'Grocery', component: GroceryList },
    { key: 'todo', title: 'Todo', component: TodoList },
    { key: 'notes', title: 'Notes', component: NotesApp },
  ];

  return <TopTabNavigator tabs={tabs} />;
}