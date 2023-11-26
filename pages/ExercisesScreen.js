import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {db} from '../DB';

const ExercisesScreen = () => {
  /* Creates ExercisesScreen Component */
  const [selectedType, setType] = useState(null);
  const [selectedMuscleGroup, setMuscleGroup] = useState(null);
  const [selectedExercise, setExercise] = useState(null);
  const [types, setTypes] = useState([]);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    let databaseInstance;

    const loadDatabaseAsync = async () => {
      try {
        databaseInstance = await db.open();
        await fetchTypes(databaseInstance);
        await fetchMuscleGroups(databaseInstance);
      } catch (error) {
        console.error('Error opening database:', error);
      }
    };

    loadDatabaseAsync();

    const fetchExercisesIfSelected = async () => {
      if (selectedType && selectedMuscleGroup && databaseInstance) {
        await fetchFilteredExercises(
          selectedType,
          selectedMuscleGroup,
          databaseInstance,
        );
      }
    };

    fetchExercisesIfSelected();

    return () => {
      if (databaseInstance) {
        databaseInstance.close().catch(error => {
          console.error('Error closing the database', error);
        });
      }
    };
  }, [selectedType, selectedMuscleGroup]);

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

      <Picker
        selectedValue={selectedExercise}
        onValueChange={itemValue => setExercise(itemValue)}
        style={styles.picker}>
        {exercises.map((exercise, index) => (
          <Picker.Item
            key={index}
            label={exercise.label}
            value={exercise.value}
          />
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
    color: '#00008b',
  },
});

export default ExercisesScreen;
