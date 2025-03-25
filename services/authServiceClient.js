// services/authServiceClient.js
import axios from 'axios';

export async function verifyToken(token) {
  try {
    console.log('📦 Sending token to /api/verify:', token);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_MY_AUTH_SERVICE}/api/verify`,
      {
        token: token.trim(),
      }
    );

    return res.data; // { valid: boolean, payload/error: ... }
  } catch (err) {
    console.error('❌ Error from verifyToken:', err.response?.data || err.message);
    return {
      valid: false,
      error: err.response?.data?.error || err.message,
    };
  }
}
