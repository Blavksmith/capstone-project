"use client";

import { useState } from "react";

export default function Home() {
  const [word, setWord] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // List kata random (bisa ditambah sesuai selera)
  const randomWords = ["moon", "pizza", "star", "music", "chocolate", "ocean", "bag", "pillow"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: word }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setResponse(data.output || "No response from model");
    } catch (err) {
      console.error(err);
      setResponse("Error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Fitur Copy ke Clipboard
  const handleCopy = async () => {
    if (!response) return;
    try {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Fitur Random Mode
  const handleRandomWord = () => {
    const random = randomWords[Math.floor(Math.random() * randomWords.length)];
    setWord(random);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-300 via-purple-300 to-indigo-300 p-6">
      <h1 className="text-4xl font-extrabold mb-6 text-white drop-shadow-lg tracking-wide">
        Pickup Line Generator 💘
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 bg-white/30 backdrop-blur-lg p-6 rounded-2xl shadow-xl"
      >
        <input
          type="text"
          className="w-full p-3 rounded-xl border-2 border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-300 text-gray-900 placeholder-gray-500"
          placeholder="Enter an english word (example: coffee ☕)"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:opacity-90 transition"
            disabled={loading}
          >
            {loading ? "Creating..." : "Generate"}
          </button>
          <button
            type="button"
            onClick={handleRandomWord}
            className="px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-xl shadow-md hover:bg-yellow-500 transition"
          >
            🎲
          </button>
        </div>
      </form>

      {response && (
        <div className="mt-8 p-6 w-full max-w-md bg-white rounded-2xl shadow-lg text-center">
          <h2 className="font-bold text-lg text-gray-800 mb-4">⚡ Your Pickup Line ⚡</h2>
          <p className="text-2xl font-medium italic text-pink-700 leading-relaxed mb-4">
            “{response}”
          </p>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition"
          >
            {copied ? "✅ Copied!" : "📋 Copy"}
          </button>
        </div>
      )}
    </div>
  );
}
