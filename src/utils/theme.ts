export const getThemeGradient = (theme: string): string => {
  const themes: Record<string, string> = {
    Purple: "bg-gradient-to-b from-purple-800 via-purple-700 to-indigo-900",
    Blue: "bg-gradient-to-b from-blue-800 via-blue-700 to-blue-900",
    Green: "bg-gradient-to-b from-green-800 via-green-700 to-emerald-900",
    Yellow: "bg-gradient-to-b from-yellow-600 via-yellow-700 to-orange-800",
    Orange: "bg-gradient-to-b from-orange-600 via-orange-700 to-red-800",
    Red: "bg-gradient-to-b from-red-700 via-red-800 to-red-900",
    Pink: "bg-gradient-to-b from-pink-600 via-pink-700 to-purple-800",
  };

  return themes[theme] || themes.Purple;
};

export const THEME_OPTIONS = [
  { name: "Purple", color: "from-purple-600 to-indigo-600" },
  { name: "Blue", color: "from-blue-600 to-cyan-600" },
  { name: "Green", color: "from-green-600 to-emerald-600" },
  { name: "Yellow", color: "from-yellow-500 to-orange-500" },
  { name: "Orange", color: "from-orange-500 to-red-500" },
  { name: "Red", color: "from-red-600 to-pink-600" },
  { name: "Pink", color: "from-pink-600 to-purple-600" },
];
