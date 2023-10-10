import "./App.css";
import React, { useState } from "react";

function App() {
  const [value, setValue] = useState(50);
  // State for calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample data for previous workouts
  const workouts = {
    "2023-10-01": "Cardio, 30 mins",
    "2023-10-03": "Weight lifting, 1 hr",
    "2023-10-05": "Yoga, 45 mins",
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
    <div className="main-container">
      <div className="slider-container">
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="slider"
        />
        <span></span>
        <span style={{ position: "absolute", left: "2px" }}>Beginner</span>
        <span style={{ position: "absolute", left: "184px" }}>Amateur</span>
        <span style={{ position: "absolute", left: "381px" }}>Semi-Pro</span>
        <span style={{ position: "absolute", left: "580px" }}>
          Calisthenics
        </span>
        <span style={{ position: "absolute", left: "812px" }}>Pro</span>

        {value === 0 && <span>Beginner</span>}
        {value === 25 && <span>Amateur</span>}
        {value === 50 && <span>Semi-pro</span>}
        {value === 75 && <span>Calisthenics</span>}
        {value === 100 && <span>Pro</span>}

        <div className="content-container">
          <div className="calendar-container">
            <div className="calendar-header">
              {getFormattedDate(currentMonth)}
            </div>
            <button
              onClick={() =>
                setCurrentMonth(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                )
              }
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentMonth(
                  (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                )
              }
            >
              Next
            </button>

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const dateStr = `${currentMonth.getFullYear()}-${String(
                currentMonth.getMonth() + 1
              ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              return (
                <div
                  key={idx}
                  onClick={() => handleDayClick(day)}
                  style={{
                    backgroundColor: workouts[dateStr]
                      ? "#76afcfb0"
                      : "#872a4cc6",
                  }}
                >
                  {day}
                </div>
              );
            })}
          </div>
          <div className="workout-data">
            {selectedDate && (
              <div>
                Workout for {selectedDate}: {workouts[selectedDate]}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
