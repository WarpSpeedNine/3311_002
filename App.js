import "./App.css";
import React, { useState } from "react"; //Importing CSS style

function App() {
  const [value, setValue] = useState(50); //Initializing slider value

  return (
    <div className="slider-container">
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="slider"
      />
      <span>{value}</span>
      <span style={{ position: "absolute", left: "2px" }}>Beginner</span>
      <span style={{ position: "absolute", left: "152px" }}>Amateur</span>
      <span style={{ position: "absolute", left: "300px" }}>Semi-Pro</span>
      <span style={{ position: "absolute", left: "450px" }}>Calisthenics</span>
      <span style={{ position: "absolute", left: "570px" }}>Pro</span>

      {value === 0 && <span>Beginner</span>}
      {value === 25 && <span>Amateur</span>}
      {value === 50 && <span>Semi-pro</span>}
      {value === 75 && <span>Calisthenics</span>}
      {value === 100 && <span>Pro</span>}
    </div>
  );
} //Assigning text value to each section of slider

export default App; //exporting to run
