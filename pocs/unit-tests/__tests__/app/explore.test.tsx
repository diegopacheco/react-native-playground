import React from 'react';
import { render } from '@testing-library/react-native';
import { Platform } from 'react-native';
import TabTwoScreen from '../../app/(tabs)/explore';

// Mock all the components
jest.mock('@/components/Collapsible', () => {
  const mockReact = require('react');
  const { View, Text } = require('react-native');
  return {
    Collapsible: ({ title, children }: any) => 
      mockReact.createElement(View, { testID: 'collapsible' }, [
        mockReact.createElement(Text, { key: 'title', testID: 'collapsible-title' }, title),
        mockReact.createElement(View, { key: 'content', testID: 'collapsible-content' }, children)
      ]),
  };
});

jest.mock('@/components/ExternalLink', () => {
  const mockReact = require('react');
  const { TouchableOpacity } = require('react-native');
  return {
    ExternalLink: ({ children, href, ...props }: any) => 
      mockReact.createElement(TouchableOpacity, { testID: 'external-link', ...props }, children),
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
    ThemedText: ({ children, type, style, ...props }: any) => 
      mockReact.createElement(Text, { testID: `themed-text-${type || 'default'}`, style, ...props }, children),
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

jest.mock('@/components/ui/IconSymbol', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    IconSymbol: ({ name, size, color, ...props }: any) => 
      mockReact.createElement(View, { testID: 'icon-symbol', ...props }),
  };
});

jest.mock('expo-image', () => ({
  Image: ({ source, ...props }: any) => {
    const mockReact = require('react');
    const { View } = require('react-native');
    return mockReact.createElement(View, { testID: 'expo-image', ...props });
  },
}));

describe('TabTwoScreen (Explore)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the explore screen correctly', () => {
    const { getByTestId, getByText } = render(<TabTwoScreen />);
    
    expect(getByTestId('parallax-scroll-view')).toBeTruthy();
    expect(getByText('Explore')).toBeTruthy();
  });

  it('displays the intro text', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('This app includes example code to help you get started.')).toBeTruthy();
  });

  it('shows all collapsible sections', () => {
    const { getAllByTestId, getByText } = render(<TabTwoScreen />);
    
    const collapsibles = getAllByTestId('collapsible');
    expect(collapsibles.length).toBe(6);
    
    // Check section titles
    expect(getByText('File-based routing')).toBeTruthy();
    expect(getByText('Android, iOS, and web support')).toBeTruthy();
    expect(getByText('Images')).toBeTruthy();
    expect(getByText('Custom fonts')).toBeTruthy();
    expect(getByText('Light and dark mode components')).toBeTruthy();
    expect(getByText('Animations')).toBeTruthy();
  });

  it('mentions the correct file paths in routing section', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('app/(tabs)/index.tsx')).toBeTruthy();
    expect(getByText('app/(tabs)/explore.tsx')).toBeTruthy();
    expect(getByText('app/(tabs)/_layout.tsx')).toBeTruthy();
  });

  it('shows platform-specific content correctly', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('w')).toBeTruthy(); // web version shortcut
    expect(getByText(/You can open this project on Android, iOS, and the web/)).toBeTruthy();
  });

  it('mentions image density suffixes', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('@2x')).toBeTruthy();
    expect(getByText('@3x')).toBeTruthy();
  });

  it('references custom font loading', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('app/_layout.tsx')).toBeTruthy();
    expect(getByText(/custom fonts such as this one/)).toBeTruthy();
  });

  it('explains color scheme functionality', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('useColorScheme()')).toBeTruthy();
    expect(getByText(/light and dark mode support/)).toBeTruthy();
  });

  it('mentions animation components', () => {
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('components/HelloWave.tsx')).toBeTruthy();
    expect(getByText('react-native-reanimated')).toBeTruthy();
  });

  it('shows iOS-specific parallax content when on iOS', () => {
    // Mock Platform.select to return iOS content
    const originalSelect = Platform.select;
    Platform.select = jest.fn().mockImplementation((obj) => obj.ios);
    
    const { getByText } = render(<TabTwoScreen />);
    
    expect(getByText('components/ParallaxScrollView.tsx')).toBeTruthy();
    
    // Restore original Platform.select
    Platform.select = originalSelect;
  });

  it('includes external links', () => {
    const { getAllByTestId } = render(<TabTwoScreen />);
    
    const externalLinks = getAllByTestId('external-link');
    expect(externalLinks.length).toBeGreaterThan(0);
  });

  it('renders all visual elements', () => {
    const { getByTestId } = render(<TabTwoScreen />);
    
    expect(getByTestId('parallax-scroll-view')).toBeTruthy();
  });
});