import { useEffect, useState, useCallback } from "react";
import { SOUND_FILES } from "@/constants/sounds";

export function useAudio(soundName: string, volume: number) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const soundFile = SOUND_FILES[soundName] || SOUND_FILES.Bell;
    const newAudio = new Audio(soundFile);
    setAudio(newAudio);

    return () => {
      newAudio.pause();
      newAudio.src = "";
    };
  }, [soundName]);

  useEffect(() => {
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume / 100));
    }
  }, [audio, volume]);

  const playSound = useCallback(async () => {
    if (!audio) return;

    try {
      audio.currentTime = 0;
      await audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, [audio]);

  return { playSound };
}
