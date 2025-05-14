import React, { useEffect, useState } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

export const GlowingPalms: React.FC = () => {
  // Palm tree positions with various sizes
  const [palms, setPalms] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    active: boolean;
    brightness: number;
    increasing: boolean;
  }>>([]);

  // Initialize palms in an evenly distributed grid
  useEffect(() => {
    // Create a grid of palm trees
    const rows = 6;
    const cols = 8;
    const fixedSize = 50; // All palms same size
    const palmsArray = [];
    
    // Calculate even spacing
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Calculate position as percentage
        const x = (col * 100 / (cols - 1)) * 0.9 + 5; // 5-95% range
        const y = (row * 100 / (rows - 1)) * 0.9 + 5; // 5-95% range
        
        palmsArray.push({
          id: row * cols + col,
          x,
          y,
          size: fixedSize, // Fixed size
          active: false,
          brightness: 0,
          increasing: false
        });
      }
    }
    
    const initialPalms = palmsArray;

    // Randomly select 4-6 initial active palms
    const numActivePalms = 4 + Math.floor(Math.random() * 3); // 4 to 6 active palms
    const activeIndices = new Set<number>();
    while (activeIndices.size < numActivePalms) {
      activeIndices.add(Math.floor(Math.random() * initialPalms.length));
    }

    // Set the active flag and increasing state for selected palms
    initialPalms.forEach((palm, index) => {
      if (activeIndices.has(index)) {
        palm.active = true;
        palm.increasing = true;
      }
    });

    setPalms(initialPalms);
  }, []);

  // Animation loop
  useEffect(() => {
    if (palms.length === 0) return;

    const animationInterval = setInterval(() => {
      setPalms(currentPalms => {
        return currentPalms.map(palm => {
          if (!palm.active) return palm;

          let { brightness, increasing } = palm;

          // Update brightness based on direction
          if (increasing) {
            brightness += 0.01;
            if (brightness >= 1) {
              brightness = 1;
              increasing = false;
            }
          } else {
            brightness -= 0.01;
            if (brightness <= 0) {
              brightness = 0;
              
              // Always deactivate this palm and activate another
              // Find palms that aren't active
              const inactivePalms = currentPalms.filter(p => !p.active);
              
              // If we have inactive palms available
              if (inactivePalms.length > 0) {
                // Randomly select one to activate
                const newActivePalm = inactivePalms[Math.floor(Math.random() * inactivePalms.length)];
                
                // Return updated palm (will be deactivated)
                return {
                  ...palm,
                  active: false,
                  brightness: 0,
                  increasing: false
                };
              }
              
              // Continue with this palm
              increasing = true;
            }
          }

          return {
            ...palm,
            brightness,
            increasing
          };
        }).map((palm, i, array) => {
          // Find the palm that was just deactivated
          const deactivatedPalm = array.find(p => !p.active && p.id === palm.id && palm.active === false);
          if (deactivatedPalm) {
            // Find a new palm to activate
            const inactivePalms = array.filter(p => !p.active && p.id !== palm.id);
            if (inactivePalms.length > 0) {
              const randomIndex = Math.floor(Math.random() * inactivePalms.length);
              const newPalmId = inactivePalms[randomIndex].id;
              
              // Activate this palm if it matches the randomly selected one
              if (palm.id === newPalmId) {
                return {
                  ...palm,
                  active: true,
                  increasing: true,
                  brightness: 0
                };
              }
            }
          }
          
          return palm;
        });
      });
    }, 33); // ~30fps

    return () => clearInterval(animationInterval);
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
            opacity: palm.active ? palm.brightness : 0,  // Completely fade out when not active
            transition: 'opacity 1s',
          }}
        >
          <div
            style={{
              width: `${palm.size}px`,
              height: `${palm.size}px`,
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
                filter: palm.active ? `brightness(${1 + palm.brightness})` : 'none',
                transition: 'filter 1s',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};