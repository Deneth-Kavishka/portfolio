/* eslint-disable @next/next/no-img-element */
export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="animate-pulse">
          <img
            src="/logo.png"
            alt="DK Logo"
            width={112}
            height={112}
            //className="w-[112px] h-[112px] object-contain drop-shadow-[0_0_16px_rgba(99,102,241,0.5)]"
           className="w-[112px] h-[112px] object-contain drop-shadow-[0_0_16px_rgba(0,136,204,0.5)]"
          />
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
