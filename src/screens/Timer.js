import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { Countdown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing';
import { spacing } from '../constants/sizes';
import { colors } from '../constants/colors';
import * as Progress from 'react-native-progress';
import { useKeepAwake } from '@sayem314/react-native-keep-awake';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
]; 

export const Timer = ({ focusItem, clearItem, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusItem);
  };

  // Use useEffect to update progress when the countdown progresses
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStarted && progress > 0) {
        setProgress((prevProgress) => prevProgress - (1 / (minutes * 60)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted, progress, minutes]);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          onProgress={setProgress}
          isPaused={!isStarted}
          onEnd={onEnd}
        />
        <View style={{ padding: spacing.xxl }}>
          <Text style={styles.title}>Focusing on: </Text>
          <Text style={styles.task}>{focusItem}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <Progress.Bar progress={progress} width={400} />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>
      <View style={styles.clearItemWrapper}>
        <RoundedButton size={50} title="-" onPress={clearItem} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearItemWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
});
