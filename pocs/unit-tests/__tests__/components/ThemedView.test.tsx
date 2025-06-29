import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ThemedView } from '../../components/ThemedView';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#ffffff'),
}));

describe('ThemedView', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <ThemedView>
        <Text>Child content</Text>
      </ThemedView>
    );
    expect(getByText('Child content')).toBeTruthy();
  });

  it('applies background color from useThemeColor', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view">
        <Text>Content</Text>
      </ThemedView>
    );
    const viewElement = getByTestId('themed-view');
    expect(viewElement.props.style).toContainEqual({
      backgroundColor: '#ffffff',
    });
  });

  it('applies custom style prop', () => {
    const customStyle = { padding: 20, margin: 10 };
    const { getByTestId } = render(
      <ThemedView testID="themed-view" style={customStyle}>
        <Text>Content</Text>
      </ThemedView>
    );
    const viewElement = getByTestId('themed-view');
    expect(viewElement.props.style).toContainEqual(customStyle);
  });

  it('forwards other props to View component', () => {
    const { getByTestId } = render(
      <ThemedView testID="test-view" accessible={true} accessibilityLabel="Test view">
        <Text>Content</Text>
      </ThemedView>
    );
    const viewElement = getByTestId('test-view');
    expect(viewElement.props.accessible).toBe(true);
    expect(viewElement.props.accessibilityLabel).toBe('Test view');
  });

  it('handles lightColor and darkColor props', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view" lightColor="#f0f0f0" darkColor="#333333">
        <Text>Content</Text>
      </ThemedView>
    );
    const viewElement = getByTestId('themed-view');
    expect(viewElement).toBeTruthy();
  });
});