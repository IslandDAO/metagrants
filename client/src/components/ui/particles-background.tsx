import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface ParticlesBackgroundProps {
  className?: string;
}

export function ParticlesBackground({ className }: ParticlesBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log("Particles container loaded", container);
  }, []);

  return (
    <div className={`absolute inset-0 -z-1 pointer-events-none ${className}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: ["#3c4759", "#3b82f6", "#8b5cf6", "#f97316"],
            },
            links: {
              color: "#3c4759",
              distance: 150,
              enable: true,
              opacity: 0.15,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "out",
              },
              random: true,
              speed: 0.3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1200,
              },
              value: 25,
            },
            opacity: {
              value: 0.12,
              random: true,
              anim: {
                enable: true,
                speed: 0.2,
                opacity_min: 0.05,
                sync: false
              }
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 0.5, max: 2 },
              random: true,
              anim: {
                enable: true,
                speed: 1,
                size_min: 0.1,
                sync: false
              }
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}