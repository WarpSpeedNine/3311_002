import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {db} from '../DB';

const ExercisesScreen = ({navigation}) => {
  /* Creates ExercisesScreen Component */
  const [selectedType, setType] = useState(null);
  const [selectedMuscleGroup, setMuscleGroup] = useState(null);
  const [selectedExercise, setExercise] = useState(null);
  const [types, setTypes] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [databaseInstance, setDatabaseInstance] = useState(null);

  useEffect(() => {
    // let databaseInstance;

    const loadDatabaseAsync = async () => {
      try {
        const dbInstance = await db.open();
        setDatabaseInstance(dbInstance);
        await fetchTypes(dbInstance);
        await fetchMuscleGroups(dbInstance);
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
    const fetchExercisesIfSelected = async () => {
      console.log(
        'Fetching exercises for Type:',
        selectedType,
        'and Muscle Group:',
        selectedMuscleGroup,
        ', Database Instance:',
        databaseInstance,
      );
      if (selectedType && selectedMuscleGroup && databaseInstance) {
        await fetchFilteredExercises(
          databaseInstance,
          selectedType,
          selectedMuscleGroup,
        );
      }
    };

    fetchExercisesIfSelected();
  }, [selectedType, selectedMuscleGroup, databaseInstance]);

  const fetchTypes = async databaseInstance => {
    try {
      const data = await new Promise((resolve, reject) => {
        databaseInstance.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM Type',
            [],
            (_, results) => {
              const rows = results.rows.raw(); // Convert rows to a standard JavaScript array
              let newTypes = []; // Initialize a new array to hold the transformed data
              for (let i = 0; i < rows.length; i++) {
                newTypes.push({
                  label: rows[i].Type,
                  value: rows[i].T_ID,
                });
              }
              resolve(newTypes); // Resolve the promise with the new array
            },
            (_, error) => {
              reject(error); // Reject the promise on error
              return false;
            },
          );
        });
      });
      setTypes(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error fetching types from the database', error);
    }
  };

  const fetchMuscleGroups = async databaseInstance => {
    try {
      const data = await new Promise((resolve, reject) => {
        databaseInstance.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM Muscle_Group',
            [],
            (_, results) => {
              const rows = results.rows.raw(); // Convert rows to a standard JavaScript array
              let newMuscleGroups = []; // Initialize a new array to hold the transformed data
              for (let i = 0; i < rows.length; i++) {
                newMuscleGroups.push({
                  label: rows[i].Area,
                  value: rows[i].MG_ID,
                });
              }
              resolve(newMuscleGroups); // Resolve the promise with the new array
            },
            (_, error) => {
              reject(error); // Reject the promise on error
              return false;
            },
          );
        });
      });
      setMuscleGroups(data); // Update the state with the fetched data
    } catch (error) {
      console.error('Error - fetching muscle groups from the database', error);
    }
  };

  const fetchFilteredExercises = async (
    databaseInstance,
    selectedType,
    selectedMuscleGroup,
  ) => {
    try {
      console.log('fetch Filtered Exercises function is called now.');
      const data = await new Promise((resolve, reject) => {
        databaseInstance.transaction(tx => {
          tx.executeSql(
            'SELECT Exercises.ID, Exercises.Name FROM Exercises WHERE Exercises.TypeID = ? AND Exercises.MGroupID = ?',
            [selectedType, selectedMuscleGroup],
            (_, results) => {
              const rows = results.rows.raw();
              let newExercises = [];
              for (let i = 0; i < rows.length; i++) {
                newExercises.push({
                  label: rows[i].Name,
                  value: rows[i].ID,
                });
              }
              console.log('Fetched Exercises:', newExercises); // Remove Later if necessary
              resolve(newExercises);
            },
            (_, error) => {
              reject(error);
              return false;
            },
          );
        });
      });
      setExercises(data);
      console.log('Updated Exercises State:', exercises); // Remove Later if necessary
    } catch (error) {
      console.error(
        'Error fetching filtered exercises from the database',
        error,
      );
    }
  };

  /*
  // Temproary Data For Testing Drop Downs
  const types = ['Free Weights', 'Machine', 'Calisthenic', 'All'];
  const muscleGroups = ['Arms', 'Chest', 'Legs', 'Back'];
  const exercises = ['Exercise 1', 'Exercise 2', 'Exercise 3'];
*/

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedType}
        onValueChange={(itemValue, itemIndex) => setType(itemValue)}
        style={styles.picker}>
        {types.map((type, index) => (
          <Picker.Item key={index} label={type.label} value={type.value} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedMuscleGroup}
        onValueChange={(itemValue, itemIndex) => setMuscleGroup(itemValue)}
        style={styles.picker}>
        {muscleGroups.map((group, index) => (
          <Picker.Item key={index} label={group.label} value={group.value} />
        ))}
      </Picker>
      {console.log('Rendering Exercises:', exercises)}
      <Picker
        selectedValue={selectedExercise}
        onValueChange={itemValue => {
          // This finds the exercise object based on the selected value
          const exerciseObject = exercises.find(
            exercise => exercise.value === itemValue,
          );
          console.log('Found exercise object: ', exerciseObject);
          // Set the selectedExercise state to the value of the selected exercise
          setExercise(itemValue);
        }} //
        style={styles.picker}>
        {exercises.map((exercise, index) => (
          <Picker.Item
            key={index}
            label={exercise.label}
            value={exercise.value}
          />
        ))}
      </Picker>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Log Workout', {
            selectedExercise: exercises.find(
              ex => ex.value === selectedExercise,
            ),
          })
        }>
        <Text style={styles.buttonText}>Add to Workout</Text>
      </TouchableOpacity>
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
    color: '#FFA500',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 10, // Adds space between buttons
    width: 200, // Fixed button width
    alignSelf: 'center',
    borderRadius: 8, // Rounds corners
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  buttonText: {
    color: '#FFA500', // Dark blue
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default ExercisesScreen;
