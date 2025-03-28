import { useState } from 'react';
import axios from 'axios';

export default function APITesting() {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [token, setToken] = useState('');
  const [targetUrl, setTargetUrl] = useState('http://localhost:3000/api/data'); // ตั้งค่าเริ่มต้น
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestToken = async () => {
    try {
      setLoading(true);

      // เปลี่ยนจาก axios.post() เป็น axios.get() เพื่อรองรับ GET method
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_MY_AUTH_SERVICE}/api/token`, 
        {
          params: {
            client_id: clientId,
            client_secret: clientSecret,
          },
        }
      );

      console.log('✅ Token received:', res.data);

      const receivedToken = res.data.token || res.data.access_token;
      if (!receivedToken) {
        setResult({ success: false, message: 'No token received from API' });
        return;
      }

      setToken(receivedToken);
      setResult({ success: true, message: 'Token received!' });
    } catch (err) {
      console.error('❌ Token Error:', err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Token request failed';
      setResult({ success: false, message: `Token Error: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  const requestData = async () => {
    if (!token || !token.trim()) {
      setResult({ success: false, message: 'No valid token available' });
      return;
    }

    try {
      setLoading(true);
      console.log('📡 Sending request to:', targetUrl);
      console.log('🔑 Using token:', token);

      if (!token.trim()) {
        console.error('❌ Invalid token: Token is empty or undefined');
        setResult({ success: false, message: 'Invalid token' });
        return;
      }

      const res = await axios.get(targetUrl, {
        headers: {
          Authorization: `Bearer ${token.trim()}`,
        },
      });

      console.log('✅ API Response:', res.data);

      setResult({
        success: true,
        message: JSON.stringify(res.data, null, 2),
      });
    } catch (err) {
      console.error('❌ Data Request Error:', err);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Data request failed';
      setResult({ success: false, message: `Data Error: ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative h-screen w-screen bg-[#CBDCA3] font-['Press_Start_2P'] text-xs text-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 nes-container is-rounded bg-white w-full max-w-sm px-4 py-5">
        <h1 className="text-center text-base mb-4">API Testing</h1>
        <hr className="nes-divider" />

        {/* Credential */}
        <div className="mb-5 mt-4">
          <h2 className="mb-3 text-sm font-bold">Credential</h2>
          <label>Client ID</label>
          <input
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="nes-input mb-2 w-full"
          />
          <label>Client Secret</label>
          <input
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            type="password"
            className="nes-input mb-3 w-full"
          />
          <button onClick={requestToken} className="nes-btn is-success w-full">
            Request Token
          </button>
        </div>

        <hr className="nes-divider" />

        {/* Call Data API */}
        <div className="mb-5 mt-4">
          <h2 className="mb-3 text-sm font-bold">Call Data API</h2>
          <label>Target URL</label>
          <input
            value={targetUrl}
            onChange={(e) => setTargetUrl(e.target.value)}
            className="nes-input mb-3 w-full"
          />
          <button
            onClick={requestData}
            disabled={!targetUrl || !token}
            className={`nes-btn w-full ${!targetUrl || !token ? 'is-disabled' : 'is-primary'}`}
          >
            Request Data
          </button>
        </div>

        <hr className="nes-divider" />

        {/* JWT Token */}
        <div className="mb-5 mt-4">
          <h2 className="mb-3 text-sm font-bold">JWT Token</h2>
          <textarea
            value={token}
            readOnly
            className="w-full h-32 nes-textarea"
            placeholder="Token will appear here"
          />
        </div>

        <hr className="nes-divider" />

        {/* Result */}
        <div className="mt-4">
          <h2 className="mb-3 text-sm font-bold">Result</h2>
          <div
            className={`nes-container is-rounded w-full min-h-[80px] ${
              result?.success === false ? 'is-error' : 'is-light'
            }`}
          >
            <p
              className={`whitespace-pre-wrap break-words w-full ${
                loading || !result ? 'text-gray-400' : ''
              }`}
            >
              {loading
                ? 'Loading...'
                : result
                ? result.message
                : 'Result from API will appear here'}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
