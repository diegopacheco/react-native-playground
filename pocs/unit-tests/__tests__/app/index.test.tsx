import React from 'react';
import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import HomeScreen from '../../app/(tabs)/index';

// Mock all the components
jest.mock('@/components/HelloWave', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    HelloWave: () => mockReact.createElement(View, { testID: 'hello-wave' }),
  };
});

jest.mock('@/components/ParallaxScrollView', () => {
  const mockReact = require('react');
  const { ScrollView } = require('react-native');
  return {
    __esModule: true,
    default: ({ children, ...props }: any) => 
      mockReact.createElement(ScrollView, { testID: 'parallax-scroll-view', ...props }, children),
  };
});

jest.mock('@/components/ThemedText', () => {
  const mockReact = require('react');
  const { Text } = require('react-native');
  return {
    ThemedText: ({ children, type, ...props }: any) => 
      mockReact.createElement(Text, { testID: `themed-text-${type || 'default'}`, ...props }, children),
  };
});

jest.mock('@/components/ThemedView', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    ThemedView: ({ children, ...props }: any) => 
      mockReact.createElement(View, { testID: 'themed-view', ...props }, children),
  };
});

jest.mock('expo-image', () => ({
  Image: ({ source, ...props }: any) => {
    const mockReact = require('react');
    const { View } = require('react-native');
    return mockReact.createElement(View, { testID: 'expo-image', ...props });
  },
}));

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the welcome screen correctly', () => {
    const { getByTestId, getByText } = render(<HomeScreen />);
    
    expect(getByTestId('parallax-scroll-view')).toBeTruthy();
    expect(getByText('Welcome!')).toBeTruthy();
    expect(getByTestId('hello-wave')).toBeTruthy();
  });

  it('displays the correct step titles', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('Step 1: Try it')).toBeTruthy();
    expect(getByText('Step 2: Explore')).toBeTruthy();
    expect(getByText('Step 3: Get a fresh start')).toBeTruthy();
  });

  it('shows platform-specific developer tools shortcut', () => {
    const { getByText } = render(<HomeScreen />);
    
    const platformShortcut = Platform.select({
      ios: 'cmd + d',
      android: 'cmd + m',
      web: 'F12',
    });
    
    expect(getByText(platformShortcut!)).toBeTruthy();
  });

  it('contains instruction to edit index.tsx file', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('app/(tabs)/index.tsx')).toBeTruthy();
    expect(getByText(/Edit/)).toBeTruthy();
    expect(getByText(/to see changes/)).toBeTruthy();
  });

  it('mentions the Explore tab', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText(/Tap the Explore tab to learn more/)).toBeTruthy();
  });

  it('shows reset project instructions', () => {
    const { getByText } = render(<HomeScreen />);
    
    expect(getByText('npm run reset-project')).toBeTruthy();
    expect(getByText(/When you're ready, run/)).toBeTruthy();
    expect(getByText('app-example')).toBeTruthy();
  });

  it('has correct style structure', () => {
    const { getAllByTestId } = render(<HomeScreen />);
    
    const themedViews = getAllByTestId('themed-view');
    expect(themedViews.length).toBeGreaterThan(0);
  });

  it('renders the header image', () => {
    const { getByTestId } = render(<HomeScreen />);
    
    expect(getByTestId('parallax-scroll-view')).toBeTruthy();
  });
});