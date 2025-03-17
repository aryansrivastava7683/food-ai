"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { geminiRes } from "./gemini";

export default function Chat() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, I am a Food Identifying bot :D", image: null },
  ]);
  const router = useRouter();
  const chatRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const imageUrl = URL.createObjectURL(file);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: "Uploading image...", image: imageUrl },
    ]);

    try {
      /*
      const response = await fetch("http://134.209.159.121:8000/predict/", {
        method: "POST",
        body: formData,
        */
        const response = await fetch("../api/proxy", {
          method: "POST",
          body: formData,
        
        
      });

      

      const data = await response.json();

      if (response.ok) {
        const foodName = data.prediction;
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Prediction: ${foodName}`, image: null },
        ]);

        
        const geminiResponse = await geminiRes(foodName);
      //const geminiResponse = await geminiRes(imageUrl);
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: geminiResponse, image: null },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: `Error: ${data.detail || "Unable to identify food"}`, image: null },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Failed to reach server. Please try again later.", image: null },
      ]);
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 h-screen text-white">
      <div className="bg-gray-800 shadow-lg p-4 font-semibold text-xl text-center">
        AI Food Identifier
      </div>

      <div
        ref={chatRef}
        className="flex-1 space-y-4 mx-auto p-4 md:w-1/2 overflow-y-auto font-comic scrollbar-hide"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs md:max-w-sm ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-white"
              }`}
            >
              {msg.sender === "user" ? "You:" : "AI:"}
              {msg.text && <p>{msg.text}</p>}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Uploaded"
                  className="mt-2 rounded-lg w-40"
                  onLoad={() => URL.revokeObjectURL(msg.image)}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center bg-gray-800 p-4">
        <label
          htmlFor="imageUpload"
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg text-white cursor-pointer"
        >
          Upload Image
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
