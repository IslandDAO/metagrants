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
  
  // Breathing animation
  useEffect(() => {
    if (palms.length === 0) return;
    
    // Breathing animation using requestAnimationFrame for smoother motion
    const animate = (time: number) => {
      // Control animation speed (milliseconds)
      const frameDuration = 1000 / 60; // target 60fps
      
      if (time - lastUpdateTimeRef.current >= frameDuration) {
        lastUpdateTimeRef.current = time;
        
        // Update animation phase (0 to 2π) - slower for a more noticeable breathing effect
        animationPhaseRef.current = (animationPhaseRef.current + 0.005) % (Math.PI * 2);
        
        // Check if we've completed a full cycle
        const cycleComplete = animationPhaseRef.current < 0.005;
        
        setPalms(prevPalms => {
          const newPalms = [...prevPalms];
          
          // If animation cycle is complete, choose new random palms
          if (cycleComplete) {
            // We'll replace only some of the active palms for a better transition
            // First, get currently active palms
            const activePalmIndices = newPalms
              .map((palm, index) => palm.active ? index : -1)
              .filter(index => index !== -1);
            
            // Keep some of the current active palms (about half)
            const palmsToKeep = Math.max(1, Math.floor(activePalmIndices.length / 2));
            const palmsToReplace = activePalmIndices.length - palmsToKeep;
            
            // Randomly select which palms to replace
            const palmsToReplaceIndices = new Set<number>();
            while (palmsToReplaceIndices.size < palmsToReplace) {
              const randomIndex = activePalmIndices[Math.floor(Math.random() * activePalmIndices.length)];
              palmsToReplaceIndices.add(randomIndex);
            }
            
            // Deactivate the palms we're replacing
            palmsToReplaceIndices.forEach(index => {
              newPalms[index].active = false;
            });
            
            // Get all inactive palms
            const inactivePalmIndices = newPalms
              .map((palm, index) => palm.active ? -1 : index)
              .filter(index => index !== -1);
            
            // Choose new random palms to activate
            const newActivePalms = new Set<number>();
            while (newActivePalms.size < palmsToReplace) {
              const randomIndex = inactivePalmIndices[Math.floor(Math.random() * inactivePalmIndices.length)];
              newActivePalms.add(randomIndex);
            }
            
            // Activate the new palms
            newActivePalms.forEach(index => {
              newPalms[index].active = true;
            });
          }
          
          // Update brightness with breathing effect
          newPalms.forEach(palm => {
            if (palm.active) {
              // Sine wave for smooth breathing effect (0 to 1)
              palm.brightness = (Math.sin(animationPhaseRef.current) + 1) / 2;
            } else {
              palm.brightness = 0;
            }
          });
          
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
            transition: 'opacity 0.1s', // Smoother transitions during breathing
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