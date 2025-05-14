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
        
        <div className="flex flex-col items-center space-y-6 mb-10">
          <Link to="/grants">
            <Button 
              size="lg"
              className="bg-[#f97316] hover:bg-[#fb923c] text-white font-bold py-6 px-10 rounded-lg text-xl transition transform hover:scale-105"
            >
              View Grantees
            </Button>
          </Link>
          
          <div className="flex flex-col items-center mt-8 space-y-3">
            <div className="bg-gradient-to-r from-transparent via-[#2a3550] to-transparent h-px w-64 opacity-50"></div>
            <div className="flex items-center">
              <div className="text-[#a3adc2] text-sm font-medium">Cohort 2 Coming Soon</div>
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse ml-2"></div>
            </div>
            <Button 
              disabled
              className="bg-[#2a3550] text-[#697287] font-medium py-2 px-6 rounded-lg text-sm cursor-not-allowed opacity-50"
            >
              Applications Closed
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;