import React from 'react';
import { getSuggestedWorkoutForDay } from './utils'; // Corrected function name

const SuggestedWorkouts = ({ workoutHistory }) => {
  const today = new Date(); // Assuming you want today's date
  const suggestedWorkout = getSuggestedWorkoutForDay(workoutHistory, today);

  
};

export default SuggestedWorkouts;
