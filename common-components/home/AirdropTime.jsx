import React from "react";

export function AirdropTime() {
  return (
    <div className="relative w-full min-h-screen bg-brand-background text-white overflow-hidden">
      {/* Enhanced Background with animated grid */}
      <div className="absolute inset-0">
        {/* Animated grid pattern */}
     

        {/* Glowing orbs */}
       
        
        {/* Geometric accent lines */}
     
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Main content */}
        <div className="w-full lg:w-1/2 px-6 sm:px-8 md:px-12 py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
          <div className="max-w-2xl mx-auto lg:mx-0">
            {/* Enhanced heading */}
            <div className="mb-8 sm:mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight text-center lg:text-left">
                <span className="text-white">Airdrop</span>{" "}
                <span className="text-brand">
                  Section
                </span>
              </h1>
              
              {/* Moved more to the left and enhanced styling */}
              <div className="text-lg sm:text-xl text-center lg:text-left">
                <h2 className="text-2xl sm:text-xl md:text-4xl font-bold leading-tight">
                  <span className="text-white">GET PAID TO TRY  <span className="text-brand">THE FUTURE</span></span>
                </h2>
              </div>
            </div>

            {/* Enhanced CTA button */}
            
          </div>
        </div>

        {/* Right side - Enhanced tilted feature cards */}
        <div className="w-full lg:w-1/2 px-6 sm:px-8 md:px-12 lg:px-12 xl:px-24 py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
          <div className="space-y-6 sm:space-y-8 max-w-lg mx-auto lg:mx-0 lg:ml-8 xl:ml-20 perspective-1000">
            {data.map((phase, index) => (
              <div 
                key={index}
                className={`group relative bg-gray-950 backdrop-blur-xl border-2 border-gray-300/40 hover:border-gray-200/60 rounded-2xl p-6 sm:p-8 transition-all duration-500 transform hover:-translate-y-2 ${
                  index % 2 === 0 ? 'hover:rotate-1' : 'hover:-rotate-1'
                } hover:shadow-2xl hover:shadow-gray-800/20`}
                style={{
                  transform: window?.innerWidth >= 1024 ? `perspective(1000px) rotateY(${index % 2 === 0 ? '3deg' : '-3deg'}) rotateX(3deg) rotateZ(${index % 2 === 0 ? '1deg' : '-1deg'})` : 'none',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-300/20 to-white/20 opacity-50 blur-sm group-hover:opacity-70 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="text-green-400 text-xl sm:text-2xl font-bold">
                      {phase.title}
                    </h3>
                    <div className="text-green-400/60 font-mono text-xs sm:text-sm">
                      {phase.phaseNumber}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-white text-2xl sm:text-3xl font-bold mb-2">
                      {phase.tokens}
                    </div>
                    <div className="text-gray-400 text-xs sm:text-sm bg-gray-700/30 rounded-full px-3 py-1 inline-block">
                      {phase.status}
                    </div>
                  </div>

                  {/* Benefits list */}
                  

                  {/* Phase 1 CTA button */}
                  
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gray-300/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

const data = [
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

export default AirdropTime;