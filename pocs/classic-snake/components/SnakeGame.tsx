import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const GRID_SIZE = 15;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: -1 };
const GAME_SPEED = 400;

interface Position {
  x: number;
  y: number;
}

interface Direction {
  x: number;
  y: number;
}

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  const { width: screenWidth } = Dimensions.get('window');
  const cellSize = Math.floor((screenWidth - 80) / GRID_SIZE);
  const boardSize = cellSize * GRID_SIZE;

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameTime(0);
    setGameRunning(false);
  };

  const startGame = () => {
    resetGame();
    setGameRunning(true);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || !gameRunning) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, gameRunning, generateFood]);

  useEffect(() => {
    if (gameRunning && !gameOver) {
      const gameInterval = setInterval(moveSnake, GAME_SPEED);
      return () => clearInterval(gameInterval);
    }
  }, [moveSnake, gameRunning, gameOver]);

  useEffect(() => {
    if (gameRunning && !gameOver) {
      const timerInterval = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [gameRunning, gameOver]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDirectionChange = (newDirection: Direction) => {
    if (!gameRunning || gameOver) return;
    if (
      (newDirection.x === -direction.x && newDirection.y === -direction.y)
    ) {
      return;
    }
    
    setDirection(newDirection);
  };

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isHead = snake[0]?.x === x && snake[0]?.y === y;
        
        cells.push(
          <View
            key={`${x}-${y}`}
            style={[
              styles.cell,
              {
                width: cellSize,
                height: cellSize,
                backgroundColor: isFood ? '#ff6b6b' : isSnake ? (isHead ? '#2ecc71' : '#27ae60') : '#ecf0f1',
                left: x * cellSize,
                top: y * cellSize,
                borderRightWidth: x === GRID_SIZE - 1 ? 3 : 0.5,
                borderBottomWidth: y === GRID_SIZE - 1 ? 3 : 0.5,
                borderRightColor: x === GRID_SIZE - 1 ? '#2c3e50' : '#bdc3c7',
                borderBottomColor: y === GRID_SIZE - 1 ? '#2c3e50' : '#bdc3c7',
              },
            ]}
          />
        );
      }
    }
    return cells;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ThemedView style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.scoreText}>Score: {score}</ThemedText>
          <ThemedText style={styles.timerText}>Time: {formatTime(gameTime)}</ThemedText>
        </View>

        <View style={styles.gameWrapper}>
          <View style={[styles.gameBoard, { width: boardSize, height: boardSize }]}>
            {renderGrid()}
          </View>
        </View>

        {!gameRunning && (
          <SafeAreaView style={styles.overlay}>
            <View style={styles.overlayContent}>
              {gameOver ? (
                <>
                  <ThemedText style={styles.gameOverText}>Game Over!</ThemedText>
                  <ThemedText style={styles.finalScore}>Final Score: {score}</ThemedText>
                  <ThemedText style={styles.finalTime}>Time: {formatTime(gameTime)}</ThemedText>
                  <TouchableOpacity style={styles.button} onPress={startGame}>
                    <Text style={styles.buttonText}>Restart Game</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <ThemedText style={styles.title}>Snake Game</ThemedText>
                  <TouchableOpacity style={styles.button} onPress={startGame}>
                    <Text style={styles.buttonText}>Start Game</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </SafeAreaView>
        )}

        {gameRunning && !gameOver && (
          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleDirectionChange({ x: 0, y: -1 })}
              >
                <Text style={styles.controlText}>↑</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleDirectionChange({ x: -1, y: 0 })}
              >
                <Text style={styles.controlText}>←</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleDirectionChange({ x: 1, y: 0 })}
              >
                <Text style={styles.controlText}>→</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => handleDirectionChange({ x: 0, y: 1 })}
              >
                <Text style={styles.controlText}>↓</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  gameBoard: {
    position: 'relative',
    borderWidth: 3,
    borderColor: '#2c3e50',
    backgroundColor: '#ecf0f1',
  },
  cell: {
    position: 'absolute',
    borderWidth: 0.5,
    borderColor: '#bdc3c7',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 20,
    textAlign: 'center',
  },
  finalScore: {
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  finalTime: {
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    marginTop: 30,
    alignItems: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 5,
  },
  controlButton: {
    backgroundColor: '#34495e',
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  controlText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});