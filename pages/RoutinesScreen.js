import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const RoutinesScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.plainText}> Will populate with buttons for "My Routines", "PreBuilt Routines", "New Routine", 
            and eventually "Suggested Routines" </Text> 
    
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
    plainText: {
        color: '#00008b', // Dark blue
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15, 
      },
});


export default RoutinesScreen;

