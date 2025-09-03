"use client";

// Removed the Phase interface and array typing; use plain JS
const phases = [
  {
    phaseNumber: "01",
    title: "Phase 1",
    tokens: "20,000 NOW",
    status: "Starting Sept 5",
  },
  {
    phaseNumber: "02",
    title: "Phase 2",
    tokens: "17,500 NOW",
    status: "Coming Soon",
  },
  {
    phaseNumber: "03",
    title: "Phase 3",
    tokens: "15,000 NOW",
    status: "Coming Soon",
  },
  {
    phaseNumber: "04",
    title: "Phase 4",
    tokens: "12,500 NOW",
    status: "Final Phase",
  },
];

// Constants to control sticky stacking behavior
const STICKY_TOP_BASE = 96; // px - where the first card pins from the top on large screens
const STICKY_INCREMENT = 72; // px - additional top offset per card
const ITEM_HEIGHT = 280; // px - wrapper height to create scroll distance

// Converted typed props to plain destructuring
function AirdropCard({ phase, index }) {
  const baseTilt = index % 2 === 0 ? "rotate-1" : "-rotate-1";
  const hoverTilt =
    index % 2 === 0 ? "group-hover:rotate-2" : "group-hover:-rotate-2";
  return (
    <div
      className={`group relative rounded-2xl bg-black/60 p-6 sm:p-8 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] transition-all duration-500 will-change-transform ${baseTilt} hover:-translate-y-2 ${hoverTilt}`}
    >
      {/* 🔥 half white border overlay */}
      <div className="absolute inset-0 rounded-2xl border border-gray-400/40 [mask-image:linear-gradient(to right, white 50%, transparent 100%)] pointer-events-none"></div>

      {/* content */}
      <div className="relative z-10">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bold text-green-400">
            {phase.title}
          </h3>
          <span className="font-mono text-xs sm:text-sm text-green-400/70">
            {phase.phaseNumber}
          </span>
        </div>

        <div className="mb-4">
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {phase.tokens}
          </div>
          <div className="mt-2 inline-block rounded-full bg-white/5 px-3 py-1 text-xs sm:text-sm text-gray-300">
            {phase.status}
          </div>
        </div>
      </div>

      {/* tiny decorative lights */}
      <span className="absolute right-4 top-4 h-2 w-2 animate-pulse rounded-full bg-white/30" />
      <span className="absolute bottom-4 left-4 h-1 w-1 animate-pulse rounded-full bg-white/20 [animation-delay:1s]" />
    </div>
  );
}

export default function AirdropTime() {
  return (
    <section className="relative w-full min-h-screen overflow-x-clip overflow-y-visible bg-black text-white">
      {/* background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute -bottom-40 left-10 h-72 w-72 rounded-full bg-green-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        {/* Left column */}
        <div className="flex w-full flex-col justify-center px-6 sm:px-10 md:px-12 lg:w-1/2 lg:px-16 py-16 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)]">
          <h1 className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="text-white">Airdrop</span>{" "}
            <span className="text-green-400">Section</span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-xl sm:text-2xl text-gray-200">
            GET PAID TO TRY{" "}
            <span className="text-green-400 font-semibold">THE FUTURE</span>
          </p>
        </div>

        <div className="relative flex w-full flex-col justify-center px-6 sm:px-10 md:px-12 lg:w-1/2 lg:px-16 py-16">
          <div className="relative mx-auto max-w-xl lg:ml-32 lg:h-[200vh]">
            {phases.map((p, i) => (
              <div
                key={p.phaseNumber}
                className="relative"
                style={{ height: ITEM_HEIGHT }}
              >
                <div
                  className="sticky transition-all duration-500"
                  style={{
                    top: `${STICKY_TOP_BASE}px`,
                    zIndex: 10 + i,
                    transform: `translateY(${i * 8}px) translateX(${
                      80 + i * 10
                    }px)`,
                    // 👆 base 80px shift + 10px extra per card
                  }}
                >
                  <AirdropCard phase={p} index={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 animate-pulse rounded-full bg-green-400/30"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              animationDelay: `${(i % 7) * 0.25}s`,
              animationDuration: `${2 + (i % 5) * 0.3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
