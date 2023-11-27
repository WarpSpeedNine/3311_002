import React, {useState, useEffect} from 'react';
import {View, Text, Flatlist, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {db} from '../DB';

const ExercisesScreen = () => {
  /* Creates ExercisesScreen Component */
  const [selectedType, setType] = useState(null);
  const [selectedMuscleGroup, setMuscleGroup] = useState(null);
  const [selectedExercise, setExercise] = useState(null);
  //const [types, setTypes] = useState([]);     // PUT THESE THREE LINES BACK IN FOR DB ATTEMPT, REMOVE BELOW DUMMY VALUE LINES
  //const [muscleGroups, setMuscleGroups] = useState([]);
  //const [exercises, setExercises] = useState([]);

  // Temproary Data For Testing Drop Downs
  const types = ['Free Weights', 'Machine', 'Calisthenic', 'All'];
  const muscleGroups = ['Arms', 'Chest', 'Legs', 'Back'];
  const exercises = ['Exercise 1', 'Exercise 2', 'Exercise 3'];

  /*
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

    return () => {
      if (databaseInstance) {
        databaseInstance.close().catch(error => {
          console.error('Error closing the database', error);
        });
      }
    };
  }, []);

  const fetchTypes = async databaseInstance => {
    try {
      const data = await new Promise((resolve, reject) => {
        databaseInstance.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM Type',
            [],
            (_, results) => {
              const rows = results.rows;
              let types = [];
              for (let i = 0; i < rows.length; i++) {
                types.push({
                  label: rows.item(i).Type,
                  value: rows.item(i).T_ID,
                });
              }
              resolve(data);
            },
            (_, error) => {
              reject(error);
              return false;
            },
          );
        });
      });
      setTypes(data);
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
              const rows = results.rows;
              let muscleGroups = [];
              for (let i = 0; i < rows.length; i++) {
                muscleGroups.push({
                  label: rows.item(i).Area,
                  value: rows.item(i).MG_ID,
                });
              }
              resolve(muscleGroups);
            },
            (_, error) => {
              reject(error);
              return false;
            },
          );
        });
      });
      setMuscleGroups(data);
    } catch (error) {
      console.error('Error fetching muscle groups from the database', error);
    }
  };
*/

  /* THIS SHOULD WORK WITH TOP TWO BASIC QUERIES FOR TYPE/ MUSCLE_GROUP
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
*/
  // THE FOLLOWING WAS ONLY TEMPORARILY PUT BACK IN, REMOVE AT PROPER TIME.

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedType}
        onValueChange={value => setType(value)}
        style={styles.picker}>
        {types.map(type => (
          <Picker.Item key={type} label={type} value={type} />
        ))}
      </Picker>

      <Picker
        selectedValue={selectedMuscleGroup}
        onValueChange={value => setMuscleGroup(value)}
        style={styles.picker}>
        {muscleGroups.map(group => (
          <Picker.Item key={group} label={group} value={group} />
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
    color: '#FFA500',
  },
});

export default ExercisesScreen;