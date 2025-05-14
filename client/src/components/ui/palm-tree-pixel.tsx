import { useEffect, useState } from "react";
import palmPattern from "../../assets/palm-tree-pattern.png";
import pixelPalm from "../../assets/transparent-palm.png";

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
    const initialTrees = createRandomTrees(6); // Fewer trees for a more subtle effect
    setTrees(initialTrees);
    
    // Every 4 seconds, add some new trees - slower refresh for a breathing effect
    const interval = setInterval(() => {
      setTrees(prev => {
        // Filter out trees that are fully faded
        const activeTrees = prev.filter(tree => tree.brightness > 0 || tree.increasing);
        
        // If we have fewer than 4 active trees, add more
        if (activeTrees.length < 4) {
          return [...activeTrees, ...createRandomTrees(Math.floor(Math.random() * 2) + 2)]; // Add 2-3 trees
        }
        
        return activeTrees;
      });
    }, 4000); // Slower refresh for more subtle breathing effect
    
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
        speed: 0.002 + Math.random() * 0.003, // Much slower speed for breathing effect
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
          filter: `drop-shadow(0 0 ${8 * brightness}px rgba(249, 115, 22, 0.5))`, // More subtle drop shadow
        }}
      >
        {/* Using the actual pixel palm tree image with transparent background */}
        <img 
          src={pixelPalm} 
          alt="Pixel Palm Tree"
          style={{
            width: '100%',
            height: '100%',
            opacity: 0.8 + brightness * 0.2, // Less opacity change for subtle effect
            filter: brightness > 0.5 ? `brightness(${1 + brightness * 0.5})` : 'none', // More subtle brightness change
            transition: 'opacity 0.5s, filter 0.5s', // Smooth transitions
          }}
        />

        {/* Subtle Orange Glow Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: '-120%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4) 0%, rgba(249, 115, 22, 0.2) 30%, rgba(249, 115, 22, 0) 70%)',
            opacity: brightness * 0.7, // More subtle glow
            transform: 'scale(1.8)',
            zIndex: -1,
            pointerEvents: 'none',
            transition: 'opacity 0.5s', // Smooth transition
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
        zIndex: 5,
      }}
    >
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `url(${palmPattern})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '100px 100px',
          opacity: 0.15,
          zIndex: 0,
        }}
      ></div>
      <div className="absolute inset-0 bg-[#121820] opacity-70"></div>
      
      {trees.map(tree => (
        <div
          key={tree.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{
            top: tree.top,
            left: tree.left,
            opacity: 1, // Always show tree
            transition: 'opacity 0.5s',
            zIndex: 10, // Ensure it appears above background
          }}
        >
          <PixelPalmTree size={tree.size} brightness={tree.brightness} />
        </div>
      ))}
    </div>
  );
}