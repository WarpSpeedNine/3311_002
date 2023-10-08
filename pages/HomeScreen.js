import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>FITNESS TRACKER</Text>

            <TouchableOpacity style={styles.button} onPress={() => {/*Handle Button Press*/}}>
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Log Workout')}>
                <Text style={styles.buttonText}>Manual</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => {/* Handle "Routines" button press */}}>
                <Text style={styles.buttonText}>Routines</Text>
            </TouchableOpacity>

                <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop:50,
    },
    header: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 50,  // Adds some space below the header
      fontFamily:'Copperplate'
    },
    button: {
      backgroundColor: 'transparent',  // Basic button color. You can choose anything.
      padding: 10,
      marginVertical: 10,  // Adds space between buttons
      width: 200,  // Fixed button width
      alignItems: 'center',  // Center the text inside the button
      borderRadius: 8,  // Rounded corners
      borderWidth: 1,  
      borderColor: '#00008b', 
    },
    buttonText: {
      color: '#00008b',
      fontSize: 25,
      fontWeight: 'bold',
    },
  });

export default HomeScreen;