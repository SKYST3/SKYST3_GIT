import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Plane } from '@react-three/drei'
import * as THREE from 'three'

export function MetaverseWorld() {
  const groupRef = useRef<THREE.Group>(null)

  // Removed automatic rotation
  // useFrame((state) => {
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += 0.001
  //   }
  // })

  return (
    <group ref={groupRef}>
      {/* Ground */}
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
      >
        <meshStandardMaterial 
          color="#f0f0f0"
          roughness={0.8}
          metalness={0.2}
        />
      </Plane>

      {/* Main Directional Light */}
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={0.8} 
        castShadow 
      />
      <directionalLight 
        position={[-10, 10, -5]} 
        intensity={0.4} 
        castShadow 
      />
      <ambientLight intensity={0.4} />
      
      {/* Soft point lights for atmosphere */}
      <pointLight position={[0, 5, 0]} intensity={0.2} color="#ffffff" />
      <pointLight position={[-5, 3, -5]} intensity={0.1} color="#ffd1d1" />
      <pointLight position={[5, 3, 5]} intensity={0.1} color="#d1ffd1" />
    </group>
  )
} 