import React from "react";

export function MacBookScrollSection() {
  return (
    <div className="w-full overflow-hidden bg-brand-background">
      {/* Problem Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-8">
            The Game is <span className="text-brand">Rigged Against You</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Column 1 */}
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold text-brand mb-4">Information Gap</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Institutions process millions of data points every second while you stare at charts hoping for the best.
            </p>
          </div>
          
          {/* Column 2 */}
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold text-brand mb-4">Unfair Advantage</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Hedge funds use AI algorithms that cost millions to develop. You get... TikTok crypto tips.
            </p>
          </div>
          
          {/* Column 3 */}
          <div className="text-center p-6">
            <h3 className="text-2xl font-semibold text-brand mb-4">Constant Losses</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              90% of retail traders lose money not because they're dumb, but because they're playing with outdated weapons.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <blockquote className="text-xl italic text-gray-400">
            "It's like bringing a knife to a gunfight. Every. Single. Time."
          </blockquote>
        </div>
      </div>

      {/* Solution Section - Updated Layout */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div>
            <h2 className="text-5xl font-bold text-white mb-8 text-left">
              Finally, An AI That <span className="text-brand">Works FOR You</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand text-black font-bold text-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Real-Time Market Analysis</h3>
                  <p className="text-gray-300">Get instant insights from processing millions of data points</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand text-black font-bold text-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Institutional-Grade Predictions</h3>
                  <p className="text-gray-300">Access the same AI technology used by hedge funds</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand text-black font-bold text-sm rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Smart Trading Signals</h3>
                  <p className="text-gray-300">Make data-driven decisions instead of emotional trades</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Image */}
          <div className="relative">
            <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <img 
                src="assets/mac/linear.png" 
                alt="NOWA AI Platform Interface" 
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-700"
              />
              {/* Optional: Add a subtle glow effect */}
              
            </div>
            {/* Optional: Add floating elements for a less formal look */}
         
          </div>
        </div>
      </div>
      
      {/* Solution Steps */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Step 1 */}
          <div className="text-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-brand text-black font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
              1
            </div>
            <h3 className="text-2xl font-semibold text-brand mb-4">Stake NOW Tokens</h3>
            <p className="text-gray-300 text-lg">
              Your access key to institutional-grade predictions
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="text-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-brand text-black font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
              2
            </div>
            <h3 className="text-2xl font-semibold text-brand mb-4">Get AI Forecasts</h3>
            <p className="text-gray-300 text-lg">
              Hourly price predictions for 50+ crypto assets
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="text-center p-8 bg-gray-900/50 rounded-xl border border-gray-800">
            <div className="w-12 h-12 bg-brand text-black font-bold text-xl rounded-full flex items-center justify-center mx-auto mb-4">
              3
            </div>
            <h3 className="text-2xl font-semibold text-brand mb-4">Trade Smarter</h3>
            <p className="text-gray-300 text-lg">
              Make informed decisions instead of gambling
            </p>
          </div>
        </div>
        
        {/* Analogy Box */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand/10 border border-brand/30 rounded-xl p-8 text-center">
            <div className="inline-block bg-brand/20 px-4 py-2 rounded-full mb-4">
              <span className="text-brand font-semibold">💡 Think of it like this</span>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              <strong className="text-white">Think of NOWA like Google Maps for crypto markets.</strong> Instead of guessing which route is fastest, you get real-time directions to profitable trades.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}