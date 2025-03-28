//pages/components/RegisterPopup.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function RegisterPopup({ onClose }) {
  const [userId, setUserId] = useState(""); // เปลี่ยนจาก email เป็น userId
  const [password, setPassword] = useState("");
  const router = useRouter(); // ใช้ router เพื่อนำทาง

  const handleRegister = () => {
    console.log("Registering:", { userId, password });

    // กรณีที่ระบบต้องการ client_id และ client_secret
    const clientId = "yourClientId"; // ใส่ client_id ที่ถูกต้อง
    const clientSecret = "yourClientSecret"; // ใส่ client_secret ที่ถูกต้อง

    // ส่งข้อมูลการลงทะเบียนไปยัง API (ถ้ามี)
    // สมมติว่าเราใช้ axios หรือ fetch ในการส่งข้อมูล
    // แต่ละระบบอาจมีรูปแบบการลงทะเบียนที่แตกต่างกัน
    // ตัวอย่างการส่งข้อมูล (สามารถแก้ไขให้ตรงกับ API ของคุณ)

    // ถ้าลงทะเบียนเสร็จเรียบร้อย
    router.push("/APITesting"); // ไปยังหน้า APITesting
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-lg font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <div className="flex justify-between">
          <button className="nes-btn is-success" onClick={handleRegister}>
            Sign Up
          </button>
          <button className="nes-btn is-error" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
