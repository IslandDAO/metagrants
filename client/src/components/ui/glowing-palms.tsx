import React, { useEffect, useState } from 'react';
import transparentPalm from '../../assets/transparent-palm.png';

interface PalmProps {
  positions?: { x: number, y: number }[];
}

export const GlowingPalms: React.FC<PalmProps> = ({ positions = [] }) => {
  // Default positions if none provided
  const defaultPositions = [
    { x: 20, y: 20 },
    { x: 40, y: 60 },
    { x: 75, y: 30 },
    { x: 85, y: 70 },
    { x: 60, y: 85 },
  ];

  const palmPositions = positions.length > 0 ? positions : defaultPositions;
  const [activeIndex, setActiveIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [increasing, setIncreasing] = useState(true);

  useEffect(() => {
    // Animation for breathing effect
    const breathingInterval = setInterval(() => {
      setOpacity(prev => {
        if (increasing) {
          const newOpacity = prev + 0.01;
          if (newOpacity >= 1) {
            setIncreasing(false);
            return 1;
          }
          return newOpacity;
        } else {
          const newOpacity = prev - 0.01;
          if (newOpacity <= 0) {
            setIncreasing(true);
            // Move to next palm tree
            setActiveIndex((prevIndex) => (prevIndex + 1) % palmPositions.length);
            return 0;
          }
          return newOpacity;
        }
      });
    }, 30); // Update every 30ms for smooth animation

    return () => clearInterval(breathingInterval);
  }, [increasing, palmPositions.length]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 5 }}>
      {/* Background palm pattern */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `url(${transparentPalm})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.1,
        }}
      />

      {/* Glowing palms */}
      {palmPositions.map((position, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: index === activeIndex ? 1 : 0.2,
            transition: 'opacity 0.5s',
          }}
        >
          <div
            style={{
              width: '150px',
              height: '150px',
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
                filter: index === activeIndex 
                  ? `drop-shadow(0 0 10px rgba(249, 115, 22, ${opacity * 0.8})) brightness(${1 + opacity * 0.5})` 
                  : 'none',
                transition: 'filter 0.3s',
              }}
            />
            
            {/* Glow effect for active palm */}
            {index === activeIndex && (
              <div
                style={{
                  position: 'absolute',
                  inset: '-50%',
                  background: 'radial-gradient(circle, rgba(249, 115, 22, 0.7) 0%, rgba(249, 115, 22, 0.3) 30%, rgba(249, 115, 22, 0) 70%)',
                  opacity: opacity * 0.8,
                  zIndex: -1,
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};