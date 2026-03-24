import { useState, useEffect } from "react";
import { supabase } from "../api/supabaseClient";

const FUNCTION_URL = "https://nwtjfjsdobutjkowdhdb.supabase.co/functions/v1/get-flight";

export default function FlightDashboard({ refresh }) {
  const [flights, setFlights] = useState([]);
  const [liveData, setLiveData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFlights();
  }, [refresh]);

  const loadFlights = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("flights")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setFlights(data);

    const liveResults = {};
    await Promise.all(
      data.map(async (flight) => {
        try {
          const response = await fetch(FUNCTION_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              flightNumber: flight.flight_number,
              date: flight.date,
            }),
          });
          const json = await response.json();
          liveResults[flight.id] = Array.isArray(json) ? json[0] : null;
        } catch (err) {
          console.error(err);
          liveResults[flight.id] = null;
        }
      })
    );

    setLiveData(liveResults);
    setLoading(false);
  };

  if (loading) return <p>Loading flights...</p>;
  if (flights.length === 0) return <p>No flights added yet.</p>;

  return (
    <div style={styles.dashboard}>
      {flights.map((flight) => {
        const live = liveData[flight.id];
        return (
          <div key={flight.id} style={styles.card}>

            {/* Header */}
            <div style={styles.cardHeader}>
              <h2 style={styles.flightNumber}>
                {live?.airline?.name ?? flight.flight_number} — {live?.number ?? flight.flight_number}
              </h2>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: live?.status === "Landed" ? "#22c55e" : "#f59e0b"
              }}>
                {live?.status ?? "Unknown"}
              </span>
            </div>

            {/* Departure & Arrival */}
            <div style={styles.cols}>
              <div>
                <p style={styles.label}>🛫 Departure</p>
                <p><strong>{live?.departure?.airport?.name ?? "N/A"}</strong> ({live?.departure?.airport?.iata ?? "—"})</p>
                <p>Scheduled: {live?.departure?.scheduledTime?.local ?? "N/A"}</p>
                <p>Actual: {live?.departure?.actualTime?.local ?? "N/A"}</p>
                <p>Terminal: {live?.departure?.terminal ?? "N/A"} &nbsp;|&nbsp; Gate: {live?.departure?.gate ?? "N/A"}</p>
              </div>
              <div>
                <p style={styles.label}>🛬 Arrival</p>
                <p><strong>{live?.arrival?.airport?.name ?? "N/A"}</strong> ({live?.arrival?.airport?.iata ?? "—"})</p>
                <p>Scheduled: {live?.arrival?.scheduledTime?.local ?? "N/A"}</p>
                <p>Actual: {live?.arrival?.actualTime?.local ?? "N/A"}</p>
                <p>Terminal: {live?.arrival?.terminal ?? "N/A"} &nbsp;|&nbsp; Gate: {live?.arrival?.gate ?? "N/A"}</p>
                <p>Baggage Belt: {live?.arrival?.baggageBelt ?? "N/A"}</p>
              </div>
            </div>

            {/* Delay banner — only shows if there's a delay */}
            {(live?.departure?.delay || live?.arrival?.delay) && (
              <div style={styles.delayBanner}>
                ⚠️ Delay —
                {live?.departure?.delay && ` Departure: ${live.departure.delay} min`}
                {live?.arrival?.delay && ` Arrival: ${live.arrival.delay} min`}
              </div>
            )}

          </div>
        );
      })}
    </div>
  );
}

const styles = {
  dashboard: { display: "flex", flexDirection: "column", gap: 20 },
  card: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12, padding: "20px 24px" },
  cardHeader: { display: "flex", alignItems: "center", gap: 16, marginBottom: 16 },
  flightNumber: { margin: 0, fontSize: 20 },
  statusBadge: { padding: "4px 14px", borderRadius: 20, color: "#fff", fontWeight: 600, fontSize: 14 },
  cols: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  label: { fontWeight: 700, marginBottom: 4 },
  delayBanner: { marginTop: 16, padding: "10px 14px", background: "#fef2f2", borderLeft: "4px solid #ef4444", borderRadius: 6, color: "#b91c1c" },
};