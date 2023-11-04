import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const RoutinesScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>ROUTINES</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('My Routines(notcreated)')}>
        <Text style={styles.buttonText}>My Routines</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Pre-built Routines(notcreated)')}>
        <Text style={styles.buttonText}>Premade</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('New Routines(notcreated)')}>
        <Text style={styles.buttonText}>New Routines</Text>
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
    color: '#00008b', // Dark blue
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
    borderColor: '#00008b',
  },
  buttonText: {
    color: '#00008b',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default RoutinesScreen;
