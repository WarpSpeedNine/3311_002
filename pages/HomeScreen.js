import React from 'react';
import {View, Text, Button, TouchableOpacity, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
  /* Creates Home Screen component with three main buttons */
  return (
    <View style={styles.container}>
      <Text style={styles.header}>FITNESS TRACKER</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('History')}>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Log Workout')}>
        <Text style={styles.buttonText}>Manual</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Routines')}>
        <Text style={styles.buttonText}>Routines</Text>
      </TouchableOpacity>
    </View>
  );
};

// Define all styles used above
const styles = StyleSheet.create({
  /* Creates Various styles referred to in this page */
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start' /* Aligns components to center top */,
    paddingTop: 50,
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
    color: '#FFA500', // Hi-vis orange
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
