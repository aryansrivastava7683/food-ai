"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(() => {
        console.log("Service Worker registered");
      });
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log("Install prompt available");
    });
  }, []);

  const handleDownload = () => {
    const apkUrl = "/app-release.apk"; // File path inside the public folder
    const link = document.createElement("a");
    link.href = apkUrl;
    link.download = "myapp.apk"; // Forces download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    } else {
      alert("Install not available");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-8 min-h-screen">
      <main className="flex flex-col items-center gap-8">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="font-bold text-2xl">Welcome to Food Track</h1>
        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            Install App
          </button>
          <button
            onClick={() => router.push("/login")}
            className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
