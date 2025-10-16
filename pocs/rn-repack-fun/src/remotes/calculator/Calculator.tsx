import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<string | null>(null);

  const handleNumberPress = (num: string) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationPress = (op: string) => {
    setPreviousValue(display);
    setOperation(op);
    setDisplay('0');
  };

  const handleEquals = () => {
    if (previousValue && operation) {
      const prev = parseFloat(previousValue);
      const current = parseFloat(display);
      let result = 0;

      switch (operation) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '×':
          result = prev * current;
          break;
        case '÷':
          result = current !== 0 ? prev / current : 0;
          break;
      }

      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  const Button = ({ text, onPress, style }: any) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.display}>{display}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.row}>
          <Button text="7" onPress={() => handleNumberPress('7')} />
          <Button text="8" onPress={() => handleNumberPress('8')} />
          <Button text="9" onPress={() => handleNumberPress('9')} />
          <Button text="÷" onPress={() => handleOperationPress('÷')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button text="4" onPress={() => handleNumberPress('4')} />
          <Button text="5" onPress={() => handleNumberPress('5')} />
          <Button text="6" onPress={() => handleNumberPress('6')} />
          <Button text="×" onPress={() => handleOperationPress('×')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button text="1" onPress={() => handleNumberPress('1')} />
          <Button text="2" onPress={() => handleNumberPress('2')} />
          <Button text="3" onPress={() => handleNumberPress('3')} />
          <Button text="-" onPress={() => handleOperationPress('-')} style={styles.operationButton} />
        </View>

        <View style={styles.row}>
          <Button text="C" onPress={handleClear} style={styles.clearButton} />
          <Button text="0" onPress={() => handleNumberPress('0')} />
          <Button text="=" onPress={handleEquals} style={styles.equalsButton} />
          <Button text="+" onPress={() => handleOperationPress('+')} style={styles.operationButton} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    padding: 20,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  display: {
    fontSize: 64,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  buttonContainer: {
    flex: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#505050',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 6,
  },
  buttonText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  operationButton: {
    backgroundColor: '#FF9500',
  },
  clearButton: {
    backgroundColor: '#D4D4D2',
  },
  equalsButton: {
    backgroundColor: '#34C759',
  },
});

export default Calculator;
