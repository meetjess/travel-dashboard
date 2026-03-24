const getFlightDetails = async (flightNumber, date) => {
  const response = await fetch(
    "https://nwtjfjsdobutjkowdhdb.supabase.co/functions/v1/get-flight",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dGpmanNkb2J1dGprb3dkaGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQzNzkyNDYsImV4cCI6MjA4OTk1NTI0Nn0.e8mGru8zb5CEX2DIIKm1RqYPwSf8WjY2y2gmaxPzsX0`,
      },
      body: JSON.stringify({ flightNumber, date }),
    }
  );

  const data = await response.json();
  return data;
};

export { getFlightDetails };