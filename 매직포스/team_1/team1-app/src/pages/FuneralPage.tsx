import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraControls } from '../components/CameraControls';
import { GuestBook } from '../components/GuestBook';
import { ImageUploader } from '../components/ImageUploader';
import { MetaverseWorld } from '../components/MetaverseWorld';
import { Room } from '../components/Room';
import { DirectionControls } from '../components/DirectionControls';
import * as THREE from 'three';

interface Message {
  text: string;
  author: string;
  date: Date;
}

const FuneralPage = () => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const cameraRef = useRef<THREE.Camera>();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImages(prev => [...prev, imageUrl]);
  };

  const handleMessageSubmit = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  const handleMove = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (!cameraRef.current) return;

    const moveSpeed = 1;
    const camera = cameraRef.current;
    const direction3D = new THREE.Vector3();
    camera.getWorldDirection(direction3D);

    switch (direction) {
      case 'up':
        camera.position.add(direction3D.multiplyScalar(moveSpeed));
        break;
      case 'down':
        camera.position.add(direction3D.multiplyScalar(-moveSpeed));
        break;
      case 'left':
        direction3D.cross(new THREE.Vector3(0, 1, 0));
        camera.position.add(direction3D.multiplyScalar(-moveSpeed));
        break;
      case 'right':
        direction3D.cross(new THREE.Vector3(0, 1, 0));
        camera.position.add(direction3D.multiplyScalar(moveSpeed));
        break;
    }

    // Keep camera within bounds
    camera.position.x = Math.max(-8, Math.min(8, camera.position.x));
    camera.position.z = Math.max(-8, Math.min(8, camera.position.z));
    camera.position.y = 1.7; // Lock height
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 1.7, 5], fov: 75 }}
        style={{ background: '#f0f0f0' }}
        onCreated={({ camera }) => {
          cameraRef.current = camera;
        }}
      >
        <ambientLight intensity={0.5} />
        <CameraControls />
        <MetaverseWorld />
        <Room uploadedImages={uploadedImages} messages={messages} />
      </Canvas>
      
      <DirectionControls onMove={handleMove} />
      <GuestBook onMessageSubmit={handleMessageSubmit} />
      <ImageUploader onImageUpload={handleImageUpload} />
    </div>
  );
};

export default FuneralPage; 