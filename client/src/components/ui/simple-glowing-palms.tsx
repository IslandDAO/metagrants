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

  // Initialize palms
  useEffect(() => {
    // Create 25 palm trees with random positions and sizes
    const initialPalms = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 95 + 2.5, // Random position (2.5% to 97.5%)
      y: Math.random() * 95 + 2.5, // Random position (2.5% to 97.5%)
      size: Math.random() * 40 + 30, // Size between 30px and 70px
      active: false,
      brightness: 0,
      increasing: false
    }));

    // Randomly select 3 initial active palms
    const activeIndices = new Set<number>();
    while (activeIndices.size < 3) {
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
              
              // 30% chance to deactivate this palm and activate another
              if (Math.random() < 0.3) {
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
          // Activate a new palm if needed
          if (!palm.active && array.filter(p => p.active).length < 3) {
            // This palm was selected to be activated in a previous iteration
            const shouldActivate = array.some(p => p.id !== palm.id && !p.active && p.brightness === 0);
            
            if (shouldActivate) {
              return {
                ...palm,
                active: true,
                increasing: true
              };
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
            opacity: palm.active ? (0.7 + palm.brightness * 0.3) : 0.25,
            transition: 'opacity 0.5s',
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
                filter: palm.active ? `brightness(${1 + palm.brightness * 0.7})` : 'none',
                transition: 'filter 0.5s',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};