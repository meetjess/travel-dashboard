import { useState } from 'react';
import { fetchFlightStatus } from '../api/aerodatabox';

function ApiTest() {
    const [flightNumber, setFlightNumber] = useState('');
    const [date, setDate] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleTest = async () => {
        if (!flightNumber || !date) {
            setError('Please enter both flight number and date');
            return;
        }

        setLoading(true);
        setError(null);
        setData(null);

        const result = await fetchFlightStatus(flightNumber, date);
        
        if (result) {
            setData(result);
        } else {
            setError('Failed to fetch flight data');
        }
        
        setLoading(false);
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0' }}>
            <h3>API Test Component</h3>
            <input
                type="text"
                placeholder="Flight Number (e.g., AA100)"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ marginRight: '10px' }}
            />
            <button onClick={handleTest} disabled={loading}>
                {loading ? 'Loading...' : 'Test API'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default ApiTest;