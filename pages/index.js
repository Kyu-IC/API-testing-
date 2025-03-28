//pages/index.js
import { useState } from "react";
import Link from "next/link";
import RegisterPopup from "../pages/components/RegisterPopup";
import { getJWT } from '@/services/authClient';
import { fetchFriendData } from '@/services/friendDataClient';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <main className="h-screen flex flex-col justify-center items-center bg-[#CBDCA3] font-['Press_Start_2P'] text-center">
      <div className="flex flex-col items-center gap-4">
        {/* ปุ่มสำหรับไปหน้า APITesting */}
        <Link href="/APITesting">
          <button className="nes-btn is-primary">API Testing</button>
        </Link>

        {/* ปุ่มเปิด Popup ลงทะเบียน */}
        <button className="nes-btn is-success" onClick={() => setShowPopup(true)}>
          Register
        </button>
      </div>

      {/* แสดง Popup */}
      {showPopup && <RegisterPopup onClose={() => setShowPopup(false)} />}
    </main>
  );
}

async function testAuth() {
  const clientId = 'test_client';
  const clientSecret = 'test_secret';

  const token = await getJWT(clientId, clientSecret);
  console.log('🔑 JWT Received:', token);
}

testAuth();

async function testFetchFriendData() {
  const clientId = 'test_client';
  const clientSecret = 'test_secret';

  const token = await getJWT(clientId, clientSecret);
  if (!token) {
    console.error('🚨 Failed to get JWT, cannot proceed.');
    return;
  }

  console.log('🔑 JWT:', token);

  const friendData = await fetchFriendData(token);
  console.log('👥 Friend Data:', friendData);
}

testFetchFriendData();

