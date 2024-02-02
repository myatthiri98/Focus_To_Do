import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import RNBounceable from '@freakycoder/react-native-bounceable';
import {RoundedButton} from '../components/RoundedButton';
import {spacing} from '../constants/sizes';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { colors } from '../constants/colors';

const HomeScreen = ({addItem}) => {
  const [item, setItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setItem}
          placeholder="What would you like to foucs on?"
        />
        <View style={styles.button}>
          <RoundedButton title="+" size={50} onPress={() => addItem(item)} />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  button: {
    justifyContent: 'center',
  },
  textInput: {
    marginRight: spacing.sm,
    flex: 1,
    backgroundColor: colors.primary,
  },
  inputContainer: {
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
});