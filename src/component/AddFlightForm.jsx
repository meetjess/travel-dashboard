import { useState } from "react";
import { supabase } from "../api/supabaseClient";

function AddFlightForm({ onFlightAdded }) {
  const [flightNumber, setFlightNumber] = useState("");
  const [date, setDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveFlight = async () => {
    if (!flightNumber || !date) {
      setError("Please enter both a flight number and date.");
      return;
    }

    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from("flights")
      .insert([{ flight_number: flightNumber, date: date }]);

    if (error) {
      setError("Failed to save flight. Try again.");
      console.error(error);
    } else {
      setFlightNumber("");
      setDate("");
      onFlightAdded();
    }

    setSaving(false);
  };

  return (
    <div>
      <h2 className="white">Add a Flight</h2>
      <input
        placeholder="Flight number (e.g. AS307)"
        value={flightNumber}
        onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button onClick={saveFlight} disabled={saving}>
        {saving ? "Saving..." : "Add Flight"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default AddFlightForm;