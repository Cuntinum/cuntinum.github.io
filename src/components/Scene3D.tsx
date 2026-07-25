import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import NeuralGrid from './NeuralGrid'
import GridSphere from './GridSphere'

function Scene3D({ variant = 'hero' }: { variant?: 'hero' | 'architecture' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#010101']} />
      <fog attach="fog" args={['#010101', 15, 35]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4488ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8844ff" />

      {variant === 'hero' && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
          <NeuralGrid />
        </Float>
      )}

      {variant === 'architecture' && (
        <Float speed={0.3} rotationIntensity={0.05} floatIntensity={0.2}>
          <GridSphere />
        </Float>
      )}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI * 0.7}
        minPolarAngle={Math.PI * 0.3}
      />
    </Canvas>
  )
}

export default Scene3D
