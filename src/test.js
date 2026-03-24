require('dotenv').config();

async function testApi() {
    const url = 'https://aerodatabox.p.rapidapi.com/flights/number/AS391/2025-08-13?withAircraftImage=false&withLocation=false&dateLocalRole=Both';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'aerodatabox.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        console.log('Status:', response.status);
        const result = await response.text();
        console.log('Body:', result);
    } catch (error) {
        console.error('Error:', error);
    }
}

testApi();