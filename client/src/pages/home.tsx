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
    <div className="bg-emerald-600 rounded-lg shadow-lg p-5 text-center transform transition-all hover:scale-105 border border-emerald-500">
      <div className="text-2xl md:text-3xl font-bold text-orange-200 mb-2">
        {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
      </div>
      <div className="text-emerald-100 text-sm font-medium">{label}</div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div 
        className="mb-16 pt-8 md:pt-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex justify-center mb-6">
          <MetaplexLogo className="h-10 w-auto" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-orange-200 mb-6">
          MetaplexDAO Grants — Cohort 1
        </h1>
        <div className="mb-4 flex flex-col items-center">
          <div className="bg-emerald-600 p-3 rounded-lg inline-block mb-3">
            <IslandDaoLogo className="h-16 w-auto" />
          </div>
          <h2 className="text-xl md:text-2xl text-emerald-200">
            Managed by IslandDAO
          </h2>
        </div>
        <p className="text-xl text-emerald-300 max-w-3xl mx-auto mb-12">
          Showcasing 12 projects funded to grow the Metaplex protocol
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <StatItem label="Applications Received" value={76} />
          <StatItem label="Grants Funded" value={12} />
          <StatItem label="USDC Allocated" value="$99,000" />
          <StatItem label="MPLX Allocated" value="590,000" />
        </div>
        
        <Link to="/grants">
          <Button 
            size="lg"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-6 px-10 rounded-lg text-xl transition transform hover:scale-105"
          >
            View Grantees
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;