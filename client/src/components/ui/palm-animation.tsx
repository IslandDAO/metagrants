import React, { useEffect, useState, useRef } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

interface Palm {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  active: boolean;
  duration?: number; // Time in seconds that the palm stays lit
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
        // Add random duration property (between 2-5 seconds)
        initialPalms[index].duration = 2 + Math.random() * 3;
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
              // Assign random duration between 2-5 seconds
              newPalms[selectedIndex].duration = 2 + Math.random() * 3;
              
              // Remove this index from available indices
              availableIndices.splice(randomPosition, 1);
            }
            
            // Update the reference for next cycle
            lastActivePalmsRef.current = newActiveIndices;
            
            return newPalms;
          });
        }
        
        // Update brightness based on individual durations
        setPalms(prevPalms => {
          // Calculate total cycle time in seconds (approximately)
          const totalCycleTime = 250; // ~250 frames at 30fps ≈ 8.3 seconds
          
          return prevPalms.map(palm => {
            let newBrightness = 0;
            
            if (palm.active) {
              // Use palm's individual duration (2-5 seconds) or default to 3 seconds
              const palmDuration = palm.duration || 3;
              // Convert duration to phase fraction (e.g., 3s duration = 0.36 of total cycle)
              const palmPhaseEnd = palmDuration / totalCycleTime;
              
              // First 1/3 of palm's duration is fade-in, remaining 2/3 is stable before fade-out
              const fadeInPhase = palmPhaseEnd / 3;
              const stableEnd = palmPhaseEnd * 0.9; // End stable at 90% of palm's duration
              
              if (phaseRef.current < fadeInPhase) {
                // Fade in period - normalize to 0-1 range
                newBrightness = phaseRef.current / fadeInPhase;
              } 
              else if (phaseRef.current < stableEnd) {
                // Stable period - full brightness
                newBrightness = 1;
              } 
              else if (phaseRef.current < palmPhaseEnd) {
                // Fade out period - normalize to 1-0 range
                const fadeOutProgress = (phaseRef.current - stableEnd) / (palmPhaseEnd - stableEnd);
                newBrightness = 1 - fadeOutProgress;
              }
              else {
                // Beyond this palm's duration
                newBrightness = 0;
              }
            } else {
              // Inactive palms fade out quickly
              newBrightness = Math.max(0, palm.brightness - 0.04);
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
              filter: `brightness(${1 + palm.brightness * 0.8})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};