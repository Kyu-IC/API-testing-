// pages/api/data.js
import { verifyToken } from '@/services/authServiceClient';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const authHeader = req.headers.authorization;
    
    console.log('📩 Received Authorization Header:', authHeader);

    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];
    console.log('🔑 Extracted Token:', token);

    const result = await verifyToken(token);

    console.log('✅ Verify result:', result);

    if (!result.valid) {
      return res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }

    // ✅ ส่ง JSON Response ตามที่โจทย์กำหนด
    return res.status(200).json({
      success: true,
      data: "you have done"
    });

  } catch (err) {
    console.error('❌ Internal Server Error:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error', detail: err.message });
  }
}
