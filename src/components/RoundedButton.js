import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../constants/colors';
import RNBounceable from '@freakycoder/react-native-bounceable';

export const RoundedButton = ({
  style = {},
  textStyle = {},
  size = 125,
  ...props
}) => {
  return (
    <RNBounceable
      style={{
        borderRadius: size / 2,
        width: size,
        height: size,
        borderColor: colors.white,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={props.onPress}>
      <View
        style={{
          borderRadius: size / 2,
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: colors.white,
            fontSize: size / 3,
            textAlign: 'center',
          }}>
          {props.title}
        </Text>
      </View>
    </RNBounceable>
  );
};
