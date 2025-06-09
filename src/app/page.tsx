"use client";

import { useState, useEffect } from "react";
import SettingsModal from "./components/SettingsModal";

export default function Home() {
  const [mode, setMode] = useState<"pomodoro" | "short break" | "long break">(
    "pomodoro"
  );
  const [timeLeft, setTimeLeft] = useState({ minutes: 25, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState(25 * 60); // in seconds
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
    useSequence: true,
    pomodorosCompleted: 0,
    sound: "Bell",
    playSoundOnFinish: true,
    alertVolume: 80,
    theme: "Purple",
    showBrowserNotification: false,
  });

  // Add audio for timer finish
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    if (typeof window !== "undefined") {
      // Map sound names to their correct file paths
      const soundFiles: Record<string, string> = {
        Bell: "/sounds/bell.mp3",
        Geese: "/sounds/geese.wav",
        "Slot Machine": "/sounds/slorMachine.wav",
      };

      const soundFile = soundFiles[settings.sound] || "/sounds/bell.mp3";
      const newAudio = new Audio(soundFile);
      setAudio(newAudio);
    }
  }, [settings.sound]);

  useEffect(() => {
    if (audio) {
      audio.volume = settings.alertVolume / 100;
    }
  }, [settings.alertVolume, audio]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && startTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, totalDuration - elapsed);

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        setTimeLeft({ minutes, seconds });

        if (remaining === 0) {
          setIsActive(false);
          setStartTime(null);

          // Play sound when timer finishes
          if (settings.playSoundOnFinish && audio) {
            audio.play();
          }

          // Show browser notification
          if (settings.showBrowserNotification && "Notification" in window) {
            if (Notification.permission === "granted") {
              new Notification("Time is up!", {
                body: `${
                  mode.charAt(0).toUpperCase() + mode.slice(1)
                } timer has ended.`,
                icon: "/favicon.ico",
              });
            } else if (Notification.permission !== "denied") {
              Notification.requestPermission();
            }
          }

          // Implement Pomodoro sequence logic
          if (settings.useSequence) {
            if (mode === "pomodoro") {
              // Update completed pomodoros count
              const newPomodorosCompleted = settings.pomodorosCompleted + 1;
              setSettings((prev) => ({
                ...prev,
                pomodorosCompleted: newPomodorosCompleted,
              }));

              // Check if it's time for a long break (after every 3 pomodoros)
              if (newPomodorosCompleted % 3 === 0) {
                setMode("long break");
                const newDuration = settings.longBreak * 60;
                setTotalDuration(newDuration);
                setTimeLeft({ minutes: settings.longBreak, seconds: 0 });
              } else {
                setMode("short break");
                const newDuration = settings.shortBreak * 60;
                setTotalDuration(newDuration);
                setTimeLeft({ minutes: settings.shortBreak, seconds: 0 });
              }
            } else {
              // After any break, go back to pomodoro
              setMode("pomodoro");
              const newDuration = settings.pomodoro * 60;
              setTotalDuration(newDuration);
              setTimeLeft({ minutes: settings.pomodoro, seconds: 0 });
            }

            // Auto-start the next timer after a short delay
            setTimeout(() => {
              setStartTime(Date.now());
              setIsActive(true);
            }, 1000);
          }
        }
      }, 100); // Check more frequently for better accuracy
    } else if (interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, startTime, totalDuration, mode, settings, audio]);

  useEffect(() => {
    // Reset timer when mode changes
    switch (mode) {
      case "pomodoro":
        setTimeLeft({ minutes: settings.pomodoro, seconds: 0 });
        setTotalDuration(settings.pomodoro * 60);
        break;
      case "short break":
        setTimeLeft({ minutes: settings.shortBreak, seconds: 0 });
        setTotalDuration(settings.shortBreak * 60);
        break;
      case "long break":
        setTimeLeft({ minutes: settings.longBreak, seconds: 0 });
        setTotalDuration(settings.longBreak * 60);
        break;
    }
    setIsActive(false);
    setStartTime(null);
  }, [mode, settings]);

  const toggleTimer = () => {
    if (!isActive) {
      // Starting timer - set start time based on current progress
      const currentTotal = timeLeft.minutes * 60 + timeLeft.seconds;
      const elapsed = totalDuration - currentTotal;
      setStartTime(Date.now() - elapsed * 1000);
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setStartTime(null);
    switch (mode) {
      case "pomodoro":
        setTimeLeft({ minutes: settings.pomodoro, seconds: 0 });
        setTotalDuration(settings.pomodoro * 60);
        break;
      case "short break":
        setTimeLeft({ minutes: settings.shortBreak, seconds: 0 });
        setTotalDuration(settings.shortBreak * 60);
        break;
      case "long break":
        setTimeLeft({ minutes: settings.longBreak, seconds: 0 });
        setTotalDuration(settings.longBreak * 60);
        break;
    }
  };

  // Map theme names to gradient classes
  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case "Purple":
        return "bg-gradient-to-b from-purple-800 via-purple-700 to-indigo-900";
      case "Blue":
        return "bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900";
      case "Green":
        return "bg-gradient-to-b from-green-800 via-green-700 to-emerald-900";
      case "Yellow":
        return "bg-gradient-to-b from-yellow-600 via-yellow-700 to-orange-800";
      case "Orange":
        return "bg-gradient-to-b from-orange-600 via-orange-700 to-red-800";
      case "Red":
        return "bg-gradient-to-b from-red-700 via-red-800 to-red-900";
      case "Pink":
        return "bg-gradient-to-b from-pink-600 via-pink-700 to-purple-800";
      default:
        return "bg-gradient-to-b from-purple-800 via-purple-700 to-indigo-900";
    }
  };

  // Handle page visibility changes to sync timer when tab becomes active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isActive && startTime) {
        // Tab became active - force a timer update to sync
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, totalDuration - elapsed);

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        setTimeLeft({ minutes, seconds });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isActive, startTime, totalDuration]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-4 ${getThemeGradient(
        settings.theme
      )}`}
    >
      <div className="z-10 w-full max-w-md flex flex-col items-center">
        {/* Mode selector */}
        <div className="flex space-x-2 bg-white/10 p-1 rounded-full mb-10">
          <button
            className={`px-6 py-2 rounded-full ${
              mode === "pomodoro" ? "bg-white text-gray-800" : "text-white"
            }`}
            onClick={() => setMode("pomodoro")}
          >
            pomodoro
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              mode === "short break" ? "bg-white text-gray-800" : "text-white"
            }`}
            onClick={() => setMode("short break")}
          >
            short break
          </button>
          <button
            className={`px-6 py-2 rounded-full ${
              mode === "long break" ? "bg-white text-gray-800" : "text-white"
            }`}
            onClick={() => setMode("long break")}
          >
            long break
          </button>
        </div>

        {/* Timer display */}
        <div className="text-white text-9xl font-bold mb-8">
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>

        {/* Pomodoro counter */}
        <div className="text-white text-lg mb-4 opacity-80">
          Pomodoros completed: {settings.pomodorosCompleted}
        </div>

        {/* Controls */}
        <div className="flex space-x-4">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-12 rounded-full text-xl"
            onClick={toggleTimer}
          >
            {isActive ? "pause" : "start"}
          </button>

          <button
            className="bg-transparent hover:bg-white/10 text-white p-3 rounded-full"
            onClick={resetTimer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>

          <button
            className="bg-transparent hover:bg-white/10 text-white p-3 rounded-full"
            onClick={() => setShowSettings(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal
          settings={settings}
          setSettings={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </main>
  );
}
