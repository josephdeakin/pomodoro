export interface PomodoroSettings {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  useSequence: boolean;
  pomodorosCompleted: number;
  sound: string;
  playSoundOnFinish: boolean;
  alertVolume: number;
  theme: string;
  playStartSound: boolean;
}

export type TimerMode = "pomodoro" | "short break" | "long break";

export interface TimeLeft {
  minutes: number;
  seconds: number;
}
