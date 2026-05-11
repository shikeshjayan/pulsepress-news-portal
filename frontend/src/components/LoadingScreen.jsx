const LoadingScreen = () => {
  return (
    <div role="status" aria-live="polite" aria-label="Loading" className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-700 border-t-red-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 bg-red-600 rounded-full animate-pulse" />
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-bold text-white tracking-tight">
        PulsePress
      </h1>
      <p className="mt-2 text-gray-400 text-sm">
        Waking up the server...
      </p>

      <div className="mt-8 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 bg-red-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>

      <p className="mt-6 text-xs text-gray-600">
        This may take 30-60 seconds on first visit
      </p>
    </div>
  );
};

export default LoadingScreen;
