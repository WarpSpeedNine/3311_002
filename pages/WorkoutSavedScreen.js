import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

/* Creates Workout Saved Screen component with three main buttons */
const WorkoutSavedScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WORKOUT SAVED!!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('New Routine Screen(notcreated)')}>
        <Text style={styles.buttonText}>Save Routine</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>Calendar</Text>
      </TouchableOpacity>
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
    color: '#FFA500', // Hi-vis Orange
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50, // Adds space below header
    fontFamily: 'Copperplate',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 10, // Adds space between buttons
    width: 200, // Fixed button width
    alignItems: 'center', // Centers text inside the button
    borderRadius: 8, // Rounds corners
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  buttonText: {
    color: '#FFA500',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default WorkoutSavedScreen;
