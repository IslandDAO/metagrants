import { useEffect, useState } from "react";

interface GlowingTree {
  id: number;
  top: string;
  left: string;
  brightness: number;
  size: number;
  increasing: boolean;
  speed: number;
}

export function PalmTreeBackground() {
  const [trees, setTrees] = useState<GlowingTree[]>([]);
  
  useEffect(() => {
    // Create initial trees
    const initialTrees = createRandomTrees(5);
    setTrees(initialTrees);
    
    // Every 3 seconds, add some new trees
    const interval = setInterval(() => {
      setTrees(prev => {
        // Filter out trees that are fully faded
        const activeTrees = prev.filter(tree => tree.brightness > 0 || tree.increasing);
        
        // If we have fewer than 3 active trees, add more
        if (activeTrees.length < 3) {
          return [...activeTrees, ...createRandomTrees(Math.floor(Math.random() * 3) + 2)];
        }
        
        return activeTrees;
      });
    }, 3000);
    
    // Animation frame for updating brightness
    const animationFrame = () => {
      setTrees(prevTrees => prevTrees.map(tree => {
        let { brightness, increasing, speed } = tree;
        
        if (increasing) {
          brightness += speed;
          if (brightness > 1) {
            brightness = 1;
            increasing = false;
          }
        } else {
          brightness -= speed;
        }
        
        return { ...tree, brightness, increasing };
      }));
      
      animationId = requestAnimationFrame(animationFrame);
    };
    
    let animationId = requestAnimationFrame(animationFrame);
    
    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  const createRandomTrees = (count: number): GlowingTree[] => {
    const newTrees: GlowingTree[] = [];
    
    for (let i = 0; i < count; i++) {
      newTrees.push({
        id: Date.now() + i,
        top: `${Math.random() * 90}%`,
        left: `${Math.random() * 90}%`,
        brightness: 0,
        size: 30 + Math.random() * 20,
        increasing: true,
        speed: 0.005 + Math.random() * 0.01,
      });
    }
    
    return newTrees;
  };
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0" style={{ pointerEvents: 'none' }}>
      <div className="absolute inset-0 bg-[#121820] opacity-90"></div>
      
      {trees.map(tree => (
        <div
          key={tree.id}
          className="absolute"
          style={{
            top: tree.top,
            left: tree.left,
            opacity: tree.brightness,
            transition: 'opacity 0.5s',
          }}
        >
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${tree.size}px`,
              height: `${tree.size}px`,
              filter: `drop-shadow(0 0 ${10 * tree.brightness}px rgba(249, 115, 22, 0.8))`,
            }}
          >
            {/* SVG Palm Tree */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v12" />
              <path d="M9 7c-3 2-3 7-7 7s3-5 3-9c0-3 3-5 7-5" />
              <path d="M15 7c3 2 3 7 7 7s-3-5-3-9c0-3-3-5-7-5" />
              <path d="M9 17c-1 1-2 3-1 5s1-5 4-5c4 0 4 5 3 5s0-4-1-5" />
            </svg>
            
            {/* Orange Glow */}
            <div 
              className="absolute inset-0 rounded-full" 
              style={{
                background: 'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, rgba(249, 115, 22, 0) 70%)',
                transform: 'scale(1.5)',
                opacity: tree.brightness,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}