// pages/api/token.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { client_id, client_secret } = req.query;

  // เทียบกับ ENV ที่เราตั้งค่าไว้
  if (
    client_id === process.env.VALID_CLIENT_ID &&
    client_secret === process.env.VALID_CLIENT_SECRET
  ) {
    const token = jwt.sign(
      { sub: client_id, message: 'this is my credential' },
      process.env.JWT_SECRET, // ใช้ secret เดียวกับ /api/verify
      { expiresIn: '1m' }     // ตัวอย่างตั้งให้หมดอายุ 1 นาที
    );

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ error: 'Invalid client credentials' });
  }
}
