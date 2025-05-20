import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

export function CameraControls() {
  const { camera } = useThree()
  const keysRef = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
  })
  const moveSpeed = 0.15
  const cameraDirection = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key in keysRef.current) {
        keysRef.current[event.key as keyof typeof keysRef.current] = true
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key in keysRef.current) {
        keysRef.current[event.key as keyof typeof keysRef.current] = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  useFrame(() => {
    // Get camera's forward and right vectors based on current camera rotation
    camera.getWorldDirection(cameraDirection.current)
    const forward = cameraDirection.current.clone()
    forward.y = 0 // Keep movement horizontal
    forward.normalize()

    const right = new THREE.Vector3()
    right.crossVectors(forward, new THREE.Vector3(0, 1, 0))
    right.normalize()

    // Calculate movement
    const movement = new THREE.Vector3()

    if (keysRef.current.ArrowUp) {
      movement.add(forward.clone().multiplyScalar(moveSpeed))
    }
    if (keysRef.current.ArrowDown) {
      movement.add(forward.clone().multiplyScalar(-moveSpeed))
    }
    if (keysRef.current.ArrowLeft) {
      movement.add(right.clone().multiplyScalar(-moveSpeed))
    }
    if (keysRef.current.ArrowRight) {
      movement.add(right.clone().multiplyScalar(moveSpeed))
    }

    // Apply movement to camera
    if (movement.length() > 0) {
      camera.position.add(movement)
      
      // Keep camera within bounds
      camera.position.x = Math.max(-8, Math.min(8, camera.position.x))
      camera.position.z = Math.max(-8, Math.min(8, camera.position.z))
      camera.position.y = Math.max(1, Math.min(5, camera.position.y))
    }
  })

  return (
    <OrbitControls
      enablePan={false}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={0}
      maxDistance={15}
      minDistance={2}
    />
  )
} 