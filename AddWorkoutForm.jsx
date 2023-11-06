import React, { useState } from 'react';
import './App.css';

const AddWorkoutForm = ({ onSubmit, onCancel }) => {
  // Initialize state for the form fields
  const [workout, setWorkout] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');

  // Handle the submission of the form
  const handleSubmit = (event) => {
    event.preventDefault();
    // Call the passed in onSubmit function with the form data
    onSubmit({ workout, sets, reps, weight });
  };

  // Handle the form cancel
  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Workout:
        <input type="text" value={workout} onChange={(e) => setWorkout(e.target.value)} />
      </label>
      <label>
        Sets:
        <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} />
      </label>
      <label>
        Reps:
        <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} />
      </label>
      <label>
        Weight:
        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      </label>
      <button type="submit">Add Workout</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
      <button type="button" className="block-button" onClick={() => onSave(selectedDate, 'Your Workout Details')}>
        Save Workout
      </button>
      <button type="button" className="block-button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default AddWorkoutForm;
