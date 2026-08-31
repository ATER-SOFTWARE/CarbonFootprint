import { useState } from "react";

function CalculatorForm({ electricity = "" }) {
  const [transport, setTransport] = useState("");

  return (
    <div className="calculator-form">
      <h2>Calculator Form</h2>

      <label>Electricity Consumption (kWh)</label>

      <input
        type="number"
        value={electricity}
        readOnly
      />

      <label>Transport Distance (km)</label>

      <input
        type="number"
        value={transport}
        onChange={(e) => setTransport(e.target.value)}
        placeholder="Enter transport distance"
      />

      <p>Electricity: {electricity} kWh</p>

      <p>Transport: {transport} km</p>
    </div>
  );
}

export default CalculatorForm;