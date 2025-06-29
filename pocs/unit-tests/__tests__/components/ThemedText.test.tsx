import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from '../../components/ThemedText';

jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#000000'),
}));

describe('ThemedText', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    const { getByText } = render(<ThemedText>Hello World</ThemedText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders with custom text', () => {
    const { getByText } = render(<ThemedText>Custom Text</ThemedText>);
    expect(getByText('Custom Text')).toBeTruthy();
  });

  it('applies default type styles', () => {
    const { getByText } = render(<ThemedText type="default">Default Text</ThemedText>);
    const textElement = getByText('Default Text');
    expect(textElement.props.style).toContainEqual({
      fontSize: 16,
      lineHeight: 24,
    });
  });

  it('applies title type styles', () => {
    const { getByText } = render(<ThemedText type="title">Title Text</ThemedText>);
    const textElement = getByText('Title Text');
    expect(textElement.props.style).toContainEqual({
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 32,
    });
  });

  it('applies subtitle type styles', () => {
    const { getByText } = render(<ThemedText type="subtitle">Subtitle Text</ThemedText>);
    const textElement = getByText('Subtitle Text');
    expect(textElement.props.style).toContainEqual({
      fontSize: 20,
      fontWeight: 'bold',
    });
  });

  it('applies defaultSemiBold type styles', () => {
    const { getByText } = render(<ThemedText type="defaultSemiBold">SemiBold Text</ThemedText>);
    const textElement = getByText('SemiBold Text');
    expect(textElement.props.style).toContainEqual({
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '600',
    });
  });

  it('applies link type styles', () => {
    const { getByText } = render(<ThemedText type="link">Link Text</ThemedText>);
    const textElement = getByText('Link Text');
    expect(textElement.props.style).toContainEqual({
      lineHeight: 30,
      fontSize: 16,
      color: '#0a7ea4',
    });
  });

  it('applies custom style prop', () => {
    const customStyle = { marginTop: 10 };
    const { getByText } = render(
      <ThemedText style={customStyle}>Styled Text</ThemedText>
    );
    const textElement = getByText('Styled Text');
    expect(textElement.props.style).toContainEqual(customStyle);
  });

  it('forwards other props to Text component', () => {
    const { getByText } = render(
      <ThemedText testID="test-text" numberOfLines={2}>
        Text with props
      </ThemedText>
    );
    const textElement = getByText('Text with props');
    expect(textElement.props.testID).toBe('test-text');
    expect(textElement.props.numberOfLines).toBe(2);
  });
});