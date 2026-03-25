import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'

const Earth = () => {
  const earthRef = useRef()
  const cloudsRef = useRef()
  const atmosRef = useRef()

  useFrame(() => {
    if (earthRef.current) earthRef.current.rotation.y += 0.002
    if (cloudsRef.current) cloudsRef.current.rotation.y += 0.003
  })

  return (
    <>
      {/* Earth */}
      <Sphere ref={earthRef} args={[2.5, 64, 64]}>
        <meshStandardMaterial
          color="#1a4080"
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere ref={atmosRef} args={[2.65, 64, 64]}>
        <meshBasicMaterial
          color="#4488ff"
          transparent
          opacity={0.08}
          side={2}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.52, 64, 64]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          roughness={1}
        />
      </Sphere>
    </>
  )
}

const EarthCanvas = () => {
  return (
    <Canvas
      camera={{ position: [-4, 3, 6], fov: 45 }}
      gl={{ antialias: true }}
      style={{ width: '100%', height: '400px' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={2.0} color="#ffffff" />
        <Earth />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas
