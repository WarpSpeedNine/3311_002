// utils.jsx

// Utility function to get the same weekday from the previous week
import React from 'react';
const getLastWeekDate = (date) => {
  const previousWeek = new Date(date);
  previousWeek.setDate(date.getDate() - 7);
  return previousWeek;
};

// Utility function to get a workout suggestion based on the same weekday from the previous week
export const getSuggestedWorkoutForDay = (workoutHistory, date) => {
  // Format the date to get the previous week's same weekday

  const lastWeekDate = getLastWeekDate(date);
  const formattedDate = formatDate(lastWeekDate);

  // Return the workout from the same weekday of the previous week
  // Assuming workoutHistory is an object with dates as keys and workout routines as values
  // Define a React component for displaying the workout with a bottom margin
const WorkoutMessage = ({ children }) => (
  <div style={{ marginBottom: '16px' }}>
    {children}
  </div>
);

// Then use it in your conditional rendering
return (
  <WorkoutMessage>
    {workoutHistory[formattedDate] || "No workout found for last week"}
  </WorkoutMessage>
);

};

// utils.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

