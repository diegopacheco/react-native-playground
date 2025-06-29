import { renderHook } from '@testing-library/react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

jest.mock('@/hooks/useColorScheme', () => ({
  useColorScheme: jest.fn(),
}));

jest.mock('@/constants/Colors', () => ({
  Colors: {
    light: {
      text: '#11181C',
      background: '#fff',
      tint: '#0a7ea4',
    },
    dark: {
      text: '#ECEDEE',
      background: '#151718',
      tint: '#fff',
    },
  },
}));

const mockUseColorScheme = require('@/hooks/useColorScheme').useColorScheme;

describe('useThemeColor', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns light color from props when theme is light', () => {
    mockUseColorScheme.mockReturnValue('light');
    
    const { result } = renderHook(() =>
      useThemeColor({ light: '#custom-light', dark: '#custom-dark' }, 'text')
    );
    
    expect(result.current).toBe('#custom-light');
  });

  it('returns dark color from props when theme is dark', () => {
    mockUseColorScheme.mockReturnValue('dark');
    
    const { result } = renderHook(() =>
      useThemeColor({ light: '#custom-light', dark: '#custom-dark' }, 'text')
    );
    
    expect(result.current).toBe('#custom-dark');
  });

  it('returns light theme color from Colors when no custom light color provided', () => {
    mockUseColorScheme.mockReturnValue('light');
    
    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    );
    
    expect(result.current).toBe('#11181C');
  });

  it('returns dark theme color from Colors when no custom dark color provided', () => {
    mockUseColorScheme.mockReturnValue('dark');
    
    const { result } = renderHook(() =>
      useThemeColor({}, 'text')
    );
    
    expect(result.current).toBe('#ECEDEE');
  });

  it('returns default light theme color when useColorScheme returns null', () => {
    mockUseColorScheme.mockReturnValue(null);
    
    const { result } = renderHook(() =>
      useThemeColor({}, 'background')
    );
    
    expect(result.current).toBe('#fff');
  });

  it('prioritizes props color over Colors constant', () => {
    mockUseColorScheme.mockReturnValue('light');
    
    const { result } = renderHook(() =>
      useThemeColor({ light: '#override-light' }, 'background')
    );
    
    expect(result.current).toBe('#override-light');
  });

  it('works with different color names', () => {
    mockUseColorScheme.mockReturnValue('light');
    
    const { result: tintResult } = renderHook(() =>
      useThemeColor({}, 'tint')
    );
    
    expect(tintResult.current).toBe('#0a7ea4');
  });
});