import { Colors } from '../../constants/Colors';

describe('Colors', () => {
  it('has light theme colors defined', () => {
    expect(Colors.light).toBeDefined();
    expect(Colors.light.text).toBe('#11181C');
    expect(Colors.light.background).toBe('#fff');
    expect(Colors.light.tint).toBe('#0a7ea4');
    expect(Colors.light.icon).toBe('#687076');
    expect(Colors.light.tabIconDefault).toBe('#687076');
    expect(Colors.light.tabIconSelected).toBe('#0a7ea4');
  });

  it('has dark theme colors defined', () => {
    expect(Colors.dark).toBeDefined();
    expect(Colors.dark.text).toBe('#ECEDEE');
    expect(Colors.dark.background).toBe('#151718');
    expect(Colors.dark.tint).toBe('#fff');
    expect(Colors.dark.icon).toBe('#9BA1A6');
    expect(Colors.dark.tabIconDefault).toBe('#9BA1A6');
    expect(Colors.dark.tabIconSelected).toBe('#fff');
  });

  it('has consistent color properties between light and dark themes', () => {
    const lightKeys = Object.keys(Colors.light);
    const darkKeys = Object.keys(Colors.dark);
    
    expect(lightKeys.sort()).toEqual(darkKeys.sort());
  });

  it('has valid hex color values', () => {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$|^#[A-Fa-f0-9]{6}$|^[a-z]+$/;
    
    Object.values(Colors.light).forEach(color => {
      expect(color).toMatch(hexColorRegex);
    });
    
    Object.values(Colors.dark).forEach(color => {
      expect(color).toMatch(hexColorRegex);
    });
  });
});