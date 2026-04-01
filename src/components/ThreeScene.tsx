import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, MeshWobbleMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function HeroObject() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[2, 0, 0]}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#e8b84b"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#5b8af5" wireframe transparent opacity={0.4} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <Points positions={positions} ref={points}>
      <PointMaterial
        transparent
        color="#5b8af5"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.7}
      />
    </Points>
  );
}

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} color="#e8b84b" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#5b8af5" />
        <HeroObject />
        <ParticleField />
      </Canvas>
    </div>
  );
};

export const ServiceIcon = ({ type }: { type: 'cube' | 'data' | 'ai' | 'gears' }) => {
  return (
    <div className="h-24 w-24 mx-auto mb-4">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#e8b84b" />
        <Float speed={5} rotationIntensity={2} floatIntensity={2}>
          {type === 'cube' && (
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <MeshWobbleMaterial color="#e8b84b" factor={0.4} speed={2} />
            </mesh>
          )}
          {type === 'data' && (
            <mesh>
              <torusKnotGeometry args={[0.5, 0.2, 128, 16]} />
              <MeshDistortMaterial color="#5b8af5" distort={0.5} speed={3} />
            </mesh>
          )}
          {type === 'ai' && (
            <mesh>
              <icosahedronGeometry args={[0.8, 1]} />
              <meshStandardMaterial color="#e8b84b" wireframe />
            </mesh>
          )}
          {type === 'gears' && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 0.2, 8]} />
              <meshStandardMaterial color="#5b8af5" metalness={0.9} roughness={0.1} />
            </mesh>
          )}
        </Float>
      </Canvas>
    </div>
  );
};
