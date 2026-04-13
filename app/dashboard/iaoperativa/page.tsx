"use client";

import { useState, useEffect, useRef } from "react";
import { fetchHablarIaElevenLabs } from "@/lib/api/fetcher";

type CallState = "idle" | "listening" | "processing" | "speaking";

export default function IaOperativaPage() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Inicia el reconocimiento de voz
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Tu navegador no soporta reconocimiento de voz.");
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognition();
    recognition.lang = "es-ES";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setCallState("processing");

      try {
        await fetchHablarIaElevenLabs(text);
      } catch {
        setError("Error al comunicarse con la IA.");
      } finally {
        setCallState("idle");
      }
    };

    recognition.onerror = (event) => {
      if (event.error !== "aborted") {
        setError(`Error de micrófono: ${event.error}`);
      }
      setCallState("idle");
    };

    recognition.onend = () => {
      if (callState === "listening") setCallState("idle");
    };

    recognition.start();
    setCallState("listening");
    setError(null);
  };

  const stopListening = () => {
    recognitionRef.current?.abort();
    setCallState("idle");
  };

  const handleToggle = () => {
    if (callState === "idle") {
      startListening();
    } else if (callState === "listening") {
      stopListening();
    }
    // Si está processing o speaking no hace nada (espera que termine)
  };

  // Limpieza al desmontar
  useEffect(() => {
    return () => recognitionRef.current?.abort();
  }, []);

  const isActive = callState !== "idle";
  const isLoading = callState === "processing";

  const stateLabel: Record<CallState, string> = {
    idle: "Toca para hablar",
    listening: "Escuchando... toca para cancelar",
    processing: "Procesando...",
    speaking: "IA respondiendo...",
  };

  const buttonColor: Record<CallState, string> = {
    idle: "bg-emerald-500 hover:bg-emerald-600 hover:scale-105",
    listening: "bg-red-500 hover:bg-red-600 scale-110",
    processing: "bg-yellow-500 cursor-not-allowed scale-105",
    speaking: "bg-blue-500 cursor-not-allowed scale-105",
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] gap-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Title */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
          IA Operativa
        </h2>
        <p className="text-sm text-muted-foreground">
          {stateLabel[callState]}
        </p>
      </div>

      {/* Mic button */}
      <div className="relative flex items-center justify-center">
        {/* Pulse rings */}
        {callState === "listening" && (
          <>
            <span className="absolute inline-flex h-36 w-36 rounded-full bg-red-500/20 animate-ping" />
            <span className="absolute inline-flex h-28 w-28 rounded-full bg-red-500/25 animate-ping [animation-delay:0.35s]" />
          </>
        )}
        {callState === "processing" && (
          <span className="absolute inline-flex h-32 w-32 rounded-full border-4 border-yellow-400/50 border-t-yellow-400 animate-spin" />
        )}

        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`
            relative z-10 flex items-center justify-center
            h-24 w-24 rounded-full shadow-lg
            transition-all duration-300 focus:outline-none
            focus-visible:ring-4 focus-visible:ring-emerald-400
            ${buttonColor[callState]}
          `}
          aria-label={stateLabel[callState]}
        >
          {/* Microphone icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-10 w-10 text-white"
          >
            <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
            <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.041h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.041a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
          </svg>
        </button>
      </div>

      {/* Status badge */}
      <span
        className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
          callState === "listening"
            ? "text-red-500"
            : callState === "processing"
            ? "text-yellow-500"
            : "text-emerald-500"
        }`}
      >
        {isActive ? callState : "listo"}
      </span>

      {/* Transcript */}
      {transcript && (
        <div className="max-w-sm w-full rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 px-5 py-4 text-center text-sm text-neutral-700 dark:text-neutral-300 backdrop-blur-sm">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mb-1">
            Tú dijiste
          </p>
          <p>"{transcript}"</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="max-w-sm w-full rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 px-5 py-3 text-center text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
    </div>
  );
}
