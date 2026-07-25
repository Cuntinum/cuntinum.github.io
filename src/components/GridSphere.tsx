import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function GridSphere() {
  const groupRef = useRef<THREE.Group>(null)
  const innerRef = useRef<THREE.Points>(null)

  const shellCount = 4
  const pointsPerShell = 800

  const { positions, colors } = useMemo(() => {
    const total = shellCount * pointsPerShell
    const pos = new Float32Array(total * 3)
    const col = new Float32Array(total * 3)

    for (let shell = 0; shell < shellCount; shell++) {
      const radius = 2 + shell * 1.2
      const hue = 0.55 + shell * 0.08
      for (let i = 0; i < pointsPerShell; i++) {
        const idx = shell * pointsPerShell + i
        const phi = Math.acos(2 * Math.random() - 1)
        const theta = Math.random() * Math.PI * 2
        pos[idx * 3] = radius * Math.sin(phi) * Math.cos(theta)
        pos[idx * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
        pos[idx * 3 + 2] = radius * Math.cos(phi)

        const color = new THREE.Color().setHSL(hue, 0.7, 0.5 + shell * 0.1)
        col[idx * 3] = color.r
        col[idx * 3 + 1] = color.g
        col[idx * 3 + 2] = color.b
      }
    }
    return { positions: pos, colors: col }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.rotation.y = t * 0.05
    groupRef.current.rotation.z = Math.sin(t * 0.03) * 0.15

    if (innerRef.current) {
      const posAttr = innerRef.current.geometry.attributes.position as THREE.BufferAttribute
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < 200; i++) {
        const baseIdx = i * 3
        const scale = 1 + Math.sin(t * 2 + i * 0.1) * 0.02
        arr[baseIdx] = positions[baseIdx] * scale
        arr[baseIdx + 1] = positions[baseIdx + 1] * scale
        arr[baseIdx + 2] = positions[baseIdx + 2] * scale
      }
      posAttr.needsUpdate = true
    }
  })

  return (
    <group ref={groupRef}>
      <points ref={innerRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      {[2, 3.2, 4.4, 5.6].map((r, i) => (
        <mesh key={i} rotation={[Math.PI * 0.3 * i, Math.PI * 0.2 * i, 0]}>
          <torusGeometry args={[r, 0.005, 8, 128]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(0.55 + i * 0.08, 0.6, 0.4)}
            transparent
            opacity={0.15 + i * 0.05}
          />
        </mesh>
      ))}
    </group>
  )
}

export default GridSphere
