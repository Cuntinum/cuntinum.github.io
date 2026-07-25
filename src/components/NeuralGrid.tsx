import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NeuralGrid() {
  const meshRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  const particleCount = 2000
  const connectionDistance = 1.8

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const vel = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
      vel[i * 3] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005
    }
    return { positions: pos, velocities: vel }
  }, [])

  const linePositions = useMemo(() => new Float32Array(particleCount * 6 * 3), [])
  const lineColors = useMemo(() => new Float32Array(particleCount * 6 * 4), [])

  useFrame((state) => {
    if (!meshRef.current || !linesRef.current) return

    const time = state.clock.elapsedTime
    const posAttr = meshRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      const ix = i * 3
      posArray[ix] += velocities[ix] + Math.sin(time * 0.3 + i) * 0.001
      posArray[ix + 1] += velocities[ix + 1] + Math.cos(time * 0.2 + i) * 0.001
      posArray[ix + 2] += velocities[ix + 2] + Math.sin(time * 0.4 + i) * 0.001

      for (let j = 0; j < 3; j++) {
        if (posArray[ix + j] > 10) posArray[ix + j] = -10
        if (posArray[ix + j] < -10) posArray[ix + j] = 10
      }
    }
    posAttr.needsUpdate = true

    let lineIdx = 0
    for (let i = 0; i < Math.min(particleCount, 300); i++) {
      for (let j = i + 1; j < Math.min(particleCount, 300); j++) {
        const dx = posArray[i * 3] - posArray[j * 3]
        const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1]
        const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < connectionDistance && lineIdx < particleCount * 6 - 2) {
          const alpha = 1 - dist / connectionDistance
          linePositions[lineIdx * 3] = posArray[i * 3]
          linePositions[lineIdx * 3 + 1] = posArray[i * 3 + 1]
          linePositions[lineIdx * 3 + 2] = posArray[i * 3 + 2]
          lineColors[lineIdx * 4] = 0.6
          lineColors[lineIdx * 4 + 1] = 0.8
          lineColors[lineIdx * 4 + 2] = 1.0
          lineColors[lineIdx * 4 + 3] = alpha * 0.3
          lineIdx++

          linePositions[lineIdx * 3] = posArray[j * 3]
          linePositions[lineIdx * 3 + 1] = posArray[j * 3 + 1]
          linePositions[lineIdx * 3 + 2] = posArray[j * 3 + 2]
          lineColors[lineIdx * 4] = 0.6
          lineColors[lineIdx * 4 + 1] = 0.8
          lineColors[lineIdx * 4 + 2] = 1.0
          lineColors[lineIdx * 4 + 3] = alpha * 0.3
          lineIdx++
        }
      }
    }

    const lineGeo = linesRef.current.geometry
    const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute
    const lineColAttr = lineGeo.attributes.color as THREE.BufferAttribute
    ;(linePosAttr.array as Float32Array).set(linePositions)
    ;(lineColAttr.array as Float32Array).set(lineColors)
    linePosAttr.needsUpdate = true
    lineColAttr.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx)

    meshRef.current.rotation.y = time * 0.02
    meshRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
    linesRef.current.rotation.y = time * 0.02
    linesRef.current.rotation.x = Math.sin(time * 0.01) * 0.1
  })

  return (
    <>
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          color="#88ccff"
          transparent
          opacity={0.7}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 4]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </>
  )
}

export default NeuralGrid
