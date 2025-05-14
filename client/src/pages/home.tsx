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
                <span className="text-indigo-400 mr-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 18H20M8 14V18M12 10V18M16 6V18" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <filter id="glow-chart">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <g filter="url(#glow-chart)">
                      <path d="M4 18H20M8 14V18M12 10V18M16 6V18" stroke="#818cf8" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                    </g>
                  </svg>
                </span>
                <AnimatedCounter value={76} />
              </div>
              <div className="text-sm text-indigo-200">Applications Received</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-purple-500/20 transform transition-all hover:scale-105 hover:shadow-purple-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-purple-400 mr-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 6V8M16 6V8M12 14V17M7 19H17M9 17H15M6 10V6H18V10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10Z" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <filter id="glow-trophy">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <g filter="url(#glow-trophy)">
                      <path d="M8 6V8M16 6V8M12 14V17M7 19H17M9 17H15M6 10V6H18V10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10Z" stroke="#c084fc" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.9"/>
                    </g>
                  </svg>
                </span>
                <AnimatedCounter value={12} />
              </div>
              <div className="text-sm text-purple-200">Grants Funded</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-blue-500/20 transform transition-all hover:scale-105 hover:shadow-blue-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-blue-400 mr-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Money bag base */}
                    <path d="M12 4L9 7H6.5C5.67157 7 5 7.67157 5 8.5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V8.5C19 7.67157 18.3284 7 17.5 7H15L12 4Z" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* String/tie at top */}
                    <path d="M10 7V9M14 7V9" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Gold coins */}
                    <path d="M9.5 13C9.5 11.8954 10.3954 11 11.5 11H12.5C13.6046 11 14.5 11.8954 14.5 13C14.5 14.1046 13.6046 15 12.5 15H11.5C10.3954 15 9.5 15.8954 9.5 17C9.5 18.1046 10.3954 19 11.5 19H12.5C13.6046 19 14.5 18.1046 14.5 17" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <filter id="glow-dollar">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <g filter="url(#glow-dollar)">
                      {/* Money bag base */}
                      <path d="M12 4L9 7H6.5C5.67157 7 5 7.67157 5 8.5V19C5 19.5523 5.44772 20 6 20H18C18.5523 20 19 19.5523 19 19V8.5C19 7.67157 18.3284 7 17.5 7H15L12 4Z" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                      {/* String/tie at top */}
                      <path d="M10 7V9M14 7V9" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                      {/* Gold coins */}
                      <path d="M9.5 13C9.5 11.8954 10.3954 11 11.5 11H12.5C13.6046 11 14.5 11.8954 14.5 13C14.5 14.1046 13.6046 15 12.5 15H11.5C10.3954 15 9.5 15.8954 9.5 17C9.5 18.1046 10.3954 19 11.5 19H12.5C13.6046 19 14.5 18.1046 14.5 17" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="1"/>
                    </g>
                  </svg>
                </span>
                <span>$100,000</span>
              </div>
              <div className="text-sm text-blue-200">USDC Allocated</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-5 shadow-lg border border-orange-500/20 transform transition-all hover:scale-105 hover:shadow-orange-500/10">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1 flex items-center justify-center">
                <span className="text-orange-400 mr-2">
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
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-6 shadow-lg border border-purple-500/20 h-full flex flex-col transition-all transform group-hover:scale-[1.02] group-hover:shadow-purple-500/10">
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
            <div className="bg-gradient-to-br from-[#1a2436] to-[#242c42] rounded-xl p-6 shadow-lg border border-emerald-500/20 h-full flex flex-col transition-all transform group-hover:scale-[1.02] group-hover:shadow-emerald-500/10">
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