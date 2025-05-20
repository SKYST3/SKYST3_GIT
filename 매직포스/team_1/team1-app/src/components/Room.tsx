import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Box, Plane, Text } from '@react-three/drei'
import * as THREE from 'three'

interface Message {
  text: string;
  author: string;
  date: Date;
}

interface RoomProps {
  uploadedImages: string[];
  messages: Message[];
}

export function Room({ uploadedImages = [], messages = [] }: RoomProps) {
  const wallColor = '#F5F5F5' // Clean white walls
  const floorColor = '#E0E0E0' // Light gray floor
  const { camera } = useThree()
  const [viewerPosition, setViewerPosition] = useState<[number, number, number]>([0, 1.7, 5])

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const speed = 0.5
      const [x, y, z] = viewerPosition
      
      switch(e.key) {
        case 'ArrowUp':
          setViewerPosition([x, y, z - speed])
          break
        case 'ArrowDown':
          setViewerPosition([x, y, z + speed])
          break
        case 'ArrowLeft':
          setViewerPosition([x - speed, y, z])
          break
        case 'ArrowRight':
          setViewerPosition([x + speed, y, z])
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [viewerPosition])

  // Update camera position
  useEffect(() => {
    camera.position.set(viewerPosition[0], viewerPosition[1], viewerPosition[2])
  }, [viewerPosition, camera])

  // Create textures for uploaded images
  const imageFrames = uploadedImages.map((imageUrl, index) => {
    const texture = new THREE.TextureLoader().load(imageUrl)
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    return texture
  })
  
  return (
    <group>
      {/* Floor */}
      <Plane 
        args={[20, 20]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#f0f0f0"
          roughness={0.7}
          metalness={0.2}
        />
      </Plane>

      {/* Back Wall */}
      <Plane 
        args={[20, 10]} 
        position={[0, 5, -10]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </Plane>

      {/* Left Wall */}
      <Plane
        args={[20, 10]}
        position={[-10, 5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </Plane>

      {/* Right Wall */}
      <Plane
        args={[20, 10]}
        position={[10, 5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      >
        <meshStandardMaterial 
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
      </Plane>

      {/* Ambient Light */}
      <ambientLight intensity={0.5} />

      {/* Main Directional Light */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Soft Fill Lights */}
      <pointLight position={[-5, 8, -5]} intensity={0.3} color="#ffd1d1" />
      <pointLight position={[5, 8, -5]} intensity={0.3} color="#d1ffd1" />

      {/* Uploaded Images Display */}
      {imageFrames.map((texture, index) => {
        // Calculate the total width of all images with spacing
        const totalImages = imageFrames.length;
        const imageWidth = 3; // Width of each image
        const spacing = 1; // Space between images
        const totalWidth = (imageWidth * totalImages) + (spacing * (totalImages - 1));
        const startX = -totalWidth / 2 + imageWidth / 2;

        const position: [number, number, number] = [
          startX + (index * (imageWidth + spacing)), // Center-aligned on back wall
          4.5, // Higher position for better visibility
          -9.8 // Slightly closer to wall
        ]
        const rotation: [number, number, number] = [0, 0, 0]

        return (
          <group key={`image-${index}`} position={position} rotation={rotation}>
            {/* Frame */}
            <Plane args={[3.2, 4.2]} position={[0, 0, 0.01]}>
              <meshStandardMaterial color="#FFFFFF" />
            </Plane>
            {/* Image */}
            <Plane args={[3, 4]} position={[0, 0, 0.02]}>
              <meshBasicMaterial map={texture} />
            </Plane>
            {/* Image Spotlight */}
            <pointLight position={[0, 2, 2]} intensity={0.4} color="#FFFFFF" distance={5} />
          </group>
        )
      })}

      {/* Guestbook Messages Display */}
      {messages.map((message, index) => {
        const position: [number, number, number] = [
          9.8, // Closer to right wall
          7 - (index * 2), // More vertical spacing between messages
          -8 + (index * 3) // More depth variation
        ]
        const rotation: [number, number, number] = [0, -Math.PI / 2, 0]

        return (
          <group key={`message-${index}`} position={position} rotation={rotation}>
            <group position={[0, 0, 0]}>
              {/* Message Background with Shadow */}
              <Plane args={[2.2, 1.2]} position={[0, 0, 0.01]}>
                <meshStandardMaterial color="#FFFFFF" />
              </Plane>
              <Plane args={[2, 1]} position={[0, 0, 0.02]}>
                <meshStandardMaterial 
                  color="#FFF8DC" 
                  opacity={0.95} 
                  transparent
                  metalness={0.1}
                  roughness={0.2}
                />
              </Plane>
              {/* Message Text */}
              <Text
                position={[0, 0.2, 0.03]}
                fontSize={0.15}
                maxWidth={1.8}
                color="#333"
                anchorX="center"
                anchorY="middle"
              >
                {message.text}
              </Text>
              {/* Author */}
              <Text
                position={[0.7, -0.3, 0.03]}
                fontSize={0.12}
                color="#666"
                anchorX="right"
                anchorY="middle"
              >
                {message.author}
              </Text>
              {/* Message Spotlight */}
              <pointLight position={[0, 0, 1]} intensity={0.2} color="#FFF8DC" distance={3} />
            </group>
          </group>
        )
      })}

      {/* Ceiling Lights */}
      {[-6, -2, 2, 6].map((x, i) => (
        <group key={i} position={[x, 9.8, 0]}>
          <Box args={[0.3, 0.3, 0.3]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </Box>
          <pointLight 
            position={[0, -0.5, 0]} 
            intensity={0.4} 
            color="#fff5e0"
            distance={8}
            decay={2}
          />
        </group>
      ))}

      {/* Ceiling */}
      <Plane
        args={[20, 20]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 10, 0]}
      >
        <meshStandardMaterial color="#FFFFFF" />
      </Plane>
    </group>
  )
} 