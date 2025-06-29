import { renderHook } from '@testing-library/react-native';
import { useColorScheme as useColorSchemeHook } from '../../hooks/useColorScheme';

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(),
}));

const mockReactNativeUseColorScheme = require('react-native').useColorScheme;

describe('useColorScheme', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns light when react-native useColorScheme returns light', () => {
    mockReactNativeUseColorScheme.mockReturnValue('light');
    
    const { result } = renderHook(() => useColorSchemeHook());
    
    expect(result.current).toBe('light');
  });

  it('returns dark when react-native useColorScheme returns dark', () => {
    mockReactNativeUseColorScheme.mockReturnValue('dark');
    
    const { result } = renderHook(() => useColorSchemeHook());
    
    expect(result.current).toBe('dark');
  });

  it('returns null when react-native useColorScheme returns null', () => {
    mockReactNativeUseColorScheme.mockReturnValue(null);
    
    const { result } = renderHook(() => useColorSchemeHook());
    
    expect(result.current).toBe(null);
  });

  it('returns undefined when react-native useColorScheme returns undefined', () => {
    mockReactNativeUseColorScheme.mockReturnValue(undefined);
    
    const { result } = renderHook(() => useColorSchemeHook());
    
    expect(result.current).toBe(undefined);
  });
});