export default function Loading() {
  return (
    <main className="flex min-h-screen select-none flex-col items-center justify-center p-4 bg-gradient-to-b from-purple-800 via-purple-700 to-indigo-900">
      <div className="z-10 w-full max-w-md flex flex-col items-center">
        <div className="flex space-x-2 bg-white/10 p-1 rounded-full mb-10">
          <div className="px-6 py-2 rounded-full bg-white/20 text-white animate-pulse">
            pomodoro
          </div>
          <div className="px-6 py-2 rounded-full text-white/50">
            short break
          </div>
          <div className="px-6 py-2 rounded-full text-white/50">long break</div>
        </div>

        <div className="text-white text-9xl font-bold mb-8 font-mono animate-pulse">
          25:00
        </div>

        <div className="text-white text-lg mb-4 opacity-60">
          Loading Pomodoro Timer...
        </div>

        <div className="flex space-x-4">
          <div className="bg-white/20 animate-pulse py-3 px-12 rounded-full text-xl h-12 w-24"></div>
          <div className="bg-white/10 animate-pulse p-3 rounded-full h-12 w-12"></div>
          <div className="bg-white/10 animate-pulse p-3 rounded-full h-12 w-12"></div>
        </div>
      </div>
    </main>
  );
}
