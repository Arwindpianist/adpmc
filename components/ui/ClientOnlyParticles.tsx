"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"

const ClientOnlyParticles = () => {
  const [Particles, setParticles] = useState(<div />)
  
  useEffect(() => {
    const loadParticles = async () => {
      const { initParticlesEngine } = await import("@tsparticles/react")
      const { loadSlim } = await import("@tsparticles/slim")
      const { Particles } = await import("@tsparticles/react")
      
      await initParticlesEngine(async (engine) => {
        await loadSlim(engine)
      })

      setParticles(
        <Particles
          id="tsparticles"
          options={{
            background: { color: { value: "#000000" }},
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" }
              }
            },
            particles: {
              color: { value: "#ffffff" },
              links: {
                color: "#ffffff",
                distance: 100,
                enable: true,
                opacity: 0.2,
                width: 1
              },
              move: { enable: true, speed: 2 },
              number: { value: 80 },
              opacity: { value: 0.4 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 3 } }
            },
            detectRetina: true
          }}
        />
      )
    }

    loadParticles()
  }, [])

  return Particles
}

export default dynamic(() => Promise.resolve(ClientOnlyParticles), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black z-0" />
})