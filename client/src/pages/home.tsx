import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import palmPixelArt from "../assets/palm-pixel-art.png";

// Counter animation function
const AnimatedCounter = ({ value, duration = 2000 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  const formatValue = (val: number) => {
    if (val >= 1000000) {
      return `${(val / 1000000).toFixed(1)}M`;
    } else if (val >= 1000) {
      return `${(val / 1000).toFixed(0)}K`;
    }
    return val.toLocaleString();
  };

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOutExpo for smoother animation
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const nextCount = Math.floor(easeOutExpo * value);
      
      if (countRef.current !== nextCount) {
        countRef.current = nextCount;
        setCount(nextCount);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    const animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [value, duration]);

  return <span>{formatValue(count)}</span>;
};

// StatItem component
const StatItem = ({ label, value }: { label: string, value: number | string }) => {
  return (
    <div className="bg-[#1c2431] rounded-lg shadow-lg p-5 text-center transform transition-all hover:scale-105 border border-[#3c4759]">
      <div className="text-2xl md:text-3xl font-bold text-[#f1f5fb] mb-2">
        {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
      </div>
      <div className="text-[#b5bfcc] text-sm font-medium">{label}</div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-[calc(100vh-20rem)]">
      {/* Hero Section */}
      <motion.div 
        className="pt-8 md:pt-16 text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-[#f1f5fb] mb-6">
          MetaplexDAO Grants — Cohort 1
        </h1>
        <div className="mb-4 text-center">
          <h2 className="text-xl md:text-2xl text-[#b5bfcc]">
            Managed by <a href="https://islanddao.org/" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-400 transition-colors">IslandDAO</a>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-indigo-500/20 transform transition-all hover:scale-105 hover:shadow-indigo-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-indigo-400 mr-1">📊</span>
                <AnimatedCounter value={76} />
              </div>
              <div className="text-sm text-indigo-200">Applications Received</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-purple-500/20 transform transition-all hover:scale-105 hover:shadow-purple-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-purple-400 mr-1">🏆</span>
                <AnimatedCounter value={12} />
              </div>
              <div className="text-sm text-purple-200">Grants Funded</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-blue-500/20 transform transition-all hover:scale-105 hover:shadow-blue-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-blue-400 mr-1">💰</span>
                <span>$100,000</span>
              </div>
              <div className="text-sm text-blue-200">USDC Allocated</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-orange-500/20 transform transition-all hover:scale-105 hover:shadow-orange-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-orange-400 mr-1">🪙</span>
                <span>590,000</span>
              </div>
              <div className="text-sm text-orange-200">MPLX Allocated</div>
            </div>
          </div>
        </div>
        
        {/* Feature section - Highlighting key areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
          <Link to="/grants" className="group">
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-6 shadow-lg border border-blue-500/20 h-full flex flex-col transition-all transform group-hover:scale-[1.02] group-hover:shadow-blue-500/10">
              <div className="w-24 h-24 flex items-center justify-center mb-2 mx-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="pixelated w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <img 
                      src={palmPixelArt} 
                      alt="Pixel Art Palm Tree" 
                      className="w-full h-full object-contain" 
                      style={{
                        imageRendering: "pixelated"
                      }}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Grantees</h3>
              <p className="text-sm text-gray-300 mb-4 flex-grow">Explore the 12 innovative projects funded in Cohort 1 building the future of the Metaplex protocol.</p>
              <div className="flex items-center text-blue-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                <span>View funded projects</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
          
          <Link to="/team" className="group">
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-6 shadow-lg border border-purple-500/20 h-full flex flex-col transition-all transform group-hover:scale-[1.02] group-hover:shadow-purple-500/10">
              <div className="w-24 h-24 flex items-center justify-center mb-2 mx-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="pixelated w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-300">
                      {/* Captain's Hat Base */}
                      <rect x="8" y="18" width="16" height="4" fill="currentColor" /> {/* Hat brim */}
                      <rect x="6" y="18" width="2" height="2" fill="currentColor" /> {/* Left brim edge */}
                      <rect x="24" y="18" width="2" height="2" fill="currentColor" /> {/* Right brim edge */}
                      
                      {/* Hat Top */}
                      <rect x="10" y="12" width="12" height="6" fill="currentColor" /> {/* Main hat */}
                      <rect x="8" y="14" width="2" height="4" fill="currentColor" /> {/* Left side */}
                      <rect x="22" y="14" width="2" height="4" fill="currentColor" /> {/* Right side */}
                      
                      {/* Captain's Hat Detail */}
                      <rect x="14" y="6" width="4" height="6" fill="currentColor" /> {/* Top peak */}
                      <rect x="12" y="10" width="2" height="2" fill="currentColor" /> {/* Left peak extension */}
                      <rect x="18" y="10" width="2" height="2" fill="currentColor" /> {/* Right peak extension */}
                      
                      {/* Hat Decoration */}
                      <rect x="14" y="14" width="4" height="2" fill="#D8B4FE" /> {/* Center emblem */}
                      <rect x="13" y="16" width="6" height="1" fill="#D8B4FE" /> {/* Bottom decoration */}
                      <rect x="15" y="17" width="2" height="1" fill="gold" /> {/* Gold button */}
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Team</h3>
              <p className="text-sm text-gray-300 mb-4 flex-grow">Meet the IslandDAO team members who evaluate, mentor, and support projects in the grants program.</p>
              <div className="flex items-center text-purple-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                <span>Meet the team</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
          
          <Link to="/charts" className="group">
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-6 shadow-lg border border-emerald-500/20 h-full flex flex-col transition-all transform group-hover:scale-[1.02] group-hover:shadow-emerald-500/10">
              <div className="w-24 h-24 flex items-center justify-center mb-2 mx-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="pixelated w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-300">
                      {/* Lighthouse Base */}
                      <rect x="8" y="24" width="16" height="6" fill="currentColor" /> {/* Base foundation */}
                      <rect x="6" y="22" width="20" height="2" fill="currentColor" /> {/* Base top */}
                      
                      {/* Lighthouse Tower */}
                      <rect x="12" y="8" width="8" height="14" fill="currentColor" /> {/* Main tower */}
                      <rect x="10" y="16" width="12" height="2" fill="currentColor" /> {/* Mid section band */}
                      <rect x="10" y="10" width="12" height="2" fill="currentColor" /> {/* Upper section band */}
                      
                      {/* Lighthouse Top */}
                      <rect x="11" y="4" width="10" height="4" fill="currentColor" /> {/* Light room */}
                      <rect x="13" y="2" width="6" height="2" fill="currentColor" /> {/* Roof */}
                      
                      {/* Light */}
                      <rect x="14" y="6" width="4" height="2" fill="#FFDD80" /> {/* Light source */}
                      <rect x="4" y="10" width="2" height="2" fill="#FFDD80" /> {/* Light beam left */}
                      <rect x="26" y="10" width="2" height="2" fill="#FFDD80" /> {/* Light beam right */}
                      
                      {/* Ground */}
                      <rect x="2" y="30" width="28" height="2" fill="#5EEAD4" /> {/* Water/ground */}
                      
                      {/* Windows */}
                      <rect x="14" y="12" width="4" height="2" fill="#A7F3D0" /> {/* Window 1 */}
                      <rect x="14" y="18" width="4" height="2" fill="#A7F3D0" /> {/* Window 2 */}
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
              <p className="text-sm text-gray-300 mb-4 flex-grow">Explore interactive visualizations of funding distribution, sector analysis, and program impact.</p>
              <div className="flex items-center text-emerald-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                <span>View analytics</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Cohort 2 teaser - Enhanced version */}
        <div className="mt-12 mb-16">
          <div className="bg-gradient-to-r from-[#1a1e2d] via-[#2a3550] to-[#1a1e2d] p-6 rounded-xl max-w-3xl mx-auto relative overflow-hidden border border-indigo-500/30">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white mr-3">Cohort 2 Coming Soon</h3>
                <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
              </div>
              
              <p className="text-center text-[#a3adc2] mb-6 max-w-2xl mx-auto">
                Get ready for an even bigger grants program! Cohort 2 will feature increased funding, 
                expanded categories, and enhanced support for builders in the Metaplex ecosystem.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  disabled
                  className="bg-indigo-900/30 text-indigo-300/50 border border-indigo-500/30 font-medium py-2 px-6 rounded-lg text-sm cursor-not-allowed relative overflow-hidden group w-64 sm:w-auto"
                >
                  <span className="relative z-10">Applications Opening Soon</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 via-indigo-600/10 to-indigo-600/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Button>
                
                <div className="text-[#8495bd] text-xs">
                  <span className="inline-block animate-bounce mr-1">↓</span> Stay tuned for announcements <span className="inline-block animate-bounce ml-1">↓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;