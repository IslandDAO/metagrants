import React, { useEffect, useState, useRef } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

type Palm = {
  id: number;
  x: number;
  y: number;
  brightness: number;
  active: boolean;
};

export const GlowingPalms: React.FC = () => {
  const [palms, setPalms] = useState<Palm[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);
  const animationPhaseRef = useRef<number>(0);
  
  // Create initial palms
  useEffect(() => {
    // Create a grid of possible positions
    const totalPalms = 50;
    const initialPalms: Palm[] = [];
    
    for (let i = 0; i < totalPalms; i++) {
      initialPalms.push({
        id: i,
        x: Math.random() * 95 + 2.5, // Random position (2.5% to 97.5%)
        y: Math.random() * 95 + 2.5, // Random position (2.5% to 97.5%)
        brightness: 0,
        active: false
      });
    }
    
    // Activate initial random palms
    const numActivePalms = 3 + Math.floor(Math.random() * 3); // 3-5 active palms
    const indices = new Set<number>();
    
    while (indices.size < numActivePalms) {
      indices.add(Math.floor(Math.random() * totalPalms));
    }
    
    // Set active palms
    indices.forEach(index => {
      initialPalms[index].active = true;
    });
    
    setPalms(initialPalms);
  }, []);
  
  // Track the last set of active palm indices for completely different selection each cycle
  const lastActivePalmsRef = useRef<Set<number>>(new Set());
  
  // Track the next set of palms to activate for smooth transition
  const nextActivePalmsRef = useRef<Set<number>>(new Set());
  
  // Track transition progress
  const transitionProgressRef = useRef<number>(0);
  const isInTransitionRef = useRef<boolean>(false);
  
  // Breathing animation
  useEffect(() => {
    if (palms.length === 0) return;
    
    // Breathing animation using requestAnimationFrame for smoother motion
    const animate = (time: number) => {
      // Control animation speed (milliseconds)
      const frameDuration = 1000 / 60; // target 60fps
      
      if (time - lastUpdateTimeRef.current >= frameDuration) {
        lastUpdateTimeRef.current = time;
        
        if (isInTransitionRef.current) {
          // During transition, advance the transition progress
          transitionProgressRef.current += 0.02; // Speed of transition
          
          // If transition is complete
          if (transitionProgressRef.current >= 1) {
            transitionProgressRef.current = 0;
            isInTransitionRef.current = false;
            
            // Update last active palms with the next set
            lastActivePalmsRef.current = new Set(nextActivePalmsRef.current);
            nextActivePalmsRef.current.clear();
          }
        } else {
          // Normal breathing cycle
          // Update animation phase (0 to 2π) - with increased speed (40% faster fade out)
          animationPhaseRef.current = (animationPhaseRef.current + 0.007) % (Math.PI * 2);
          
          // Check if we're close to completing a cycle to prepare for transition
          const nearingEndOfCycle = animationPhaseRef.current > Math.PI * 1.8;
          
          // If we're nearing the end of the cycle and haven't prepared the transition
          if (nearingEndOfCycle && nextActivePalmsRef.current.size === 0) {
            // Prepare the next set of palms
            // Get all available palm indices
            const availablePalmIndices = Array.from({ length: palms.length }, (_, i) => i);
            
            // Filter out palms that were active in the previous cycle
            const filteredIndices = availablePalmIndices.filter(
              index => !lastActivePalmsRef.current.has(index)
            );
            
            // Choose 3-5 completely new random palms
            const numToActivate = 3 + Math.floor(Math.random() * 3); // 3-5 palms
            
            // Try to use filtered indices first (palms that weren't active last time)
            const indicesPool = filteredIndices.length >= numToActivate ? 
              filteredIndices : availablePalmIndices;
            
            // Select the next palms to activate
            while (nextActivePalmsRef.current.size < numToActivate) {
              const randomIdx = Math.floor(Math.random() * indicesPool.length);
              const palmIdx = indicesPool[randomIdx];
              nextActivePalmsRef.current.add(palmIdx);
            }
          }
          
          // If we've completed a cycle, start the transition
          if (animationPhaseRef.current < 0.007) {
            isInTransitionRef.current = true;
            transitionProgressRef.current = 0;
          }
        }
        
        setPalms(prevPalms => {
          const newPalms = [...prevPalms];
          
          // During transition between sets
          if (isInTransitionRef.current) {
            // Make current active palms fade out 
            newPalms.forEach((palm, index) => {
              // Current active palms that need to fade out
              if (lastActivePalmsRef.current.has(index)) {
                palm.active = true;
                // Linear fade out from current brightness to 0
                palm.brightness = Math.max(0, palm.brightness * (1 - transitionProgressRef.current));
              }
              
              // New palms that need to fade in
              if (nextActivePalmsRef.current.has(index)) {
                palm.active = true;
                // Linear fade in from 0 to full brightness
                palm.brightness = Math.min(1, transitionProgressRef.current);
              }
            });
          }
          // Normal breathing cycle
          else {
            // Update brightness with breathing effect
            newPalms.forEach(palm => {
              if (palm.active) {
                // Modified sine wave with faster fade-out
                const phase = animationPhaseRef.current;
                // Use standard sine wave for the first half (brighten up)
                if (phase < Math.PI / 2) {
                  palm.brightness = (Math.sin(phase) + 1) / 2;
                } 
                // Use accelerated fade out for the second half
                else {
                  // Make the fadeout 40% faster
                  const remainingPhase = phase - Math.PI / 2;
                  const acceleratedPhase = (remainingPhase * 1.4) + Math.PI / 2;
                  // Clamp to valid range
                  const clampedPhase = Math.min(acceleratedPhase, Math.PI * 2);
                  palm.brightness = (Math.sin(clampedPhase) + 1) / 2;
                }
              } else {
                palm.brightness = 0;
              }
            });
          }
          
          return newPalms;
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [palms.length]);
  
  // Fixed palm tree size (pixels)
  const palmSize = 60;
  
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
            opacity: palm.brightness,
            transition: 'opacity 0.06s', // Faster transition (40% faster than 0.1s)
            width: `${palmSize}px`,
            height: `${palmSize}px`,
          }}
        >
          <img
            src={transparentPalm}
            alt="Palm Tree"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              filter: `brightness(${1 + palm.brightness * 0.7})`,
            }}
          />
        </div>
      ))}
    </div>
  );
};