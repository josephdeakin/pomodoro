import { useState, useRef } from "react";
import Link from "next/link";

interface SettingsProps {
  settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    useSequence: boolean;
    pomodorosCompleted: number;
    sound: string;
    playSoundOnFinish: boolean;
    alertVolume: number;
    theme: string;
    showBrowserNotification: boolean;
  };
  setSettings: (settings: any) => void;
  onClose: () => void;
}

export default function SettingsModal({
  settings,
  setSettings,
  onClose,
}: SettingsProps) {
  const [localSettings, setLocalSettings] = useState({ ...settings });
  const [activeTab, setActiveTab] = useState("Timers");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSave = () => {
    setSettings(localSettings);
    onClose();
  };

  const handleReset = () => {
    setLocalSettings({
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 10,
      useSequence: true,
      pomodorosCompleted: 0,
      sound: "Bell",
      playSoundOnFinish: true,
      alertVolume: 80,
      theme: "Nighttime Countryside",
      showBrowserNotification: false,
    });
  };

  const playSound = () => {
    // Define sound options as a type to ensure type safety
    type SoundOption = "Bell" | "Geese" | "Slot Machine";

    // Map sound names to their correct file paths
    const soundFiles: Record<SoundOption, string> = {
      Bell: "/sounds/bell.mp3",
      Geese: "/sounds/geese.wav",
      "Slot Machine": "/sounds/slotMachine.wav",
    };

    // Get the correct sound file path with type assertion
    const soundFile: string = soundFiles[localSettings.sound as SoundOption];

    // Create or reuse audio element
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    // Set volume and file
    audioRef.current.volume = localSettings.alertVolume / 100;
    audioRef.current.src = soundFile;

    // Play sound
    audioRef.current.play().catch((err) => {
      console.error("Error playing sound:", err);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl w-full max-w-xl p-8 text-white">
        <div className="flex justify-between items-start mb-8">
          <div className="space-y-6">
            {["General", "Timers", "Sounds"].map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer ${
                  activeTab === tab
                    ? "text-white font-bold border-b-2 border-white"
                    : "text-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === "Get Update" && (
                  <span className="ml-2 bg-green-500 text-xs py-0.5 px-2 rounded">
                    New
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 ml-12">
            <div className="flex justify-end">
              <button onClick={onClose} className="text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Timers Tab */}
            {activeTab === "Timers" && (
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-xl mb-2">Pomodoro</h3>
                  <input
                    type="number"
                    value={localSettings.pomodoro}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        pomodoro: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                  />
                  <div className="text-gray-400 mt-1">minutes</div>
                </div>

                <div>
                  <h3 className="text-xl mb-2">Short Break</h3>
                  <input
                    type="number"
                    value={localSettings.shortBreak}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        shortBreak: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                  />
                  <div className="text-gray-400 mt-1">minutes</div>
                </div>

                <div>
                  <h3 className="text-xl mb-2">Long Break</h3>
                  <input
                    type="number"
                    value={localSettings.longBreak}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        longBreak: Number(e.target.value),
                      })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white"
                  />
                  <div className="text-gray-400 mt-1">minutes</div>
                </div>

                <div className="flex items-center mt-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.useSequence}
                      onChange={() =>
                        setLocalSettings({
                          ...localSettings,
                          useSequence: !localSettings.useSequence,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-700 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ms-3 text-white">
                      Auto-switch between work and breaks
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Sounds Tab */}
            {activeTab === "Sounds" && (
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-xl mb-2">Select alert sound:</h3>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <select
                        value={localSettings.sound}
                        onChange={(e) =>
                          setLocalSettings({
                            ...localSettings,
                            sound: e.target.value,
                          })
                        }
                        className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white appearance-none pr-8"
                      >
                        <option value="Bell">Bell</option>
                        <option value="Geese">Geese</option>
                        <option value="Slot Machine">Slot Machine</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <button
                      onClick={playSound}
                      className="bg-gray-700 hover:bg-gray-600 p-2 rounded flex items-center justify-center"
                      title="Play sound"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.playSoundOnFinish}
                      onChange={() =>
                        setLocalSettings({
                          ...localSettings,
                          playSoundOnFinish: !localSettings.playSoundOnFinish,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-700 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ms-3 text-white">
                      Play sound when timer finishes
                    </span>
                  </label>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl mb-2">Alert volume</h3>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={localSettings.alertVolume}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        alertVolume: Number(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {/* General Tab */}
            {activeTab === "General" && (
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-xl mb-2">Select theme:</h3>
                  <div className="relative">
                    <select
                      value={localSettings.theme}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          theme: e.target.value,
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white appearance-none pr-8"
                    >
                      <option value="Nighttime Countryside">
                        Nighttime Countryside
                      </option>
                      <option value="Forest">Forest</option>
                      <option value="Ocean">Ocean</option>
                      <option value="City">City</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={localSettings.showBrowserNotification}
                      onChange={() =>
                        setLocalSettings({
                          ...localSettings,
                          showBrowserNotification:
                            !localSettings.showBrowserNotification,
                        })
                      }
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-700 peer-checked:bg-blue-600 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    <span className="ms-3">
                      <span className="text-white">
                        Show browser notification when timer finishes{" "}
                      </span>
                      <span className="text-gray-400">(beta)</span>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handleReset}
            className="border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-500/10"
          >
            Reset all
          </button>

          <div className="space-x-4">
            <button
              onClick={onClose}
              className="bg-gray-700 text-white px-6 py-2 rounded-full hover:bg-gray-600"
            >
              Close
            </button>

            <button
              onClick={handleSave}
              className="bg-white text-gray-900 px-6 py-2 rounded-full hover:bg-gray-200"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
