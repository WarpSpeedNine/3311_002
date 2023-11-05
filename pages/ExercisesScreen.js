import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Button} from 'react-native';
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

    db.open()
      .then(database => {
        databaseInstance = database;
        fetchTypes(databaseInstance);
        fetchMuscleGroups(databaseInstance);
      })
      .catch(error => {
        console.error('Error OPENING database:', error);
      });

    return () => {
      if (databaseInstance) {
        databaseInstance.close().catch(error => {
          console.error('Error closing the database', error);
        });
      }
    };
  }, []);

  const fetchTypes = databaseInstance => {
    databaseInstance.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Type',
        [],
        (tx, results) => {
          const rows = results.rows;
          let data = [];

          for (let i = 0; i < rows.length; i++) {
            data.push({label: rows.item(i).Type, value: rows.item(i).T_ID});
          }

          setTypes(data);
        },
        error => {
          console.error('Error fetching types from the database', error);
        },
      );
    });
  };

  const fetchMuscleGroups = databaseInstance => {
    databaseInstance.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Muscle_Group',
        [],
        (tx, results) => {
          const rows = results.rows;
          let data = [];

          for (let i = 0; i < rows.length; i++) {
            data.push({label: rows.item(i).Area, value: rows.item(i).MG_ID});
          }

          setMuscleGroups(data);
        },
        error => {
          console.error(
            'Error fetching muscle groups from the database',
            error,
          );
        },
      );
    });
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
        onValueChange={value => setExercise(value)}
        style={styles.picker}>
        {exercises.map(exercise => (
          <Picker.Item key={exercise} label={exercise} value={exercise} />
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
