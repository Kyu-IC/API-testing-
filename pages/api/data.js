// pages/api/data.js
import { verifyToken } from '@/services/authServiceClient';

export default async function handler(req, res) {
  // กรณี CORS (ข้าม origin) ต้องตั้ง header ให้รองรับ (ถ้าจำเป็น)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  // Handle preflight request (OPTIONS) ถ้าจำเป็น
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const authHeader = req.headers.authorization;
    console.log('✅ Received Authorization Header:', authHeader);

    // เช็คว่า header มี Bearer <token> ไหม
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    const result = await verifyToken(token); // เรียก /api/verify

    console.log('✅ Verify result:', result);

    if (result.valid) {
      return res.status(200).json({ success: true, data: 'you have done' });
    } else {
      return res.status(401).json({ error: result.error || 'Invalid token' });
    }
  } catch (err) {
    console.error('❌ Internal Server Error:', err);
    return res.status(500).json({ error: 'Internal Server Error', detail: err.message });
  }
}
