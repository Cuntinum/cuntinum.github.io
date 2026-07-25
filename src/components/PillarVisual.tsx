import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function BrainNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const nodeCount = 120
  const { positions, connections } = useMemo(() => {
    const pos = new Float32Array(nodeCount * 3)
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 2 + Math.random() * 1.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }

    const conn: number[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3]
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.8) {
          conn.push(i, j)
        }
      }
    }
    return { positions: pos, connections: conn }
  }, [])

  const linePositions = useMemo(() => {
    const lp = new Float32Array(connections.length * 3)
    for (let i = 0; i < connections.length; i++) {
      const idx = connections[i]
      lp[i * 3] = positions[idx * 3]
      lp[i * 3 + 1] = positions[idx * 3 + 1]
      lp[i * 3 + 2] = positions[idx * 3 + 2]
    }
    return lp
  }, [connections, positions])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.08
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
      const arr = attr.array as Float32Array
      for (let i = 0; i < nodeCount; i++) {
        const pulse = 1 + Math.sin(t * 3 + i * 0.5) * 0.03
        arr[i * 3] = positions[i * 3] * pulse
        arr[i * 3 + 1] = positions[i * 3 + 1] * pulse
        arr[i * 3 + 2] = positions[i * 3 + 2] * pulse
      }
      attr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.12} color="#60a5fa" transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.25} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#1e40af" transparent opacity={0.03} />
      </mesh>
    </group>
  )
}

function SoulBreathing() {
  const meshRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)

  const particleCount = 300
  const basePositions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const r = 2.2 + Math.random() * 0.8
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !particlesRef.current) return
    const t = state.clock.elapsedTime
    const breath = 1 + Math.sin(t * 0.8) * 0.15
    meshRef.current.scale.setScalar(breath)
    meshRef.current.rotation.y = t * 0.1
    meshRef.current.rotation.x = t * 0.05

    const attr = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    for (let i = 0; i < particleCount; i++) {
      const offset = Math.sin(t * 2 + i * 0.3) * 0.15
      const scale = breath + offset * 0.3
      arr[i * 3] = basePositions[i * 3] * scale
      arr[i * 3 + 1] = basePositions[i * 3 + 1] * scale
      arr[i * 3 + 2] = basePositions[i * 3 + 2] * scale
    }
    attr.needsUpdate = true
  })

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.3} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[basePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} color="#c084fc" transparent opacity={0.7} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <mesh>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.08} />
      </mesh>
    </group>
  )
}

function ImmuneShield() {
  const shieldRef = useRef<THREE.Group>(null)
  const sentinelsRef = useRef<THREE.Points>(null)

  const sentinelCount = 60
  const sentinelPositions = useMemo(() => {
    const pos = new Float32Array(sentinelCount * 3)
    for (let i = 0; i < sentinelCount; i++) {
      const angle = (i / sentinelCount) * Math.PI * 2
      const y = (Math.random() - 0.5) * 4
      const r = 3 + Math.random() * 0.5
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = Math.sin(angle) * r
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!shieldRef.current || !sentinelsRef.current) return
    const t = state.clock.elapsedTime
    shieldRef.current.rotation.y = t * 0.15

    const attr = sentinelsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = attr.array as Float32Array
    for (let i = 0; i < sentinelCount; i++) {
      const angle = (i / sentinelCount) * Math.PI * 2 + t * 0.5
      const r = 3 + Math.sin(t * 2 + i) * 0.2
      const y = sentinelPositions[i * 3 + 1] + Math.sin(t + i * 0.5) * 0.3
      arr[i * 3] = Math.cos(angle) * r
      arr[i * 3 + 1] = y
      arr[i * 3 + 2] = Math.sin(angle) * r
    }
    attr.needsUpdate = true
  })

  return (
    <group ref={shieldRef}>
      {[2.5, 3.0, 3.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI * 0.1 * i, 0, Math.PI * 0.05 * i]}>
          <torusGeometry args={[r, 0.02, 8, 64]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
      <points ref={sentinelsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sentinelPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.15} color="#34d399" transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
      <mesh>
        <octahedronGeometry args={[1.5, 0]} />
        <meshBasicMaterial color="#059669" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function PulseWave() {
  const ringsRef = useRef<THREE.Group>(null)
  const ringMeshes = useRef<THREE.Mesh[]>([])

  const ringCount = 8

  useFrame((state) => {
    if (!ringsRef.current) return
    const t = state.clock.elapsedTime
    ringsRef.current.rotation.x = Math.PI * 0.3
    ringsRef.current.rotation.z = t * 0.05

    ringMeshes.current.forEach((mesh, i) => {
      if (!mesh) return
      const phase = (t * 1.5 + i * 0.4) % (Math.PI * 2)
      const scale = 1 + Math.sin(phase) * 0.5
      const opacity = Math.max(0, Math.cos(phase) * 0.4)
      mesh.scale.setScalar(scale)
      ;(mesh.material as THREE.MeshBasicMaterial).opacity = opacity
    })
  })

  return (
    <group ref={ringsRef}>
      {Array.from({ length: ringCount }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringMeshes.current[i] = el }}
        >
          <torusGeometry args={[1.5 + i * 0.4, 0.03, 8, 64]} />
          <meshBasicMaterial color="#f59e0b" transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.15} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#f59e0b" distance={6} />
    </group>
  )
}

function ContainerLayers() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.1
    groupRef.current.children.forEach((child, i) => {
      const expand = 1 + Math.sin(t * 0.5 + i * 0.8) * 0.08
      child.scale.setScalar(expand)
    })
  })

  return (
    <group ref={groupRef}>
      {[1.2, 1.8, 2.4, 3.0, 3.6].map((r, i) => (
        <mesh key={i} rotation={[Math.random() * 0.3, Math.random() * 0.3, 0]}>
          <dodecahedronGeometry args={[r, 0]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.0 + i * 0.02, 0.8, 0.5)}
            wireframe
            transparent
            opacity={0.25 - i * 0.03}
          />
        </mesh>
      ))}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

const PILLAR_COMPONENTS = {
  brain: BrainNetwork,
  soul: SoulBreathing,
  immune: ImmuneShield,
  pulse: PulseWave,
  container: ContainerLayers,
}

export type PillarType = keyof typeof PILLAR_COMPONENTS

export function PillarCanvas({ pillar }: { pillar: PillarType }) {
  const Component = PILLAR_COMPONENTS[pillar]
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#010101']} />
      <ambientLight intensity={0.1} />
      <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.2}>
        <Component />
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  )
}

export default PillarCanvas
