import React, { useEffect, useState } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

interface PalmProps {
  positions?: { x: number, y: number, size: number }[];
}

export const GlowingPalms: React.FC<PalmProps> = ({ positions = [] }) => {
  // Generate many positions with random sizes
  const generatePositions = () => {
    const posArray = [];
    // Generate 20 palm trees with random positions and sizes
    for (let i = 0; i < 20; i++) {
      posArray.push({
        x: Math.random() * 95 + 2.5, // keep away from edges
        y: Math.random() * 95 + 2.5, // keep away from edges
        size: Math.random() * 30 + 40, // size between 40px and 70px
      });
    }
    return posArray;
  };

  const palmPositions = positions.length > 0 ? positions : generatePositions();
  
  // Track multiple active indices
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [opacities, setOpacities] = useState<{[key: number]: number}>({});
  const [increasing, setIncreasing] = useState<{[key: number]: boolean}>({});

  useEffect(() => {
    // Initialize with 2-4 random active indices
    const initActiveCount = Math.floor(Math.random() * 3) + 2; // 2-4 active palm trees
    const newActiveIndices = [];
    const newOpacities: {[key: number]: number} = {};
    const newIncreasing: {[key: number]: boolean} = {};
    
    // Select random indices to start with
    for (let i = 0; i < initActiveCount; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * palmPositions.length);
      } while (newActiveIndices.includes(randomIndex));
      
      newActiveIndices.push(randomIndex);
      newOpacities[randomIndex] = 0; // Start at 0 opacity
      newIncreasing[randomIndex] = true; // Start increasing
    }
    
    setActiveIndices(newActiveIndices);
    setOpacities(newOpacities);
    setIncreasing(newIncreasing);
    
    // Animation for breathing effect
    const breathingInterval = setInterval(() => {
      setOpacities(prevOpacities => {
        const newOpacities = { ...prevOpacities };
        
        // Update each active tree
        setActiveIndices(prevActive => {
          const updatedActive = [...prevActive];
          
          prevActive.forEach((index, arrayIndex) => {
            if (increasing[index]) {
              newOpacities[index] = (newOpacities[index] || 0) + 0.01;
              if (newOpacities[index] >= 1) {
                // Start decreasing
                setIncreasing(prev => ({ ...prev, [index]: false }));
                newOpacities[index] = 1;
              }
            } else {
              newOpacities[index] = (newOpacities[index] || 1) - 0.01;
              if (newOpacities[index] <= 0) {
                // Remove this index and add a new random one
                newOpacities[index] = 0;
                
                // Find a new random index not in the active list
                let newIndex;
                do {
                  newIndex = Math.floor(Math.random() * palmPositions.length);
                } while (updatedActive.includes(newIndex));
                
                // Replace the current index with the new one
                updatedActive[arrayIndex] = newIndex;
                newOpacities[newIndex] = 0;
                
                // Set the new index to increase
                setIncreasing(prev => ({ ...prev, [newIndex]: true }));
              }
            }
          });
          
          return updatedActive;
        });
        
        return newOpacities;
      });
    }, 30); // Update every 30ms for smooth animation

    return () => clearInterval(breathingInterval);
  }, [palmPositions.length]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
      {/* Solid background color - no pattern */}

      {/* Glowing palms */}
      {palmPositions.map((position, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: activeIndices.includes(index) ? 1 : 0.2,
            transition: 'opacity 0.5s',
          }}
        >
          <div
            style={{
              width: `${position.size}px`,
              height: `${position.size}px`,
              position: 'relative',
            }}
          >
            {/* Palm tree image */}
            <img
              src={transparentPalm}
              alt="Palm Tree"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                filter: activeIndices.includes(index) 
                  ? `brightness(${1 + (opacities[index] || 0) * 0.7})` 
                  : 'none',
                transition: 'filter 0.3s',
                opacity: activeIndices.includes(index) ? 0.7 + (opacities[index] || 0) * 0.3 : 0.3,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};