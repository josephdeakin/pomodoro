"use client";

import { useState, useCallback, useMemo } from "react";
import SettingsModal from "./components/SettingsModal";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTimer } from "@/hooks/useTimer";
import { useAudio } from "@/hooks/useAudio";
import { DEFAULT_SETTINGS } from "@/constants/sounds";
import { getThemeGradient } from "@/utils/theme";
import type { TimerMode, PomodoroSettings } from "@/types/settings";

export default function Home() {
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useLocalStorage<PomodoroSettings>(
    "pomodoroSettings",
    DEFAULT_SETTINGS
  );

  const { playSound: playFinishSound } = useAudio(
    settings.sound,
    settings.alertVolume
  );
  const { playSound: playStartSound } = useAudio("Bell", settings.alertVolume);

  const handleTimerComplete = useCallback(() => {
    if (settings.playSoundOnFinish) {
      if (mode === "pomodoro") {
        playFinishSound();
      } else {
        playStartSound();
      }
    }

    if (settings.useSequence) {
      if (mode === "pomodoro") {
        const newPomodorosCompleted = settings.pomodorosCompleted + 1;
        setSettings((prev) => ({
          ...prev,
          pomodorosCompleted: newPomodorosCompleted,
        }));

        const nextMode: TimerMode =
          newPomodorosCompleted % 3 === 0 ? "long break" : "short break";
        setTimeout(() => setMode(nextMode), 1000);
      } else {
        setTimeout(() => setMode("pomodoro"), 1000);
      }
    }
  }, [mode, settings, playFinishSound, playStartSound, setSettings]);

  const handleStartSoundTrigger = useCallback(() => {
    playStartSound();
  }, [playStartSound]);

  const { timeLeft, isActive, toggleTimer, resetTimer } = useTimer({
    mode,
    settings,
    onTimerComplete: handleTimerComplete,
    onStartSoundTrigger: handleStartSoundTrigger,
  });

  const themeGradient = useMemo(
    () => getThemeGradient(settings.theme),
    [settings.theme]
  );

  return (
    <main
      className={`flex min-h-screen select-none flex-col items-center justify-center p-4 ${themeGradient}`}
    >
      <h1 className="text-2xl text-white/90 mb-8 z-10 font-light text-center">
        Free Pomodoro Timer
      </h1>

      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <nav aria-label="Timer mode selection">
          <div
            className="flex space-x-2 bg-white/10 p-1 rounded-full mb-10"
            role="tablist"
          >
            {(["pomodoro", "short break", "long break"] as const).map(
              (timerMode) => (
                <button
                  key={timerMode}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    mode === timerMode
                      ? "bg-white text-gray-800"
                      : "text-white hover:bg-white/10"
                  }`}
                  onClick={() => setMode(timerMode)}
                  role="tab"
                  aria-selected={mode === timerMode}
                  aria-controls="timer-display"
                >
                  {timerMode}
                </button>
              )
            )}
          </div>
        </nav>

        <div
          id="timer-display"
          className="text-white text-9xl font-bold mb-8 font-mono"
          role="timer"
          aria-live="polite"
          aria-label={`${timeLeft.minutes} minutes and ${timeLeft.seconds} seconds remaining in ${mode} session`}
        >
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>

        <div
          className="text-white text-lg mb-4 opacity-80"
          role="status"
          aria-live="polite"
        >
          Pomodoros completed: {settings.pomodorosCompleted}
        </div>

        <div
          className="flex space-x-4"
          role="group"
          aria-label="Timer controls"
        >
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-12 rounded-full text-xl transition-colors"
            onClick={toggleTimer}
            aria-label={isActive ? "Pause timer" : "Start timer"}
            aria-pressed={isActive}
          >
            {isActive ? "pause" : "start"}
          </button>

          <button
            className="bg-transparent hover:bg-white/10 text-white p-3 rounded-full transition-colors"
            onClick={resetTimer}
            aria-label="Reset timer"
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
            className="bg-transparent hover:bg-white/10 text-white p-3 rounded-full transition-colors"
            onClick={() => setShowSettings(true)}
            aria-label="Open settings"
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
