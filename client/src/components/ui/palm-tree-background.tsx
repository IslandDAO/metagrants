import { useEffect, useRef, useState } from "react";
import palmPatternUrl from "../../assets/palm-tree-pattern.png";

// Position coordinates of palm trees in the pattern
const PALM_POSITIONS = [
  { x: 50, y: 50 },  { x: 150, y: 50 },  { x: 250, y: 50 },  { x: 350, y: 50 },
  { x: 50, y: 150 }, { x: 150, y: 150 }, { x: 250, y: 150 }, { x: 350, y: 150 },
  { x: 50, y: 250 }, { x: 150, y: 250 }, { x: 250, y: 250 }, { x: 350, y: 250 },
  { x: 50, y: 350 }, { x: 150, y: 350 }, { x: 250, y: 350 }, { x: 350, y: 350 },
];

interface GlowingPalm {
  id: number;
  x: number;
  y: number;
  brightness: number;
  increasing: boolean;
  speed: number;
}

export function PalmTreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [glowingPalms, setGlowingPalms] = useState<GlowingPalm[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    // Load the palm pattern image
    imgRef.current = new Image();
    imgRef.current.src = palmPatternUrl;
    imgRef.current.onload = () => {
      // Select 3-6 random palms to glow initially
      selectRandomPalms();
    };

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || !imgRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update glowing palms
      const updatedPalms = glowingPalms.map(palm => {
        // Update brightness
        let brightness = palm.brightness;
        if (palm.increasing) {
          brightness += palm.speed;
          if (brightness >= 1) {
            brightness = 1;
            palm.increasing = false;
          }
        } else {
          brightness -= palm.speed;
          if (brightness <= 0) {
            brightness = 0;
          }
        }

        return { ...palm, brightness };
      });

      // Draw glowing palms
      updatedPalms.forEach(palm => {
        if (palm.brightness > 0) {
          // Calculate pattern repetition
          const patternWidth = 400; // Assuming 400px is the width of our pattern
          const patternHeight = 400; // Assuming 400px is the height of our pattern
          
          // Calculate the real position based on tiling
          const repX = Math.floor(dimensions.width / patternWidth) + 1;
          const repY = Math.floor(dimensions.height / patternHeight) + 1;
          
          for (let i = 0; i < repX; i++) {
            for (let j = 0; j < repY; j++) {
              const x = i * patternWidth + palm.x;
              const y = j * patternHeight + palm.y;
              
              // Draw glowing effect
              ctx.save();
              ctx.globalAlpha = palm.brightness * 0.6;
              ctx.fillStyle = "#f97316"; // Orange glow color to match theme
              ctx.beginPath();
              ctx.arc(x, y, 20, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }
      });

      // Check if we need to select new random palms
      const activePalms = updatedPalms.filter(p => p.brightness > 0 || p.increasing);
      if (activePalms.length < 3) {
        selectRandomPalms();
      }

      // Filter out palms that are no longer glowing
      setGlowingPalms(updatedPalms.filter(p => p.brightness > 0 || p.increasing));
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, glowingPalms]);

  const selectRandomPalms = () => {
    // Determine how many palms to glow (3-6)
    const numPalms = Math.floor(Math.random() * 4) + 3;
    
    // Create array of new palms to glow
    const newPalms: GlowingPalm[] = [];
    
    // Exclude positions that are already glowing
    const availablePositions = [...PALM_POSITIONS];
    const currentPositions = glowingPalms.map(p => ({ x: p.x, y: p.y }));
    
    for (let i = 0; i < numPalms; i++) {
      if (availablePositions.length === 0) break;
      
      // Select a random position
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const position = availablePositions[randomIndex];
      
      // Remove it from available positions
      availablePositions.splice(randomIndex, 1);
      
      // Add to new palms
      newPalms.push({
        id: Date.now() + i,
        x: position.x,
        y: position.y,
        brightness: 0,
        increasing: true,
        speed: 0.01 + Math.random() * 0.02, // Random speed between 0.01 and 0.03
      });
    }
    
    // Add new palms to the existing ones
    setGlowingPalms(prev => [...prev, ...newPalms]);
  };

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none -z-10">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 w-full h-full opacity-20" 
        style={{ 
          backgroundImage: `url(${palmPatternUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
        }}
      />
      
      {/* Canvas for glowing effects */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}