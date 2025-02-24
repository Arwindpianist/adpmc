"use client"

import { useEffect, useMemo, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim" // or use `loadFull` if you need all features

const ParticleBackground = () => {
  const [init, setInit] = useState(false)

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // You can load `slim`, `full`, `basic`, or any other preset
      await loadSlim(engine) // Use `loadFull(engine)` if you need all features
    }).then(() => {
      setInit(true)
    })
  }, [])

  // Callback when particles are loaded
  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles loaded", container)
  }

  // Particle options
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000", // Black background
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: "push", // Add particles on click
          },
          onHover: {
            enable: true,
            mode: "repulse", // Repulse particles on hover
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
          opacity: 0.2,
          width: 1,
        },
        collisions: {
          enable: true,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce", // Particles bounce off edges
          },
          random: true,
          speed: 2, // Speed of particles
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Density of particles
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
      detectRetina: true,
    }),
    []
  )

  // Render Particles only after initialization
  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    )
  }

  return null
}

export default ParticleBackground