import { useEffect, useState } from "react";
import palmPattern from "../../assets/palm-tree-pattern.png";
import pixelPalm from "../../assets/pixel-palm.png";

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
    const initialTrees = createRandomTrees(8); // More trees for better visibility
    setTrees(initialTrees);
    
    // Every 2.5 seconds, add some new trees
    const interval = setInterval(() => {
      setTrees(prev => {
        // Filter out trees that are fully faded
        const activeTrees = prev.filter(tree => tree.brightness > 0 || tree.increasing);
        
        // If we have fewer than 5 active trees, add more
        if (activeTrees.length < 5) {
          return [...activeTrees, ...createRandomTrees(Math.floor(Math.random() * 3) + 3)];
        }
        
        return activeTrees;
      });
    }, 2500); // Slightly faster refresh
    
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
        size: 50 + Math.random() * 20, // Larger size to show pixel details
        increasing: true,
        speed: 0.005 + Math.random() * 0.01,
      });
    }
    
    return newTrees;
  };

  // Draw pixel art palm tree
  const PixelPalmTree = ({ size, brightness }: { size: number, brightness: number }) => {
    return (
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          position: 'relative',
          filter: `drop-shadow(0 0 ${10 * brightness}px rgba(249, 115, 22, 0.8))`,
        }}
      >
        {/* Using the actual pixel palm tree image */}
        <img 
          src={pixelPalm} 
          alt="Pixel Palm Tree"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.5 + brightness * 0.5,
          }}
        />

        {/* Orange Glow Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: '-100%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, rgba(249, 115, 22, 0.3) 30%, rgba(249, 115, 22, 0) 70%)',
            opacity: brightness,
            transform: 'scale(1.5)',
            zIndex: -1,
          }}
        />
      </div>
    );
  };
  
  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden" 
      style={{ 
        pointerEvents: 'none',
        backgroundImage: `url(${palmPattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px',
        opacity: 0.15,
        zIndex: 0,
      }}
    >
      <div className="absolute inset-0 bg-[#121820] opacity-90"></div>
      
      {trees.map(tree => (
        <div
          key={tree.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: tree.top,
            left: tree.left,
            opacity: tree.brightness,
            transition: 'opacity 0.5s',
          }}
        >
          <PixelPalmTree size={tree.size} brightness={tree.brightness} />
        </div>
      ))}
    </div>
  );
}