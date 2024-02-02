import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../constants/sizes';
import { colors } from '../constants/colors';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

  export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
    const interval = React.useRef(null);
    const [millis, setMillis] = useState(null);
  
    const reset = () => setMillis(minutesToMillis(minutes));
  
    const countDown = () => {
      setMillis((time) => {
        if (time === 0) {
          clearInterval(interval.current);
          onEnd(() => reset());
          return time;
        }
        const timeLeft = time - 1000;
        return timeLeft;
      });
    };
  
    useEffect(() => {
      setMillis(minutesToMillis(minutes));
    }, [minutes]);
  
    useEffect(() => {
      if (!isPaused) {
        interval.current = setInterval(countDown, 1000);
      }
  
      // Clear the interval when the component is unmounted or when isPaused changes
      return () => {
        clearInterval(interval.current);
      };
    }, [isPaused]);
  
    useEffect(() => {
      const progress = millis / minutesToMillis(minutes);
  
      // Ensure onProgress is called after the component has been rendered
      // Use requestAnimationFrame to schedule the callback after rendering
      requestAnimationFrame(() => {
        onProgress(progress);
      });
    }, [millis]);
  
    const minute = Math.floor(millis / 1000 / 60) % 60;
    const seconds = Math.floor(millis / 1000) % 60;
  
    return (
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});