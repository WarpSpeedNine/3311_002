import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {db} from '../DB';

export function Calendar() {
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [workoutDetails, setWorkoutDetails] = useState(null);
  const [databaseInstance, setDatabaseInstance] = useState(null);

  useEffect(() => {
    const loadDatabaseAsync = async () => {
      try {
        const dbInstance = await db.open();
        setDatabaseInstance(dbInstance);
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

  function getFormattedDate(date) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  const fetchWorkoutDetails = async (date) => {
    if (!databaseInstance) {
      console.error('Database is not open');
      return;
    }
  
    try {
      const entryIDs = await queryCalendarEntriesForDate(databaseInstance, date);
      let allWorkoutDetails = [];
      
      for (const entryID of entryIDs) {
        const workoutDetails = await queryLoggedWorkoutsForEntry(databaseInstance, entryID);
        allWorkoutDetails.push(...workoutDetails);
      }
      return allWorkoutDetails;
    } catch (error) {
      console.error('Error fetching workout details:', error);
      return null; 
    }
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();

  const handleDayClick = async (day) => {
    // Format the date string as YYYY-MM-DD
    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  
    // Fetch workout details for the formatted date
    const details = await fetchWorkoutDetails(dateStr);
    setWorkoutDetails(details); // Set the fetched details in state
    setSelectedDate(dateStr);   // Update the selected date state
  };

  const queryCalendarEntriesForDate = async (databaseInstance, date) => {
    try {
      const data = await new Promise((resolve, reject) => {
        databaseInstance.transaction(tx => {
          tx.executeSql(
            'SELECT EntryID FROM CalendarEntries WHERE EntryDate = ?',
            [date],
            (_, results) => {
              let entryIDs = [];
              for (let i = 0; i < results.rows.length; i++) {
                entryIDs.push(results.rows.item(i).EntryID);
              }
              resolve(entryIDs);
            },
            (_, error) => {
              reject(error);
            }
          );
        });
      });
      return data;
    } catch (error) {
      console.error('Error querying CalendarEntries:', error);
      throw error; 
    }
  };

  const queryLoggedWorkoutsForEntry = async (databaseInstance, entryID) => {
    try {
      const query = `
        SELECT LW.SetNumber, LW.Repetitions, LW.Weight, E.Name as ExerciseName
        FROM LoggedWorkouts LW
        JOIN Exercises E ON LW.ExerciseID = E.ID
        WHERE LW.CalendarEntryID = ?
        ORDER BY LW.ExerciseID, LW.SetNumber`;
  
      const loggedWorkouts = await new Promise((resolve, reject) => {
        databaseInstance.transaction(tx => {
          tx.executeSql(
            query,
            [entryID],
            (_, results) => {
              const rows = results.rows.raw();
              resolve(rows);
            },
            (_, error) => {
              reject(error);
              return false;
            }
          );
        });
      });
  
      return loggedWorkouts;
    } catch (error) {
      console.error('Error querying LoggedWorkouts for EntryID:', error);
      return null; // or appropriate error handling
    }
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarHeader}>
          {getFormattedDate(currentMonth)}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(
              prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1),
            )
          }>
          <Text style={styles.prev_next_buttons}>Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            setCurrentMonth(
              prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1),
            )
          }>
          <Text style={styles.prev_next_buttons}>Next</Text>
        </TouchableOpacity>

        {Array.from({length: daysInMonth}).map((_, idx) => {
          const day = idx + 1;
          const dateStr = `${currentMonth.getFullYear()}-${String(
            currentMonth.getMonth() + 1,
          ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handleDayClick(day)}
              style={styles.day}>
              <Text>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.workoutData}>
        {selectedDate && workoutDetails && (
          <View>
            <Text>Workout for {selectedDate}:</Text>
            {workoutDetails.map((workout, index) => (
              <Text key={index}>
                <Text style={{ fontWeight: 'bold' }}>{workout.ExerciseName}</Text>
                <Text> - Set {workout.SetNumber}, {workout.Repetitions} reps, {workout.Weight} lbs</Text>
              </Text>
            ))}
          </View>
          )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 50,
    alignItems: 'center',
    width: '100%',
  },
  day: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderWidth: 1,
    borderColor: '#76afcfb0',
    backgroundColor: '#bfe0f9',
  },
  contentContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  workoutData: {
    padding: 25,
    color: '#023249',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#bfe0f9',
    borderWidth: 1,
    borderColor: '#76afcfb0',
    borderRadius: 20,
    width: 250,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.384,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 50,
    marginLeft: 0,
  },
  calendarHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{translateY: -60}],
    textAlign: 'center',
    color: '#013955',
  },
  prev_next_buttons: {
    color: '#FFA500',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default Calendar;
