import React, { useEffect, useState, useRef } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

interface Palm {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  active: boolean;
}

export const GlowingPalms: React.FC = () => {
  const [palms, setPalms] = useState<Palm[]>([]);
  const cycleRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);
  const lastActivePalmsRef = useRef<number[]>([]);
  
  // Create the palm grid
  useEffect(() => {
    // Create an evenly spaced grid of palms - with more rows/columns to compensate for avoided areas
    const rows = 9;
    const cols = 12;
    const palmSize = 50;
    const initialPalms: Palm[] = [];
    
    // Areas to avoid (approximate areas where text content appears)
    const avoidAreas = [
      // Main content area - just avoid the middle
      { x1: 35, x2: 65, y1: 30, y2: 60 },
      // Navigation area
      { x1: 20, x2: 80, y1: 5, y2: 12 },
      // Footer area
      { x1: 25, x2: 75, y1: 85, y2: 95 },
    ];
    
    const isInAvoidArea = (x: number, y: number) => {
      return avoidAreas.some(area => 
        x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2
      );
    };
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calculate position as percentage
        const x = (col * 100 / (cols - 1)) * 0.9 + 5; // 5-95% range
        const y = (row * 100 / (rows - 1)) * 0.9 + 5; // 5-95% range
        
        // Skip positions in avoid areas
        if (isInAvoidArea(x, y)) continue;
        
        initialPalms.push({
          id: row * cols + col,
          x,
          y,
          size: palmSize,
          brightness: 0,
          active: false
        });
      }
    }
    
    // Select random palms to activate initially
    const numToActivate = 16 + Math.floor(Math.random() * 4); // 16-19 palms
    const initialActiveIndices: number[] = [];
    
    while (initialActiveIndices.length < numToActivate) {
      const index = Math.floor(Math.random() * initialPalms.length);
      if (!initialActiveIndices.includes(index)) {
        initialActiveIndices.push(index);
        initialPalms[index].active = true;
      }
    }
    
    // Store the active palms for next cycle
    lastActivePalmsRef.current = initialActiveIndices;
    
    setPalms(initialPalms);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (palms.length === 0) return;
    
    const animate = (timestamp: number) => {
      // Control animation speed
      if (timestamp - lastTimeRef.current > 33) { // ~30fps
        lastTimeRef.current = timestamp;
        
        // Update phase slowly (0 to 1)
        phaseRef.current += 0.004; // Very slow movement
        
        if (phaseRef.current >= 1) {
          // Reset phase and increment cycle
          phaseRef.current = 0;
          cycleRef.current += 1;
          
          // Select new set of palms for the next cycle
          setPalms(prevPalms => {
            const newPalms = [...prevPalms];
            
            // Deactivate current palms
            lastActivePalmsRef.current.forEach(index => {
              if (index >= 0 && index < newPalms.length) {
                newPalms[index].active = false;
              }
            });
            
            // Find palms that weren't active in the previous cycle
            const availableIndices = newPalms.map((_, i) => i)
              .filter(i => !lastActivePalmsRef.current.includes(i));
              
            // Select new random palms
            const numToActivate = 16 + Math.floor(Math.random() * 4); // 16-19 palms
            const newActiveIndices: number[] = [];
            
            while (newActiveIndices.length < numToActivate && availableIndices.length > 0) {
              const randomPosition = Math.floor(Math.random() * availableIndices.length);
              const selectedIndex = availableIndices[randomPosition];
              
              newActiveIndices.push(selectedIndex);
              newPalms[selectedIndex].active = true;
              
              // Remove this index from available indices
              availableIndices.splice(randomPosition, 1);
            }
            
            // Update the reference for next cycle
            lastActivePalmsRef.current = newActiveIndices;
            
            return newPalms;
          });
        }
        
        // Update brightness based on phase
        setPalms(prevPalms => {
          return prevPalms.map(palm => {
            let newBrightness = 0;
            
            if (palm.active) {
              // Randomize the glow pattern by using a unique phase for each palm
              // by using the palm.id as a modifier
              const uniquePhaseOffset = ((palm.id % 8) / 16); // Creates 8 different phase patterns
              const adjustedPhase = (phaseRef.current + uniquePhaseOffset) % 1;
              
              // Longer fade-in, faster fade-out
              if (adjustedPhase < 0.6) {
                // Slow fade in (0 to 0.6 phase)
                newBrightness = (adjustedPhase / 0.6);
              } else {
                // Fast fade out (0.6 to 1.0 phase)
                const fadeOutProgress = (adjustedPhase - 0.6) / 0.4;
                const acceleratedProgress = fadeOutProgress * 1.4; // 40% faster
                const clampedProgress = Math.min(1, acceleratedProgress);
                newBrightness = 1 - clampedProgress;
              }
            } else {
              // Inactive palms fade out slowly if they have brightness
              newBrightness = Math.max(0, palm.brightness - 0.02);
            }
            
            return {
              ...palm,
              brightness: newBrightness
            };
          });
        });
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [palms.length]);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
      {palms.map(palm => (
        <div
          key={palm.id}
          className="absolute"
          style={{
            left: `${palm.x}%`,
            top: `${palm.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${palm.size}px`,
            height: `${palm.size}px`,
            opacity: palm.brightness,
            transition: 'opacity 0.1s', // Smooth transitions
          }}
        >
          <img
            src={transparentPalm}
            alt="Palm Tree"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: `brightness(${1 + palm.brightness * 1.2}) drop-shadow(0 0 ${5 + palm.brightness * 10}px rgba(180, 255, 200, ${palm.brightness * 0.7}))`,
            }}
          />
        </div>
      ))}
    </div>
  );
};