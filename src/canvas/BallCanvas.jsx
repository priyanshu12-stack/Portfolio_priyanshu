import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

const EarthBall = ({ imgUrl }) => {
  return (
    <Sphere args={[1, 100, 200]} scale={2.75}>
      <meshStandardMaterial
        color="#7C3AED"
        wireframe
        transparent
        opacity={0.3}
      />
    </Sphere>
  )
}

const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={null}>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.25} />
        <directionalLight position={[0, 0, 0.05]} intensity={1} />
        <Sphere args={[1, 100, 200]} scale={2.5}>
          <meshStandardMaterial
            color="#7C3AED"
            roughness={0.4}
            metalness={0.8}
          />
        </Sphere>
      </Suspense>
    </Canvas>
  )
}

export default BallCanvas
