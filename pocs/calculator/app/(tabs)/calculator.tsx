import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CalculatorScreen() {
  const [display, setDisplay] = useState('0');
  const [previousNumber, setPreviousNumber] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousNumber(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousNumber === null) {
      setPreviousNumber(inputValue);
    } else if (operation) {
      const currentValue = previousNumber || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousNumber(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const onPressEquals = () => {
    if (operation && previousNumber !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousNumber, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousNumber(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const onPressPercent = () => {
    const inputValue = parseFloat(display);
    if (inputValue !== 0) {
      setDisplay(String(inputValue / 100));
    }
  };

  const onPressToggleSign = () => {
    const inputValue = parseFloat(display);
    if (inputValue > 0) {
      setDisplay('-' + display);
    } else if (inputValue < 0) {
      setDisplay(display.slice(1));
    }
  };

  const renderButton = (
    onPress: () => void,
    text: string,
    size?: 'normal' | 'large',
    theme?: 'primary' | 'secondary' | 'accent'
  ) => {
    const buttonStyles = [
      styles.button,
      size === 'large' && styles.buttonLarge,
      theme === 'primary' && (isDark ? styles.buttonPrimaryDark : styles.buttonPrimaryLight),
      theme === 'secondary' && (isDark ? styles.buttonSecondaryDark : styles.buttonSecondaryLight),
      theme === 'accent' && styles.buttonAccent,
    ];

    const textStyles = [
      styles.buttonText,
      theme === 'primary' && styles.buttonTextPrimary,
      theme === 'secondary' && styles.buttonTextSecondary,
      theme === 'accent' && styles.buttonTextAccent,
    ];

    return (
      <TouchableOpacity style={buttonStyles} onPress={onPress}>
        <Text style={textStyles}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.containerDark : styles.containerLight]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.displayContainer}>
        <Text style={[styles.display, isDark ? styles.displayDark : styles.displayLight]}>
          {display}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          {renderButton(clear, 'AC', 'normal', 'secondary')}
          {renderButton(onPressToggleSign, '±', 'normal', 'secondary')}
          {renderButton(onPressPercent, '%', 'normal', 'secondary')}
          {renderButton(() => performOperation('÷'), '÷', 'normal', 'accent')}
        </View>
        <View style={styles.row}>
          {renderButton(() => inputNumber('7'), '7', 'normal', 'primary')}
          {renderButton(() => inputNumber('8'), '8', 'normal', 'primary')}
          {renderButton(() => inputNumber('9'), '9', 'normal', 'primary')}
          {renderButton(() => performOperation('×'), '×', 'normal', 'accent')}
        </View>
        <View style={styles.row}>
          {renderButton(() => inputNumber('4'), '4', 'normal', 'primary')}
          {renderButton(() => inputNumber('5'), '5', 'normal', 'primary')}
          {renderButton(() => inputNumber('6'), '6', 'normal', 'primary')}
          {renderButton(() => performOperation('-'), '-', 'normal', 'accent')}
        </View>
        <View style={styles.row}>
          {renderButton(() => inputNumber('1'), '1', 'normal', 'primary')}
          {renderButton(() => inputNumber('2'), '2', 'normal', 'primary')}
          {renderButton(() => inputNumber('3'), '3', 'normal', 'primary')}
          {renderButton(() => performOperation('+'), '+', 'normal', 'accent')}
        </View>
        <View style={styles.row}>
          {renderButton(() => inputNumber('0'), '0', 'large', 'primary')}
          {renderButton(inputDecimal, '.', 'normal', 'primary')}
          {renderButton(onPressEquals, '=', 'normal', 'accent')}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  containerLight: {
    backgroundColor: '#000000',
  },
  containerDark: {
    backgroundColor: '#000000',
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  display: {
    fontSize: 70,
    fontWeight: '200',
    textAlign: 'right',
  },
  displayLight: {
    color: '#ffffff',
  },
  displayDark: {
    color: '#ffffff',
  },
  buttonContainer: {
    flex: 2,
    paddingBottom: 70,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonLarge: {
    flex: 2.3,
    paddingLeft: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '400',
  },
  buttonPrimaryLight: {
    backgroundColor: '#333333',
  },
  buttonPrimaryDark: {
    backgroundColor: '#333333',
  },
  buttonTextPrimary: {
    color: '#ffffff',
  },
  buttonSecondaryLight: {
    backgroundColor: '#a6a6a6',
  },
  buttonSecondaryDark: {
    backgroundColor: '#a6a6a6',
  },
  buttonTextSecondary: {
    color: '#000000',
  },
  buttonAccent: {
    backgroundColor: '#ff9500',
  },
  buttonTextAccent: {
    color: '#ffffff',
  },
});
