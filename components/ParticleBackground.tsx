"use client"

import { useEffect, useState } from "react"
import type { ISourceOptions } from "@tsparticles/engine"

const ParticleBackground = () => {
  const [Particles, setParticles] = useState<React.FC<any> | null>(null)

  useEffect(() => {
    const initializeParticles = async () => {
      const { initParticlesEngine } = await import("@tsparticles/react")
      const { loadSlim } = await import("@tsparticles/slim")
      const particlesReact = await import("@tsparticles/react")
      
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })

      setParticles(() => particlesReact.Particles)
    }

    initializeParticles()
  }, [])

  const options: ISourceOptions = {
      background: {
        color: {
          value: "#000000", // Black background
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false, // Disable click interaction
            mode: "push",
          },
          onHover: {
            enable: true, // Enable hover interaction
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 4, // Number of particles to add on click
          },
          repulse: {
            distance: 100, // Distance to repel particles on hover
            duration: 0.9,
          },
        },
      },
      particles: {
        color: {
          value: "#ffffff", // White particles
        },
        links: {
          color: "#ffffff", // White links between particles
          distance: 100, // Distance between linked particles
          enable: true,
          opacity: 0.2, // Link opacity
          width: 1, // Link width
        },
        collisions: {
          enable: true, // Enable collisions between particles
        },
        move: {
          direction: "none", // Particles move randomly
          enable: true,
          outModes: {
            default: "bounce", // Particles bounce off edges
          },
          random: true, // Random movement
          speed: 2, // Speed of particles
          straight: false, // Particles don't move in a straight line
        },
        number: {
          density: {
            enable: true,
          },
          value: 80, // Number of particles
        },
        opacity: {
          value: 0.4, // Opacity of particles
        },
        shape: {
          type: "circle", // Shape of particles
        },
        size: {
          value: { min: 1, max: 3 }, // Size range of particles
        },
      },
      detectRetina: true, // Enable retina display support
    }

    if (!Particles) return null

    return <Particles id="tsparticles" options={options} />
  }
  
  export default ParticleBackground