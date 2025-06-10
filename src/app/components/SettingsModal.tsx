import { useState, useRef } from "react";

// Custom styles for the slider
const sliderStyles = `
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgb(147 51 234), rgb(59 130 246));
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border: 2px solid white;
  }
  .slider::-moz-range-thumb {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgb(147 51 234), rgb(59 130 246));
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    border: 2px solid white;
  }
`;

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
  };
  setSettings: (settings: {
    pomodoro: number;
    shortBreak: number;
    longBreak: number;
    useSequence: boolean;
    pomodorosCompleted: number;
    sound: string;
    playSoundOnFinish: boolean;
    alertVolume: number;
    theme: string;
  }) => void;
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
      theme: "Purple",
    });
  };

  const playSound = () => {
    // Define sound options as a type to ensure type safety
    type SoundOption =
      | "Bell"
      | "Geese"
      | "Slot Machine"
      | "Alert"
      | "Beep"
      | "GTA Car Horn"
      | "Cha Ching"
      | "New Bell"
      | "Eagle 🦅🇺🇸"
      | "Vinyl Rewind"
      | "Yeah Boy";

    // Map sound names to their correct file paths
    const soundFiles: Record<SoundOption, string> = {
      Bell: "/sounds/bellTrim.mp3",
      Geese: "/sounds/geese.wav",
      "Slot Machine": "/sounds/slotMachine.wav",
      Alert: "sounds/alert.mp3",
      Beep: "sounds/beep.mp3",
      "GTA Car Horn": "sounds/carHornGTA.mp3",
      "Cha Ching": "sounds/chaChing.mp3",
      "New Bell": "sounds/newBell.mp3",
      "Eagle 🦅🇺🇸": "sounds/uSAEagle.mp3",
      "Vinyl Rewind": "sounds/vinylRewind.mp3",
      "Yeah Boy": "sounds/yeahBoy.mp3",
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
    <>
      <style>{sliderStyles}</style>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-700/50 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-6 border-b border-gray-700/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
                <p className="text-gray-400 text-sm mt-1">
                  Customize your Pomodoro experience
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
              >
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
          </div>

          {/* Mobile Tab Navigation */}
          <div className="md:hidden border-b border-gray-700/50">
            <nav className="flex">
              {[
                { name: "Colour", icon: "🎨" },
                { name: "Timers", icon: "⏱️" },
                { name: "Sounds", icon: "🔊" },
              ].map((tab) => (
                <button
                  key={tab.name}
                  className={`flex-1 px-4 py-4 transition-all duration-200 flex flex-col items-center space-y-1 ${
                    activeTab === tab.name
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => setActiveTab(tab.name)}
                >
                  <span className="text-lg">{tab.icon}</span>
                  <span className="text-xs font-medium">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex">
            {/* Desktop Sidebar Navigation */}
            <div className="hidden md:block w-48 bg-gray-800/50 p-6 border-r border-gray-700/50">
              <nav className="space-y-2">
                {[
                  { name: "Colour", icon: "🎨" },
                  { name: "Timers", icon: "⏱️" },
                  { name: "Sounds", icon: "🔊" },
                ].map((tab) => (
                  <button
                    key={tab.name}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                      activeTab === tab.name
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg transform scale-105"
                        : "text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-4 md:p-6 h-108 overflow-y-auto">
              {/* Timers Tab */}
              {activeTab === "Timers" && (
                <div className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                    {/* Pomodoro Timer */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-red-500/50 group">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white tracking-wide h-14 flex items-center justify-center">
                          Pomodoro
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={localSettings.pomodoro}
                          onChange={(e) => {
                            const value = Math.max(
                              1,
                              Math.min(99, Number(e.target.value) || 1)
                            );
                            setLocalSettings({
                              ...localSettings,
                              pomodoro: value,
                            });
                          }}
                          className="w-full bg-gradient-to-br from-gray-900/80 to-black/60 border border-gray-500/50 rounded-xl p-4 text-white text-center text-xl font-bold focus:ring-2 focus:ring-red-500/50 focus:border-red-400 transition-all duration-200 shadow-inner hover:border-gray-400/70 group-hover:border-red-400/50 flex items-center justify-center"
                        />
                        <div className="text-gray-300 text-sm text-center font-medium">
                          minutes
                        </div>
                      </div>
                    </div>

                    {/* Short Break Timer */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-green-500/50 group">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white tracking-wide h-14 flex items-center justify-center">
                          Short Break
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={localSettings.shortBreak}
                          onChange={(e) => {
                            const value = Math.max(
                              1,
                              Math.min(99, Number(e.target.value) || 1)
                            );
                            setLocalSettings({
                              ...localSettings,
                              shortBreak: value,
                            });
                          }}
                          className="w-full bg-gradient-to-br from-gray-900/80 to-black/60 border border-gray-500/50 rounded-xl p-4 text-white text-center text-xl font-bold focus:ring-2 focus:ring-green-500/50 focus:border-green-400 transition-all duration-200 shadow-inner hover:border-gray-400/70 group-hover:border-green-400/50 flex items-center justify-center"
                        />
                        <div className="text-gray-300 text-sm text-center font-medium">
                          minutes
                        </div>
                      </div>
                    </div>

                    {/* Long Break Timer */}
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-blue-500/50 group">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white tracking-wide h-14 flex items-center justify-center">
                          Long Break
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <input
                          type="number"
                          min="1"
                          max="99"
                          value={localSettings.longBreak}
                          onChange={(e) => {
                            const value = Math.max(
                              1,
                              Math.min(99, Number(e.target.value) || 1)
                            );
                            setLocalSettings({
                              ...localSettings,
                              longBreak: value,
                            });
                          }}
                          className="w-full bg-gradient-to-br from-gray-900/80 to-black/60 border border-gray-500/50 rounded-xl p-4 text-white text-center text-xl font-bold focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-200 shadow-inner hover:border-gray-400/70 group-hover:border-blue-400/50 flex items-center justify-center"
                        />
                        <div className="text-gray-300 text-sm text-center font-medium">
                          minutes
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 p-4 md:p-6 rounded-xl border border-gray-700/30">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          Auto-sequence
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Automatically switch between work and breaks
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
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
                        <div className="relative w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Sounds Tab */}
              {activeTab === "Sounds" && (
                <div className="space-y-6 mt-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Alert Sound
                    </h3>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <select
                          value={localSettings.sound}
                          onChange={(e) =>
                            setLocalSettings({
                              ...localSettings,
                              sound: e.target.value,
                            })
                          }
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg p-3 text-white appearance-none pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Bell">🔔 Bell</option>
                          <option value="Geese">🦢 Geese</option>
                          <option value="Slot Machine">🎰 Slot Machine</option>
                          <option value="Alert">⚠️ Alert</option>
                          <option value="Beep">🔊 Beep</option>
                          <option value="GTA Car Horn">🚗 GTA Car Horn</option>
                          <option value="Cha Ching">💰 Cha Ching</option>
                          <option value="New Bell">🛎️ New Bell</option>
                          <option value="Eagle 🦅🇺🇸">🦅 Eagle 🇺🇸🇺🇸🇺🇸🇺🇸</option>
                          <option value="Vinyl Rewind">💿 Vinyl Rewind</option>
                          <option value="Yeah Boy">🎉 Yeah Boy</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                      <button
                        onClick={playSound}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white p-3 rounded-lg flex items-center justify-center transition-all duration-200 shadow-lg"
                        title="Play sound"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
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

                  <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          Sound Notifications
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Play sound when timer finishes
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={localSettings.playSoundOnFinish}
                          onChange={() =>
                            setLocalSettings({
                              ...localSettings,
                              playSoundOnFinish:
                                !localSettings.playSoundOnFinish,
                            })
                          }
                          className="sr-only peer"
                        />
                        <div className="relative w-14 h-7 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-blue-600"></div>
                      </label>
                    </div>
                  </div>

                  <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/30">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Volume
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">🔈</span>
                        <span className="text-white font-medium">
                          {localSettings.alertVolume}%
                        </span>
                        <span className="text-gray-400 text-sm">🔊</span>
                      </div>
                      <div className="relative">
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
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                          style={{
                            background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(59 130 246) ${localSettings.alertVolume}%, rgb(55 65 81) ${localSettings.alertVolume}%, rgb(55 65 81) 100%)`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* General Tab */}
              {activeTab === "Colour" && (
                <div className="relative h-full">
                  <div className="space-y-6 mt-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Theme
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {[
                          {
                            name: "Purple",
                            color: "from-purple-600 to-indigo-600",
                          },
                          { name: "Blue", color: "from-blue-600 to-cyan-600" },
                          {
                            name: "Green",
                            color: "from-green-600 to-emerald-600",
                          },
                          {
                            name: "Yellow",
                            color: "from-yellow-500 to-orange-500",
                          },
                          {
                            name: "Orange",
                            color: "from-orange-500 to-red-500",
                          },
                          { name: "Red", color: "from-red-600 to-pink-600" },
                          {
                            name: "Pink",
                            color: "from-pink-600 to-purple-600",
                          },
                        ].map((theme) => (
                          <button
                            key={theme.name}
                            onClick={() =>
                              setLocalSettings({
                                ...localSettings,
                                theme: theme.name,
                              })
                            }
                            className={`relative p-3 md:p-4 rounded-xl bg-gradient-to-br ${
                              theme.color
                            } transition-all duration-200 hover:scale-105 ${
                              localSettings.theme === theme.name
                                ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800 shadow-lg"
                                : "hover:shadow-lg"
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-white text-xs md:text-sm font-medium">
                                {theme.name}
                              </div>
                            </div>
                            {localSettings.theme === theme.name && (
                              <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center">
                                <svg
                                  className="w-3 h-3 md:w-4 md:h-4 text-green-600"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Version Info */}
                  <div className="absolute bottom-0 right-0">
                    <p className="text-gray-400 text-xs">v 0.0.3</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-gray-800/30 border-t border-gray-700/50 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
              <button
                onClick={handleReset}
                className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 hover:text-red-300 px-4 md:px-6 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 order-2 sm:order-1"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Reset All</span>
              </button>

              <div className="flex space-x-3 order-1 sm:order-2">
                <button
                  onClick={onClose}
                  className="flex-1 sm:flex-none bg-gray-700 hover:bg-gray-600 text-white px-4 md:px-6 py-2.5 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 sm:flex-none bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 md:px-6 py-2.5 rounded-lg transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
