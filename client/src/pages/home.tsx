import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MetaplexLogo from "@/components/logos/metaplex-logo";
import IslandDaoLogo from "@/components/logos/island-dao-logo";

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
    <div className="bg-gradient-to-br from-[#1c2431] to-[#2a3a52] rounded-lg shadow-lg p-5 text-center transform transition-all hover:scale-105 border-t-2 border-b border-l border-r border-indigo-500/30 backdrop-blur-sm relative before:absolute before:inset-0 before:bg-purple-500/5 before:rounded-lg overflow-hidden">
      {/* Retro scanlines effect */}
      <div className="absolute inset-0 bg-scanlines opacity-10 pointer-events-none"></div>
      
      <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300 mb-2 font-mono tracking-tight drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
        {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
      </div>
      <div className="text-[#b5bfcc] text-sm font-medium bg-[#1c2431]/70 inline-block px-3 py-1 rounded-lg border border-indigo-500/20">{label}</div>
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
        <div className="flex justify-center mb-8">
          <MetaplexLogo className="h-12 w-auto" />
        </div>
        <div className="relative z-10 mb-8">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            MetaplexDAO Grants
          </h1>
          <div className="text-3xl md:text-5xl font-bold font-mono text-[#f1f5fb] mb-3 tracking-tight relative">
            <span className="opacity-80 animate-pulse text-green-300 drop-shadow-[0_2px_8px_rgba(34,197,94,0.8)]">— Cohort 1 —</span>
          </div>
          <div className="w-full max-w-lg mx-auto bg-gradient-to-r from-indigo-800/50 via-purple-800/50 to-indigo-800/50 p-3 rounded-lg border-t-2 border-b-2 border-purple-500/50 rotate-[-0.5deg] transform hover:rotate-[0.5deg] transition-transform duration-700 backdrop-blur-sm">
            <h2 className="text-xl md:text-2xl text-[#f1f5fb] font-mono tracking-wide">
              Managed by <a href="https://islanddao.org/" target="_blank" rel="noopener noreferrer" className="text-green-300 hover:text-green-200 transition-colors underline decoration-wavy underline-offset-4 decoration-indigo-400">IslandDAO</a>
            </h2>
          </div>
        </div>
        <p className="relative text-xl md:text-2xl text-[#b5bfcc] max-w-3xl mx-auto mb-14 font-mono">
          <span className="relative inline-block px-2 py-1 before:absolute before:inset-0 before:bg-indigo-600/20 before:rotate-[-1deg] before:rounded">
            <span className="relative text-blue-100">Showcasing</span>
          </span>{" "}
          <span className="text-amber-300 font-bold">12 projects</span>{" "}
          <span className="relative inline-block px-2 py-1 before:absolute before:inset-0 before:bg-purple-600/20 before:rotate-[1deg] before:rounded">
            <span className="relative">funded to grow the</span>
          </span>{" "}
          <span className="text-indigo-300 font-bold tracking-wide animate-pulse">Metaplex protocol</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <StatItem label="Applications Received" value={76} />
          <StatItem label="Grants Funded" value={12} />
          <StatItem label="USDC Allocated" value="$100,000" />
          <StatItem label="MPLX Allocated" value="590,000" />
        </div>
        
        <Link to="/grants" className="inline-block relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-flicker"></div>
          <Button 
            size="lg"
            className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-mono font-bold py-6 px-10 rounded-lg text-xl transition transform hover:scale-[1.02] border border-indigo-500/30"
          >
            <span className="relative z-10 flex items-center gap-2 retro-text">
              <span className="opacity-90">&gt;</span> View Grantees <span className="opacity-90 animate-pulse">_</span>
            </span>
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;