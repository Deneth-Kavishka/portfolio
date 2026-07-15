import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-500 px-6">
      <div className="text-center">
        {/* 404 number */}
        <h1 className="text-[10rem] md:text-[14rem] font-bold gradient-text leading-none select-none">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 -mt-4">
          Page Not Found
        </h2>

        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:from-primary-400 hover:to-primary-500 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.4)]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
