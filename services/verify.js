//services/erify.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ valid: false, error: 'Token missing' });
  }

  try {
    // ตัดช่องว่างออกด้วย trim() กันพลาด
    const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, payload: decoded });
  } catch (err) {
    return res.status(401).json({ valid: false, error: err.message });
  }
}
