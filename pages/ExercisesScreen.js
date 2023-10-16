import React, { useState } from 'react';
import { View, StyleSheet, Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ExercisesScreen = () => { /* Creates ExercisesScreen Component */
  const [selectedType, setType] = useState(null);
  const [selectedMuscleGroup, setMuscleGroup] = useState(null);
  const [selectedExercise, setExercise] = useState(null);

  // Temproary Data For Testing Drop Downs
  const types = ['Free Weights', 'Machine', 'Calisthenic', 'All'];
  const muscleGroups = ['Arms', 'Chest', 'Legs', 'Back'];
  const exercises = ['Exercise 1', 'Exercise 2', 'Exercise 3'];

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedType}
        onValueChange={(value) => setType(value)}
        style={styles.picker}
      >
        {types.map((type) => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      <Picker 
        selectedValue={selectedMuscleGroup}
        onValueChange={(value) => setMuscleGroup(value)}
        style={styles.picker}
      >
        {muscleGroups.map((group) =>(
          <Picker.Item key={group} label={group} value={group}/>
        ))}
      </Picker>

      <Picker 
        selectedValue={selectedExercise}
        onValueChange={(value) => setExercise(value)}
        style={styles.picker}
      >
        {exercises.map((exercise) => (
          <Picker.Item key={exercise} label={exercise} value={exercise}/>
        ))}
      </Picker>
          
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingtop: 50,
  },
  picker: {
    height: 50,
    width: 300,    
    margin: 10,
    fontWeight: 'bold',
    color: '#00008b'
  },
});

export default ExercisesScreen;