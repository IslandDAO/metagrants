import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-7xl mx-auto">
      {/* Cohort 2 Applications - Featured Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-4 md:pt-6 mb-8"
      >
        <div className="bg-gradient-to-r from-[#1a2235] via-[#2a3550] to-[#1a2235] p-6 rounded-xl max-w-4xl mx-auto relative overflow-hidden border border-emerald-500/40 shadow-lg shadow-emerald-500/10">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white mr-3 text-gradient-green">Cohort 2 - Early Applications Now Open</h3>
              <div className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50"></div>
            </div>
            
            <p className="text-center text-[#a3adc2] mb-6 max-w-2xl mx-auto">
              We're finalizing preparations for our second grant cohort—but if you're building with Metaplex, 
              you can get a head start and apply now to connect with us early.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://bit.ly/DeanslistMPLX" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-600 hover:to-emerald-500 text-white font-medium py-3 px-8 rounded-lg text-lg relative overflow-hidden group w-64 sm:w-auto transition-all duration-300 transform hover:scale-105 flex items-center justify-center shadow-lg shadow-emerald-700/20"
              >
                <span className="relative z-10">Apply Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              
              <div className="text-emerald-400/80 text-sm font-medium">
                <span className="mr-1">🚀</span> Limited spots available <span className="ml-1">⏰</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div 
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl md:text-5xl font-bold text-gradient mb-4">
          MetaplexDAO Grants — Cohort 1
        </h1>
        <div className="mb-4 text-center">
          <h2 className="text-xl md:text-2xl text-[#b5bfcc]">
            Managed by <a href="https://islanddao.org/" target="_blank" rel="noopener noreferrer" className="text-[#bcf0c0] hover:text-[#9fe3a3] transition-colors">IslandDAO</a>
          </h2>
          <p className="text-[#a3adc2] mt-3 max-w-2xl mx-auto">
            Celebrating the successful projects from our inaugural funding round. Browse below to explore the innovative teams and solutions building on Metaplex.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 max-w-5xl mx-auto">
          <Link to="/grants" className="group">
            <div className="card-gradient rounded-xl p-4 shadow-lg border border-indigo-500/20 card-hover neon-glow">
              <div className="text-center flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center mb-1">
                  <span className="text-indigo-400 mb-2 animate-glow-pulse">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 18H20M8 14V18M12 10V18M16 6V18" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <filter id="glow-chart">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow-chart)">
                        <path d="M4 18H20M8 14V18M12 10V18M16 6V18" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                      </g>
                    </svg>
                  </span>
                  <span className="text-3xl font-bold text-white">76</span>
                </div>
                <div className="text-sm text-indigo-200">Applications Received</div>
              </div>
            </div>
          </Link>
          
          <Link to="/grants" className="group">
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-4 shadow-lg border border-purple-500/20 transform transition-all group-hover:scale-105 group-hover:shadow-purple-500/10">
              <div className="text-center flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center mb-1">
                  <span className="text-purple-400 mb-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 6V8M16 6V8M12 14V17M7 19H17M9 17H15M6 10V6H18V10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10Z" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <filter id="glow-trophy">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow-trophy)">
                        <path d="M8 6V8M16 6V8M12 14V17M7 19H17M9 17H15M6 10V6H18V10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10Z" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                      </g>
                    </svg>
                  </span>
                  <span className="text-3xl font-bold text-white">12</span>
                </div>
                <div className="text-sm text-purple-200">Grants Funded</div>
              </div>
            </div>
          </Link>
          
          <Link to="/grants" className="group">
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-4 shadow-lg border border-blue-500/20 transform transition-all group-hover:scale-105 group-hover:shadow-blue-500/10">
              <div className="text-center flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center mb-1">
                  <span className="text-blue-400 mb-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Round Money bag base */}
                      <path d="M12 3.5C15.5 3.5 19 7 19 10.5V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V10.5C5 7 8.5 3.5 12 3.5Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      
                      {/* String/tie at top */}
                      <path d="M9 7C9 6 9.5 4 12 4C14.5 4 15 6 15 7" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      
                      {/* Dollar sign */}
                      <path d="M12 9V10M12 14V15" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round"/>
                      
                      <filter id="glow-dollar">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow-dollar)">
                        {/* Round Money bag base - glow effect */}
                        <path d="M12 3.5C15.5 3.5 19 7 19 10.5V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V10.5C5 7 8.5 3.5 12 3.5Z" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                        
                        {/* String/tie at top - glow effect */}
                        <path d="M9 7C9 6 9.5 4 12 4C14.5 4 15 6 15 7" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                        
                        {/* Dollar sign - glow effect */}
                        <path d="M12 9V10M12 14V15" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="1"/>
                        <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" opacity="1"/>
                      </g>
                    </svg>
                  </span>
                  <span className="text-3xl font-bold text-white">$100k</span>
                </div>
                <div className="text-sm text-blue-200">USDC Allocated</div>
              </div>
            </div>
          </Link>
          
          <Link to="/grants" className="group">
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-4 shadow-lg border border-orange-500/20 transform transition-all group-hover:scale-105 group-hover:shadow-orange-500/10">
              <div className="text-center flex flex-col items-center justify-center h-full">
                <div className="flex flex-col items-center mb-1">
                  <span className="text-orange-400 mb-2">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Coin outline */}
                      <circle cx="12" cy="12" r="9" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      {/* Inner circle/rim */}
                      <circle cx="12" cy="12" r="7" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      {/* Letter 'M' for MPLX */}
                      <path d="M8 14.5L8 9.5L12 12.5L16 9.5L16 14.5" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <filter id="glow-token">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow-token)">
                        {/* Coin outline */}
                        <circle cx="12" cy="12" r="9" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                        {/* Inner circle/rim */}
                        <circle cx="12" cy="12" r="7" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                        {/* Letter 'M' for MPLX */}
                        <path d="M8 14.5L8 9.5L12 12.5L16 9.5L16 14.5" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                      </g>
                    </svg>
                  </span>
                  <span className="text-3xl font-bold text-white">590k</span>
                </div>
                <div className="text-sm text-orange-200">MPLX Allocated</div>
              </div>
            </div>
          </Link>
        </div>
        
        {/* Feature section - Highlighting key areas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto mb-6">
          <Link to="/grants" className="group">
            <div className="card-gradient rounded-xl p-4 shadow-lg border border-blue-500/20 h-full flex flex-col card-hover neon-glow">
              <div className="w-24 h-24 flex items-center justify-center mb-2 mx-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Tree 1 (left) */}
                      <path 
                        d="M15 50V40" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M15 40C15 40 12 35 10 38" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M15 40C15 40 18 35 20 38" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M15 35C15 35 11 30 9 33" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M15 35C15 35 19 30 21 33" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M15 30C15 30 15 25 15 20" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* Tree 2 (center) - taller */}
                      <path 
                        d="M30 50V35" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 35C30 35 25 30 23 32" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 35C30 35 35 30 37 32" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 28C30 28 26 22 24 24" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 28C30 28 34 22 36 24" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 22C30 22 30 16 30 12" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* Tree 3 (right) */}
                      <path 
                        d="M45 50V42" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M45 42C45 42 42 38 40 40" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M45 42C45 42 48 38 50 40" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M45 36C45 36 41 32 39 34" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M45 36C45 36 49 32 51 34" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M45 30C45 30 45 25 45 22" 
                        stroke="#4ADE80" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      <filter id="glow1">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow1)">
                        {/* Tree 1 (left) - glow effect */}
                        <path 
                          d="M15 50V40" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M15 40C15 40 12 35 10 38" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M15 40C15 40 18 35 20 38" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M15 35C15 35 11 30 9 33" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M15 35C15 35 19 30 21 33" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M15 30C15 30 15 25 15 20" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* Tree 2 (center) - taller - glow effect */}
                        <path 
                          d="M30 50V35" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 35C30 35 25 30 23 32" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 35C30 35 35 30 37 32" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 28C30 28 26 22 24 24" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 28C30 28 34 22 36 24" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 22C30 22 30 16 30 12" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* Tree 3 (right) - glow effect */}
                        <path 
                          d="M45 50V42" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M45 42C45 42 42 38 40 40" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M45 42C45 42 48 38 50 40" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M45 36C45 36 41 32 39 34" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M45 36C45 36 49 32 51 34" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M45 30C45 30 45 25 45 22" 
                          stroke="#4ADE80" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                      </g>
                    </svg>
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
            <div className="card-gradient rounded-xl p-4 shadow-lg border border-purple-500/20 h-full flex flex-col card-hover neon-glow">
              <div className="w-24 h-24 flex items-center justify-center mb-2 mx-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Round table */}
                      <circle 
                        cx="30" 
                        cy="35" 
                        r="15" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - top */}
                      <circle 
                        cx="30" 
                        cy="15" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 19v3" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - top right */}
                      <circle 
                        cx="42" 
                        cy="20" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M39 23l-2 2" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - right */}
                      <circle 
                        cx="48" 
                        cy="35" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M44 35h-2" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - bottom right */}
                      <circle 
                        cx="42" 
                        cy="50" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M39 47l-2-2" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - bottom */}
                      <circle 
                        cx="30" 
                        cy="55" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M30 51v-3" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - bottom left */}
                      <circle 
                        cx="18" 
                        cy="50" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M21 47l2-2" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - left */}
                      <circle 
                        cx="12" 
                        cy="35" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M16 35h2" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      {/* People around the table - top left */}
                      <circle 
                        cx="18" 
                        cy="20" 
                        r="4" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M21 23l2 2" 
                        stroke="#C084FC" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      
                      <filter id="glow2">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow2)">
                        {/* Round table - glow effect */}
                        <circle 
                          cx="30" 
                          cy="35" 
                          r="15" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - top - glow effect */}
                        <circle 
                          cx="30" 
                          cy="15" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 19v3" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - top right - glow effect */}
                        <circle 
                          cx="42" 
                          cy="20" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M39 23l-2 2" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - right - glow effect */}
                        <circle 
                          cx="48" 
                          cy="35" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M44 35h-2" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - bottom right - glow effect */}
                        <circle 
                          cx="42" 
                          cy="50" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M39 47l-2-2" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - bottom - glow effect */}
                        <circle 
                          cx="30" 
                          cy="55" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 51v-3" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - bottom left - glow effect */}
                        <circle 
                          cx="18" 
                          cy="50" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M21 47l2-2" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - left - glow effect */}
                        <circle 
                          cx="12" 
                          cy="35" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M16 35h2" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        
                        {/* People around the table - top left - glow effect */}
                        <circle 
                          cx="18" 
                          cy="20" 
                          r="4" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M21 23l2 2" 
                          stroke="#C084FC" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                      </g>
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
            <div className="card-gradient rounded-xl p-4 shadow-lg border border-emerald-500/20 h-full flex flex-col card-hover neon-glow">
              <div className="w-24 h-24 flex items-center justify-center mb-2 mx-auto">
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Lighthouse base */}
                      <path 
                        d="M20 50H40" 
                        stroke="#34D399" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      {/* Lighthouse body */}
                      <path 
                        d="M25 50V20L30 15L35 20V50" 
                        stroke="#34D399" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                      {/* Light beams */}
                      <path 
                        d="M30 25L45 20M30 25L15 20M30 25L45 30M30 25L15 30" 
                        stroke="#34D399" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      {/* Middle sections */}
                      <path 
                        d="M25 30H35M25 40H35" 
                        stroke="#34D399" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <filter id="glow3">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <g filter="url(#glow3)">
                        <path 
                          d="M20 50H40" 
                          stroke="#34D399" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M25 50V20L30 15L35 20V50" 
                          stroke="#34D399" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          opacity="1"
                        />
                        <path 
                          d="M30 25L45 20M30 25L15 20M30 25L45 30M30 25L15 30" 
                          stroke="#34D399" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                        <path 
                          d="M25 30H35M25 40H35" 
                          stroke="#34D399" 
                          strokeWidth="1.5" 
                          strokeLinecap="round"
                          opacity="1"
                        />
                      </g>
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
        

      </motion.div>
    </div>
  );
};

export default Home;