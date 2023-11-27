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
  const addSet = exerciseIndex => {
    setExercises(prevExercises => {
      return prevExercises.map((exercise, index) => {
        if (index === exerciseIndex) {
          const newSet = {
            setId: exercise.sets.length + 1,
            weight: '',
            reps: '',
          };
          return {...exercise, sets: [...exercise.sets, newSet]};
        }
        return exercise;
      });
    });
  };
  const handleSetChange = (newValue, exerciseIndex, setIndex, field) => {
    setExercises(prevExercises => {
      const updatedExercises = prevExercises.map((exercise, index) => {
        if (index === exerciseIndex) {
          const updatedSets = exercise.sets.map((set, sIndex) => {
            if (sIndex === setIndex) {
              return {...set, [field]: newValue};
            }
            return set;
          });
          return {...exercise, sets: updatedSets};
        }
        return exercise;
      });
      return updatedExercises;
    });
  };

  return (
    <View style={styles.container}>
      {exercises.map((exercise, index) => (
        <View key={index}>
          <Text style={styles.exerciseText}>{exercise.name}</Text>
          {exercise.sets.map((set, setIndex) => (
            <View key={setIndex} style={styles.setContainer}>
              <Text>Set {set.setId}: </Text>
              <TextInput
                placeholder="Weight"
                value={set.weight}
                onChangeText={text =>
                  handleSetChange(text, index, setIndex, 'weight')
                }
                style={styles.input}
              />
              <TextInput
                placeholder="Reps"
                value={set.reps}
                onChangeText={text =>
                  handleSetChange(text, index, setIndex, 'reps')
                }
                style={styles.input}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => addSet(index)}>
            <Text style={styles.buttonText}>Add Set</Text>
          </TouchableOpacity>
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
  input: {
    borderWidth: 1,
    borderColor: '#FFA500',
    color: '#FFFFFF', // White color for the text
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    minWidth: 50, // Minimum width for the input fields
  },
  setContainer: {
    flexDirection: 'row', // Aligns the set details horizontally
    alignItems: 'center', // Centers items vertically within the row
    marginVertical: 5, // Adds vertical margin for each set row
  },
});

export default LogWorkoutScreen;
