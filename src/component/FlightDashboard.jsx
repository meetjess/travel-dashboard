import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { getFlightDetails } from "../api/aerodatabox";

export default function FlightDashboard({ refresh }) {
  const [flights, setFlights] = useState([]);
  const [flightData, setFlightData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlights();
  }, [refresh]);

  const fetchFlights = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      console.error("Error fetching flights:", error);
      setLoading(false);
      return;
    }

    setFlights(data);

    // Fetch details for each flight
    const details = {};
    for (const flight of data) {
      try {
        const detail = await getFlightDetails(flight.flight_number, flight.date);
        console.log("Flight details for", flight.flight_number, flight.date, ":", detail);
        details[flight.id] = detail;
      } catch (err) {
        console.error("Error fetching flight details:", err);
        details[flight.id] = null;
      }
    }
    setFlightData(details);
    setLoading(false);
  };

  if (loading) {
    return <div>Loading flights...</div>;
  }

  return (
    <div>
      <h2>My Flights</h2>
      {flights.length === 0 ? (
        <p>No flights added yet.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Flight Number</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Departure IATA</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Arrival IATA</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Scheduled Arrival</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actual Arrival</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => {
              const data = flightData[flight.id];
              let departureIata = "N/A";
              let arrivalIata = "N/A";
              let scheduledArrival = "N/A";
              let actualArrival = "N/A";

              if (data && Array.isArray(data) && data.length > 0) {
                const flightInfo = data[0];
                if (flightInfo.departure && flightInfo.departure.airport) {
                  departureIata = flightInfo.departure.airport.iata || "N/A";
                }
                if (flightInfo.arrival && flightInfo.arrival.airport) {
                  arrivalIata = flightInfo.arrival.airport.iata || "N/A";
                }
                if (flightInfo.arrival && flightInfo.arrival.scheduledTime) {
                  scheduledArrival = flightInfo.arrival.scheduledTime.local || flightInfo.arrival.scheduledTime.utc || "N/A";
                }
                if (flightInfo.arrival && flightInfo.arrival.actualTime) {
                  actualArrival = flightInfo.arrival.actualTime.local || flightInfo.arrival.actualTime.utc || "N/A";
                }
              }

              return (
                <tr key={flight.id}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{flight.flight_number}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{flight.date}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{departureIata}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{arrivalIata}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{scheduledArrival}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{actualArrival}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
