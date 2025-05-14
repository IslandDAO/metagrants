import React, { useEffect, useState } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

interface Palm {
  id: number;
  x: number;
  y: number;
  size: number;
  brightness: number;
  active: boolean;
  transitioning: boolean;
}

export const GlowingPalms: React.FC = () => {
  const [palms, setPalms] = useState<Palm[]>([]);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  
  // Initialize the palm trees grid
  useEffect(() => {
    // Create an evenly spaced grid of palms
    const rows = 6;
    const cols = 8;
    const palmSize = 60;
    const initialPalms: Palm[] = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calculate position as percentage
        const x = (col * 100 / (cols - 1)) * 0.9 + 5; // 5-95% range
        const y = (row * 100 / (rows - 1)) * 0.9 + 5; // 5-95% range
        
        initialPalms.push({
          id: row * cols + col,
          x,
          y,
          size: palmSize,
          brightness: 0,
          active: false,
          transitioning: false
        });
      }
    }
    
    // Activate random palms
    const numToActivate = 3 + Math.floor(Math.random() * 3); // 3-5 palms
    const activatedIndices = new Set<number>();
    
    while (activatedIndices.size < numToActivate) {
      const index = Math.floor(Math.random() * initialPalms.length);
      activatedIndices.add(index);
    }
    
    // Mark active palms
    activatedIndices.forEach(index => {
      initialPalms[index].active = true;
    });
    
    setPalms(initialPalms);
  }, []);
  
  // Main animation loop
  useEffect(() => {
    // Skip if no palms
    if (palms.length === 0) return;
    
    // Animation and cycle management - Slower animation
    const intervalId = setInterval(() => {
      // Update animation phase (0 to 1 and back)
      setAnimationPhase(prevPhase => {
        const newPhase = prevPhase + 0.005; // Half the speed
        
        // Complete cycle
        if (newPhase >= 1) {
          setCycleCount(count => count + 1);
          return 0;
        }
        
        return newPhase;
      });
    }, 25); // ~40fps, slower update frequency
    
    return () => clearInterval(intervalId);
  }, [palms.length]);
  
  // Manage transitions between cycles - With delay for slower transitions
  useEffect(() => {
    if (cycleCount === 0 || palms.length === 0) return;
    
    // Add a slight delay between cycles to make transition more noticeable
    const transitionDelay = setTimeout(() => {
      // When we start a new cycle, choose new palms
      setPalms(prevPalms => {
        const newPalms = [...prevPalms];
        const prevActivePalms = newPalms.filter(palm => palm.active);
        
        // Keep the currently active palms in a transitioning state
        // but mark them as inactive so they'll start fading out
        newPalms.forEach(palm => {
          if (palm.active) {
            palm.active = false;
            palm.transitioning = true;
          }
        });
    
    return () => clearTimeout(transitionDelay);
    }, 350); // 350ms delay between cycles
      
      // Choose new random palms that weren't active before
      const availablePalms = newPalms.filter(
        palm => !prevActivePalms.some(p => p.id === palm.id)
      );
      
      const numToActivate = 3 + Math.floor(Math.random() * 3); // 3-5 palms
      const selectedIndices: number[] = [];
      
      while (selectedIndices.length < numToActivate && availablePalms.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePalms.length);
        const selectedPalm = availablePalms[randomIndex];
        
        // Activate this palm
        const palmIndex = newPalms.findIndex(p => p.id === selectedPalm.id);
        if (palmIndex !== -1) {
          newPalms[palmIndex].active = true;
          newPalms[palmIndex].transitioning = true;
          selectedIndices.push(palmIndex);
        }
        
        // Remove from available palms
        availablePalms.splice(randomIndex, 1);
      }
      
      return newPalms;
    });
  }, [cycleCount, palms.length]);
  
  // Update palm tree brightness based on animation phase
  useEffect(() => {
    if (palms.length === 0) return;
    
    setPalms(prevPalms => {
      return prevPalms.map(palm => {
        if (!palm.active) {
          // Inactive palms fade out slowly
          return {
            ...palm,
            brightness: Math.max(0, palm.brightness - 0.03) // Slower fade out
          };
        }
        
        // For active palms, calculate brightness based on breathing pattern
        let newBrightness = palm.brightness;
        
        if (animationPhase < 0.6) { // Extend the fade-in period
          // Fade in period (slower)
          newBrightness = animationPhase * 1.67; // Scale to reach 1.0 at 0.6
        } else {
          // Fade out period (faster by 40%, but in a smaller range)
          const fadeOutProgress = (animationPhase - 0.6) * 2.5; // Scale 0.6-1.0 to 0-1
          const acceleratedProgress = fadeOutProgress * 1.4;
          const clampedProgress = Math.min(1, acceleratedProgress);
          newBrightness = 1 - clampedProgress;
        }
        
        return {
          ...palm,
          brightness: newBrightness
        };
      });
    });
  }, [animationPhase, palms.length]);
  
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
            transition: 'opacity 0.06s', // 40% faster than 0.1s
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