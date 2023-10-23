import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function Calendar() {
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample data for previous workouts
  const workouts = {
    "2023-10-11": "Cardio, 30 mins",
    "2023-10-13": "Weight lifting, 1 hr",
    "2023-10-16": " Squat , Calf Raises , Romanian dead-lift",
    "2023-10-17": "Biceps Curl , Hammer Curl , Triceps Kickback",
  };

  function getFormattedDate(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const handleDayClick = (day) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setSelectedDate(workouts[dateStr] ? dateStr : null);
  };

  return (
    <View style={styles.contentContainer}>
      <View style={styles.calendarContainer}>
        <Text style={styles.calendarHeader}>{getFormattedDate(currentMonth)}</Text>

        <TouchableOpacity onPress={() => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
          <Text style={styles.prev_next_buttons}>Prev</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
          <Text style={styles.prev_next_buttons}>Next</Text>
        </TouchableOpacity>

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          return (
            <TouchableOpacity 
              key={idx} 
              onPress={() => handleDayClick(day)}
              style={[
                styles.day,
                { backgroundColor: workouts[dateStr] ? "#76afcfb0" : "#872a4cc6" }
              ]}
            >
              <Text>{day}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.workoutData}>
        {selectedDate && (
          <View>
            <Text>Workout for {selectedDate}:</Text>
            <Text>
              <Text style={{ fontWeight: 'bold' }}>{workouts[selectedDate].split(",")[0]}</Text>
              <Text>{workouts[selectedDate].split(",")[1].trim()}</Text>
            </Text>
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
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.384,
      shadowRadius: 10,
      elevation: 5, 
      marginTop: 50,
      marginLeft: 0,
    },
    calendarHeader: {
      fontSize: 24, 
      fontWeight: 'bold',
      transform: [{ translateY: -60 }],
      textAlign: 'center',
      color: '#013955',
    },
    prev_next_buttons: {
      color: '#00008b', 
      fontSize: 25,
      fontWeight: 'bold',
    }
  });

export default Calendar;

