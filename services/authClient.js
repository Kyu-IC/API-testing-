import axios from 'axios';

const AUTH_URL = 'http://localhost:3000/api/auth'; // ตั้งค่า URL ตาม API จริง

export async function getJWT(clientId, clientSecret) {
  try {
    const response = await axios.post(AUTH_URL, {
      client_id: clientId,
      client_secret: clientSecret,
    });

    return response.data.token; // คืนค่า JWT
  } catch (error) {
    console.error('❌ Authentication Failed:', error.response?.data || error.message);
    return null;
  }
}
