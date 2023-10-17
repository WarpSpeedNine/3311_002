import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LogWorkoutScreen = ({ navigation }) => { /* Basic Log Workout Screen Component using navigation component */
  const [exercises, setExercises] = useState([]);  // State to hold selected exercises, future function to add to list

  return (
    <View style={[styles.container, exercises.length === 0 ? styles.containerStart : styles.containerCenter]}> 
       <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Exercises')}>
            
        <Text style={styles.buttonText}>Add Exercise</Text>
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
    },
    containerStart: {
        justifyContent: 'flex-start',  // aligns children to the top
        paddingTop: 50,  // some padding from the top
      },
      containerCenter: {
        justifyContent: 'center',  // centers children on vertical axis, in center not at top
      },
    exerciseText: {
      color: '#00008b', // Dark blue
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 15, // Some space between exercises
    },
    button: {
      backgroundColor: 'transparent',
      padding: 10,
      marginTop: 20, // Some space above the button
      borderWidth: 1,
      borderColor: '#00008b',
      alignItems: 'center',
      borderRadius: 8,
    },
    buttonText: {
      color: '#00008b', // Dark blue
      fontSize: 25,
      fontWeight: 'bold',
    },
  });

export default LogWorkoutScreen;