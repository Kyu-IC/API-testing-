import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#CBDCA3] flex flex-col items-center justify-center font-['Press_Start_2P'] text-center">
      <Link href="/APITesting">
        <button className="nes-btn is-primary">API Testing</button>
      </Link>
    </main>
  );
}
