import React from 'react';
import { Canvas } from '@react-three/fiber';
import Smoke from '../Smoke';

const SmokeEffect: React.FC = () => {
  return (
    <Canvas
      camera={{
        fov: 60,
        position: [0, 0, 10],
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 100000,
      }}
      style={{
        backgroundColor: 'black',
        zIndex: 30,
        opacity: 0.4,
      }}
    >
      <Smoke />
      <ambientLight intensity={1} />
    </Canvas>
  );
};

export default SmokeEffect;
