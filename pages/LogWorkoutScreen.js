import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const LogWorkoutScreen = ({route, navigation}) => {
  /* Basic Log Workout Screen Component using navigation component */
  const [exercises, setExercises] = useState([]); // State to hold selected exercises, future function to add to list
  const [currentSets, setCurrentSets] = useState([]);

  useEffect(() => {
    console.log('Received params:', route.params);
    if (route.params?.selectedExercise) {
      const newExercise = {
        id: route.params.selectedExercise.value,
        name: route.params.selectedExercise.label,
        sets: [],
      };
      setExercises(prevExercises => {
        const updatedExercises = [...prevExercises, newExercise];
        console.log('Updated Exercises:', updatedExercises);
        return updatedExercises;
      });
    }
  }, [route.params?.selectedExercise]);

  // Function to add a new set to the current exercise
  const addSet = () => {
    const newSet = {setId: currentSets.length + 1, weight: '', reps: ''};
    setCurrentSets([...currentSets, newSet]);
  };

  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index}>
          <Text style={styles.exerciseText}>{exercise.name}</Text>
          {/* Here you can also map over exercise.sets to display set details */}
        </View>
      ))}
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
    // REMOVE IF NOT USED
    justifyContent: 'flex-start', // aligns children to the top
    paddingTop: 50, // some padding from the top
  },
  containerCenter: {
    // REMOVE IF NOT USED
    justifyContent: 'center', // centers children on vertical axis, in center not at top
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    marginTop: 20, // Some space above the button
    borderWidth: 1,
    borderColor: '#FFA500',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFA500', // High-Vis Orange
    fontSize: 25,
    fontWeight: 'bold',
  },
  exerciseText: {
    color: '#FFA500',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15, // Some space between exercises
  },
});

export default LogWorkoutScreen;
