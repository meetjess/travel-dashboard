import { useState } from "react";
import AddFlightForm from "../component/AddFlightForm";
import FlightDashboard from "../component/FlightDashboard";

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  const handleFlightAdded = () => setRefresh((r) => r + 1);

  return (
    <div className="flight-tracker-container">
      <h1 className="white">✈️ My Flight Tracker</h1>
      <AddFlightForm onFlightAdded={handleFlightAdded} />
      <FlightDashboard refresh={refresh} />
    </div>
  );
}