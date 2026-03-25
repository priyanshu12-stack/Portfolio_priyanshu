import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Stars = ({ mouse }) => {
  const ref = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
    }
    return pos
  }, [])

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y += 0.0001
    ref.current.rotation.x += 0.00005

    // Mouse parallax
    const targetX = (mouse.current?.x ?? 0) * 0.05
    const targetY = (mouse.current?.y ?? 0) * -0.05
    ref.current.rotation.y += (targetX - ref.current.rotation.y) * 0.02
    ref.current.rotation.x += (targetY - ref.current.rotation.x) * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={5000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.2}
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

const HeroCanvas = ({ mouse }) => {
  return (
    <Canvas
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 1], fov: 75 }}
      gl={{ antialias: false }}
    >
      <color attach="background" args={['#050505']} />
      <Stars mouse={mouse} />
    </Canvas>
  )
}

export default HeroCanvas
