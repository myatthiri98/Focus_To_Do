import { Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HomeScreen from './src/screens/HomeScreen';
import { FocusHistory } from './src/screens/HistoryScreen';
import FocusScreen from './src/screens/FocusScreen';
import { colors } from './src/constants/colors';
import { Timer } from './src/screens/Timer';

const App = () => {
  
  const [currentItem, setCurrentItem] = useState(null);
  const [history, setHistory] = useState([]);
  return (
   <SafeAreaView style={styles.container}>
     {!currentItem ? (
        <>
        <HomeScreen addItem={setCurrentItem} />
        <FocusHistory history={history}/>
        </>
      ) : (
        <Timer focusItem = {currentItem} onTimerEnd={(item) => setHistory([...history, item])} clearItem = {() => setCurrentItem(null)}/>

      )}
   </SafeAreaView>
  )
} 

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.background,
  },
})