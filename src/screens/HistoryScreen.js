import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../constants/colors';
import { spacing, fontSizes } from '../constants/sizes';

export const FocusHistory = ({ history }) => {
  if (!history || !history.length) return <Text style={styles.title}>We haven't focus on anything yet!</Text>;

  const renderItem = ({ item }) => <Text style={styles.item}> - {item}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things We've focused on: </Text>
      <FlatList data={history} renderItem={renderItem} keyExtractor={(item) => item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.accent,
    paddingTop: spacing.sm,
  },
  title: {
    color: colors.accent,
    fontSize: fontSizes.md,
    fontWeight: 'bold',
    textAlign: 'center',

    
  },
});