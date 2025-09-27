import { useState, useEffect, useCallback } from "react";
import type { TimerMode, TimeLeft, PomodoroSettings } from "@/types/settings";

interface UseTimerProps {
  mode: TimerMode;
  settings: PomodoroSettings;
  onTimerComplete: () => void;
  onStartSoundTrigger: () => void;
}

export function useTimer({
  mode,
  settings,
  onTimerComplete,
  onStartSoundTrigger,
}: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    minutes: 25,
    seconds: 0,
  });
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalDuration, setTotalDuration] = useState(25 * 60);
  const [hasPlayedStartSound, setHasPlayedStartSound] = useState(false);

  const getDurationForMode = useCallback(
    (currentMode: TimerMode): number => {
      switch (currentMode) {
        case "pomodoro":
          return settings.pomodoro * 60;
        case "short break":
          return settings.shortBreak * 60;
        case "long break":
          return settings.longBreak * 60;
        default:
          return settings.pomodoro * 60;
      }
    },
    [settings]
  );

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setStartTime(null);
    setHasPlayedStartSound(false);

    const duration = getDurationForMode(mode);
    setTotalDuration(duration);
    setTimeLeft({
      minutes: Math.floor(duration / 60),
      seconds: duration % 60,
    });
  }, [mode, getDurationForMode]);

  const toggleTimer = useCallback(() => {
    if (!isActive) {
      const currentTotal = timeLeft.minutes * 60 + timeLeft.seconds;
      const elapsed = totalDuration - currentTotal;
      setStartTime(Date.now() - elapsed * 1000);
    }
    setIsActive(!isActive);
  }, [isActive, timeLeft, totalDuration]);

  useEffect(() => {
    resetTimer();
  }, [mode, settings, resetTimer]);

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

        if (
          settings.playStartSound &&
          !hasPlayedStartSound &&
          remaining === 3 &&
          (mode === "short break" || mode === "long break")
        ) {
          onStartSoundTrigger();
          setHasPlayedStartSound(true);
        }

        if (remaining === 0) {
          setIsActive(false);
          setStartTime(null);
          setHasPlayedStartSound(false);
          onTimerComplete();
        }
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isActive,
    startTime,
    totalDuration,
    mode,
    settings.playStartSound,
    hasPlayedStartSound,
    onTimerComplete,
    onStartSoundTrigger,
  ]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && isActive && startTime) {
        const now = Date.now();
        const elapsed = Math.floor((now - startTime) / 1000);
        const remaining = Math.max(0, totalDuration - elapsed);

        const minutes = Math.floor(remaining / 60);
        const seconds = remaining % 60;

        setTimeLeft({ minutes, seconds });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isActive, startTime, totalDuration]);

  return {
    timeLeft,
    isActive,
    toggleTimer,
    resetTimer,
  };
}
