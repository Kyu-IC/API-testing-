// pages/api/token.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  // ตรวจสอบว่า method ที่ใช้เป็น GET เท่านั้น
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // ตรวจสอบว่า client_id และ client_secret ถูกส่งมาใน query หรือไม่
  const { client_id, client_secret } = req.query;

  if (!client_id || !client_secret) {
    return res.status(400).json({ error: 'Missing client_id or client_secret' });
  }

  // ตรวจสอบว่า ENV variables ถูกตั้งค่าไว้อย่างถูกต้อง
  const validClientId = process.env.VALID_CLIENT_ID;
  const validClientSecret = process.env.VALID_CLIENT_SECRET;
  const jwtSecret = process.env.JWT_SECRET;

  if (!validClientId || !validClientSecret || !jwtSecret) {
    return res.status(500).json({ error: 'Missing environment variables: VALID_CLIENT_ID, VALID_CLIENT_SECRET, or JWT_SECRET' });
  }

  console.log('JWT_SECRET:', jwtSecret);

  // เทียบกับ ENV ที่เราตั้งค่าไว้
  if (client_id === validClientId && client_secret === validClientSecret) {
    try {
      // สร้าง JWT Token ด้วย payload
      const token = jwt.sign(
        { sub: client_id, message: 'this is my credential' },
        jwtSecret, // ใช้ secret เดียวกับ /api/verify
        { expiresIn: '10m' } // ตัวอย่างตั้งให้หมดอายุ 10 นาที
      );

      return res.status(200).json({ token });
    } catch (err) {
      console.error('❌ Error while generating token:', err);
      return res.status(500).json({ error: 'Internal Server Error while generating token', detail: err.message });
    }
  } else {
    return res.status(401).json({ error: 'Invalid client credentials: client_id or client_secret is incorrect' });
  }
}
