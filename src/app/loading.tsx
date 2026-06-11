export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="text-5xl font-bold gradient-text animate-pulse">
          DK
        </div>

        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary-500 border-r-accent-500 animate-spin" />
          <div className="absolute inset-1 rounded-full border-2 border-transparent border-b-primary-400 border-l-accent-400 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
        </div>

        {/* Text */}
        <p className="text-text-muted text-sm animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
