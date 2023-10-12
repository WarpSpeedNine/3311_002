import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Text style={styles.plainText}> Insert Calendar Here </Text>
    
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


export default HistoryScreen;

