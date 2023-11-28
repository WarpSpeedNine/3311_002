import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {db} from '../DB';

const LogWorkoutScreen = ({route, navigation}) => {
  /* Basic Log Workout Screen Component using navigation component */
  const [exercises, setExercises] = useState([]); // State to hold selected exercises, future function to add to list
  const [currentSets, setCurrentSets] = useState([]);
  const [databaseInstance, setDatabaseInstance] = useState(null);

  useEffect(() => {
    const loadDatabaseAsync = async () => {
      try {
        const dbInstance = await db.open();
        setDatabaseInstance(dbInstance);
        // Come back and put Fetch Functions here if needed
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    loadDatabaseAsync();

    return () => {
      if (databaseInstance) {
        databaseInstance.close().catch(error => {
          console.error('Error closing the database', error);
        });
      }
    };
  }, []);

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

  // Function to check whether their is a workout to save and thus populate Log Workout Button
  const hasSetsAdded = () => {
    return exercises.some(exercise => exercise.sets.length > 0);
  };
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
              <Text style={styles.setText}>Set {set.setId}: </Text>
              <Text style={styles.labelText}>Weight: </Text>
              <TextInput
                placeholder="0"
                placeholderTextColor="#888888"
                value={set.weight}
                onChangeText={text =>
                  handleSetChange(text, index, setIndex, 'weight')
                }
                style={styles.input}
              />
              <Text style={styles.labelText}>Reps: </Text>
              <TextInput
                placeholder="0"
                placeholderTextColor="#888888"
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
      {hasSetsAdded() && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Workout Saved')}>
          <Text style={styles.buttonText}>Log Workout</Text>
        </TouchableOpacity>
      )}
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
    // This is the formatting for selected Exercises as they appear on Log Workout Screen
    color: '#FFA500',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15, // Some space between exercises
  },
  input: {
    // This is for the text fields where reps/weight is entered
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
  setText: {
    color: '#FFFFFF', // White color
    fontSize: 16,
    marginRight: 5, // Add some space before the input fields
  },
  labelText: {
    color: '#FFFFFF', // White color for visibility against the black background
    marginRight: 5, // Space between label and input field
    fontSize: 16, // Size of the label text
  },
});

export default LogWorkoutScreen;
