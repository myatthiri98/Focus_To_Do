import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FocusScreen = ({ focusItem, clearItem, onTimerEnd }) => {
  const getInitialMinCount = (item) => {
    switch (item.toLowerCase()) {
      case 'focus':
        return 24;
      case 'short break':
        return 4;
      case 'long break':
        return 14;
      default:
        return 24;
    }
  };

  const [minCount, setMinCount] = useState(getInitialMinCount(focusItem));
  const [count, setCount] = useState(59);
  const [paused, setPaused] = useState(true);
  const [intervalId, setIntervalId] = useState(null);

  const appendZero = (value) => (value < 10 ? `0${value}` : value);

  const resetTime = () => {
    pauseTimer();
    setMinCount(getInitialMinCount(focusItem));
    setCount(59);
  };

  const removeFocus = () => {
    setPaused(true);
    clearInterval(intervalId);
  };

  const pauseTimer = () => {
    setPaused(true);
    clearInterval(intervalId);
  };

  const startTimer = () => {
    resetTime();
    setPaused(false);
    setCount(59);
    setIntervalId(
      setInterval(() => {
        setCount((prevCount) => {
          if (prevCount === 0) {
            if (minCount !== 0) {
              setMinCount((prevMinCount) => prevMinCount - 1);
              return 59;
            } else {
              clearInterval(intervalId);
              onTimerEnd(focusItem); // Assuming onTimerEnd is a callback passed from the parent
              return 0;
            }
          } else {
            return prevCount - 1;
          }
        });
      }, 1000)
    );
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {appendZero(minCount)}:{appendZero(count)}
      </Text>
      <TouchableOpacity style={styles.button} onPress={paused ? startTimer : pauseTimer}>
        <Text style={styles.buttonText}>
          {paused ? 'Start' : 'Pause'}
        </Text>
      </TouchableOpacity>
      {paused && (
        <TouchableOpacity style={styles.button} onPress={removeFocus}>
          <Text style={styles.buttonText}>Remove focus</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 32,
  },
  button: {
    backgroundColor: 'pink',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 5,
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 24,
    color: 'black',
  },
});

export default FocusScreen;