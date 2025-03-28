import jwt from "jsonwebtoken";

const SECRET_KEY = "my_secret_key"; // 🔥 ควรใช้ process.env.SECRET_KEY

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { client_id, client_secret } = req.body;

  // ✅ ตรวจสอบ Client ID และ Secret
  if (client_id === "test_client" && client_secret === "test_secret") {
    // ✅ สร้าง JWT
    const token = jwt.sign({ client_id }, SECRET_KEY, { expiresIn: "1h" });

    return res.status(200).json({ success: true, token });
  } else {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}
