import type { PomodoroSettings } from "@/types/settings";

export const SOUND_FILES: Record<string, string> = {
  Bell: "/sounds/bellTrim.mp3",
  Geese: "/sounds/geese.wav",
  "Slot Machine": "/sounds/slotMachine.wav",
  Alert: "/sounds/alert.mp3",
  Beep: "/sounds/beep.mp3",
  "GTA Car Horn": "/sounds/carHornGTA.mp3",
  "Cha Ching": "/sounds/chaChing.mp3",
  "New Bell": "/sounds/newBell.mp3",
  "Eagle 🦅🇺🇸": "/sounds/uSAEagle.mp3",
  "Vinyl Rewind": "/sounds/vinylRewind.mp3",
  "Yeah Boy": "/sounds/yeahBoy.mp3",
};

export const DEFAULT_SETTINGS: PomodoroSettings = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 10,
  useSequence: true,
  pomodorosCompleted: 0,
  sound: "Bell",
  playSoundOnFinish: true,
  alertVolume: 80,
  theme: "Purple",
  playStartSound: true,
};

export const SOUND_OPTIONS = [
  { value: "Bell", label: "🔔 Bell" },
  { value: "Geese", label: "🦢 Geese" },
  { value: "Slot Machine", label: "🎰 Slot Machine" },
  { value: "Alert", label: "⚠️ Alert" },
  { value: "Beep", label: "🔊 Beep" },
  { value: "GTA Car Horn", label: "🚗 GTA Car Horn" },
  { value: "Cha Ching", label: "💰 Cha Ching" },
  { value: "New Bell", label: "🛎️ New Bell" },
  { value: "Eagle 🦅🇺🇸", label: "🦅 Eagle 🇺🇸🇺🇸🇺🇸🇺🇸" },
  { value: "Vinyl Rewind", label: "💿 Vinyl Rewind" },
  { value: "Yeah Boy", label: "🎉 Yeah Boy" },
];
