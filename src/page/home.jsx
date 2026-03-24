import { useState } from "react";
import AddFlightForm from "../component/AddFlightForm";
import FlightDashboard from "../component/FlightDashboard";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleFlightAdded = () => setRefresh((r) => r + 1);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px", fontFamily: "sans-serif" }}>
      <h1>✈️ My Flight Tracker</h1>
      <AddFlightForm onFlightAdded={handleFlightAdded} />
      <FlightDashboard refresh={refresh} />
    </div>
  );
}