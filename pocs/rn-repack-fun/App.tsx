import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CalculatorScreen from './src/screens/CalculatorScreen';
import NotesScreen from './src/screens/NotesScreen';
import InfoScreen from './src/screens/InfoScreen';

const Tab = createBottomTabNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#8E8E93',
          }}
        >
          <Tab.Screen
            name="Calculator"
            component={CalculatorScreen}
            options={{ title: 'Calculator' }}
          />
          <Tab.Screen
            name="Notes"
            component={NotesScreen}
            options={{ title: 'Notes' }}
          />
          <Tab.Screen
            name="Info"
            component={InfoScreen}
            options={{ title: 'Info' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
