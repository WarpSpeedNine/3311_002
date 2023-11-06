import React, { useState } from 'react';
import SuggestedWorkouts from './SuggestedWorkouts';
import AddWorkoutForm from './AddWorkoutForm';
import { getSuggestedWorkoutForDay, formatDate } from './utils';
import './App.css';

const App = () => {
  const [workouts, setWorkouts] = useState({
    "10/27/2023": "Weight lifting, 1 hr",
    "10/28/2023": "Cardio, 30 mins",
    "10/29/2023": "Weight lifting, 1 hr",
    "10/30/2023": "Squat, Calf Raises, Romanian dead-lift",
    "10/31/2023": "Biceps Curl, Hammer Curl, Triceps Kickback",
    "11/01/2023": "Biceps Curl, Hammer Curl, Triceps Kickback",
    "11/02/2023": "Biceps Curl, Hammer Curl, Triceps Kickback",
    "11/03/2023": "Biceps Curl, Hammer Curl, Triceps Kickback",
    // ... your existing workouts data
  });

  const [selectedDate, setSelectedDate] = useState(""); // State to keep track of the selected date
  const [showForm, setShowForm] = useState(false); // State to control showing the workout form

  // Function to handle adding a new workout
  const addWorkout = (date, workout) => {
    setWorkouts({ ...workouts, [date]: workout });
    setShowForm(false); // Hide the form after adding
  };
// Assuming you have a utility function to get the current date in the needed format
  const todayFormatted = formatDate(new Date());

  // Fetch the suggested workout for today
  const todaySuggestedWorkout = getSuggestedWorkoutForDay(workouts, new Date());
  return (
    <div>
    <div>
        Suggested Workout for today: {todaySuggestedWorkout}
      </div>
      {/* Remove conditional rendering for testing purposes */}
      <AddWorkoutForm
        selectedDate={selectedDate}
        onSave={addWorkout}
        onCancel={() => setShowForm(false)}
      />
      <button onClick={() => setShowForm(true)}>Add New Workout</button>
       <SuggestedWorkouts
            workoutHistory={workouts}
            selectedDate={selectedDate}
          />
    </div>
  );
};

export default App;
