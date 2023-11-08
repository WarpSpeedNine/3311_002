import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Calendar} from '../src/Calendar';

const HistoryScreen = ({navigation}) => {
  /* Adds History Screen Component */
  return (
    <View style={styles.container}>
      <Text style={styles.plainText}>
        {' '}
        Please select a date to view workout History.{' '}
      </Text>
      <Calendar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  plainText: {
    color: '#FFA500', // Dark blue
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default HistoryScreen;
