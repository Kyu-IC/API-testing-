import axios from 'axios';

const DATA_URL = 'http://localhost:3000/api/data'; // URL ของ Data Service

export async function fetchFriendData(jwtToken) {
  try {
    const response = await axios.get(DATA_URL, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    });

    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch friend data:', error.response?.data || error.message);
    return null;
  }
}
