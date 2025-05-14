import { useEffect, useRef, useState } from "react";

interface Palm {
  id: number;
  x: number;
  y: number;
  brightness: number;
  increasing: boolean;
  speed: number;
}

export function PalmTreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [palms, setPalms] = useState<Palm[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const requestRef = useRef<number>();

  // Define palm positions based on a grid
  const getPalmPositions = (width: number, height: number) => {
    const positions: { x: number; y: number }[] = [];
    const gridSize = 80; // Size of each grid cell in pixels
    
    for (let x = gridSize; x < width; x += gridSize) {
      for (let y = gridSize; y < height; y += gridSize) {
        // Add some randomness to positions
        const offsetX = Math.random() * 20 - 10;
        const offsetY = Math.random() * 20 - 10;
        positions.push({ x: x + offsetX, y: y + offsetY });
      }
    }
    return positions;
  };

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", updateDimensions);
    updateDimensions();

    return () => {
      window.removeEventListener("resize", updateDimensions);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  // Initialize palms when dimensions are set
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    // Get positions for the palm trees
    const positions = getPalmPositions(dimensions.width, dimensions.height);
    
    // Add 3-6 random glowing palms
    selectRandomPalms(positions);
  }, [dimensions]);

  const selectRandomPalms = (positions: { x: number; y: number }[]) => {
    // Number of palms to glow (3-6)
    const numPalms = Math.floor(Math.random() * 4) + 3;
    
    // Create array of new palms to glow
    const newPalms: Palm[] = [];
    const availablePositions = [...positions];
    
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
        speed: 0.01 + Math.random() * 0.02 // Random speed between 0.01 and 0.03
      });
    }
    
    // Set the new palms
    setPalms(prev => [...prev, ...newPalms]);
  };

  // Animation effect
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update palms
      const updatedPalms = palms.map(palm => {
        let { brightness, increasing, speed } = palm;
        
        if (increasing) {
          brightness += speed;
          if (brightness >= 1) {
            brightness = 1;
            increasing = false;
          }
        } else {
          brightness -= speed;
          if (brightness <= 0) {
            brightness = 0;
          }
        }
        
        return { ...palm, brightness, increasing };
      });

      // Draw palm trees
      updatedPalms.forEach(palm => {
        if (palm.brightness > 0) {
          // Draw palm tree with glow
          const gradientSize = 40 + (palm.brightness * 20);
          
          // Create radial gradient
          const gradient = ctx.createRadialGradient(
            palm.x, palm.y, 5,
            palm.x, palm.y, gradientSize
          );
          
          // Add color stops
          gradient.addColorStop(0, `rgba(249, 115, 22, ${palm.brightness * 0.8})`); // orange glow
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
          
          // Draw glow
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(palm.x, palm.y, gradientSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw palm tree shape
          ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + palm.brightness * 0.3})`;
          
          // Simple palm tree shape
          ctx.beginPath();
          ctx.moveTo(palm.x, palm.y - 15);
          ctx.lineTo(palm.x - 10, palm.y + 5);
          ctx.lineTo(palm.x - 5, palm.y + 5);
          ctx.lineTo(palm.x - 15, palm.y + 15);
          ctx.lineTo(palm.x - 5, palm.y + 15);
          ctx.lineTo(palm.x, palm.y + 5);
          ctx.lineTo(palm.x + 5, palm.y + 15);
          ctx.lineTo(palm.x + 15, palm.y + 15);
          ctx.lineTo(palm.x + 5, palm.y + 5);
          ctx.lineTo(palm.x + 10, palm.y + 5);
          ctx.lineTo(palm.x, palm.y - 15);
          ctx.fill();
        }
      });

      // Check if we need to add new random palms
      const activePalms = updatedPalms.filter(p => p.brightness > 0 || p.increasing);
      if (activePalms.length < 3) {
        selectRandomPalms(getPalmPositions(dimensions.width, dimensions.height));
      }

      // Remove palms that have faded out completely
      setPalms(updatedPalms.filter(p => p.brightness > 0 || p.increasing));
      
      // Continue animation loop
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions, palms]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[#121820] opacity-90"></div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}