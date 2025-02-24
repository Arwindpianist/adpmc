"use client"

import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import type { Container, ISourceOptions } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim" // or use `loadFull` if you need all features
import { initParticlesEngine } from "@tsparticles/react"

// Dynamically import the Particles component with SSR disabled
const Particles = dynamic(() => import("@tsparticles/react"), { ssr: false })

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
      detectRetina: true, // Enable retina display support
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

  // Return nothing until particles are initialized
  return null
}

export default ParticleBackground