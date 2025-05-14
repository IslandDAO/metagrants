import { useEffect, useState } from "react";
import palmPattern from "../../assets/palm-tree-pattern.png";

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
        size: 30 + Math.random() * 15,
        increasing: true,
        speed: 0.005 + Math.random() * 0.01,
      });
    }
    
    return newTrees;
  };

  // Draw pixel art palm tree
  const PixelPalmTree = ({ size, brightness }: { size: number, brightness: number }) => {
    // Simplified to match the pixel style in the background
    const color = `rgba(255, 255, 255, ${0.5 + brightness * 0.5})`;
    
    return (
      <div 
        style={{ 
          width: `${size}px`, 
          height: `${size}px`, 
          position: 'relative',
          filter: `drop-shadow(0 0 ${10 * brightness}px rgba(249, 115, 22, 0.8))`,
        }}
      >
        {/* Palm tree using CSS grid for pixel art */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(9, 1fr)',
          width: '100%',
          height: '100%',
        }}>
          {/* Trunk */}
          <div style={{ gridColumn: '4', gridRow: '6 / 10', backgroundColor: color }} />
          
          {/* Leaves */}
          <div style={{ gridColumn: '3', gridRow: '4', backgroundColor: color }} />
          <div style={{ gridColumn: '4', gridRow: '3', backgroundColor: color }} />
          <div style={{ gridColumn: '5', gridRow: '4', backgroundColor: color }} />
          
          <div style={{ gridColumn: '2', gridRow: '5', backgroundColor: color }} />
          <div style={{ gridColumn: '6', gridRow: '5', backgroundColor: color }} />
          
          <div style={{ gridColumn: '1', gridRow: '3', backgroundColor: color }} />
          <div style={{ gridColumn: '7', gridRow: '3', backgroundColor: color }} />
          
          <div style={{ gridColumn: '2', gridRow: '2', backgroundColor: color }} />
          <div style={{ gridColumn: '6', gridRow: '2', backgroundColor: color }} />
          
          <div style={{ gridColumn: '3', gridRow: '1', backgroundColor: color }} />
          <div style={{ gridColumn: '5', gridRow: '1', backgroundColor: color }} />
        </div>

        {/* Orange Glow Overlay */}
        <div 
          style={{
            position: 'absolute',
            inset: '-50%',
            background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(249, 115, 22, 0) 70%)',
            opacity: brightness,
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