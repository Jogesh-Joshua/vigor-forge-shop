import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Kettlebell() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const g = group.current;
    if (!g) return;
    g.rotation.y += dt * 0.35;
    const targetX = pointer.y * 0.35;
    const targetZ = -pointer.x * 0.3;
    g.rotation.x += (targetX - g.rotation.x) * (1 - Math.exp(-4 * dt));
    g.rotation.z += (targetZ - g.rotation.z) * (1 - Math.exp(-4 * dt));
  });

  return (
    <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.9}>
      <group ref={group} scale={1.15}>
        {/* bell */}
        <mesh castShadow position={[0, -0.35, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color="#15181d" roughness={0.42} metalness={0.75} />
        </mesh>
        {/* neon ring */}
        <mesh position={[0, -0.35, 0.92]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.42, 0.045, 24, 96]} />
          <meshStandardMaterial
            color="#67ff8f"
            emissive="#3dff7a"
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
        {/* handle */}
        <mesh castShadow position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.62, 0.14, 24, 96, Math.PI]} />
          <meshStandardMaterial color="#1b1f26" roughness={0.35} metalness={0.85} />
        </mesh>
        <mesh position={[-0.62, 0.36, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.8, 32]} />
          <meshStandardMaterial color="#1b1f26" roughness={0.35} metalness={0.85} />
        </mesh>
        <mesh position={[0.62, 0.36, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 0.8, 32]} />
          <meshStandardMaterial color="#1b1f26" roughness={0.35} metalness={0.85} />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.4, 5.2], fov: 45 }}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} color="#9fe8ff" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#3dff7a" distance={14} />
      <pointLight position={[4, 2, -3]} intensity={26} color="#3aa8ff" distance={14} />
      <Kettlebell />
      <Environment>
        <Lightformer intensity={2} position={[0, 5, 2]} scale={[10, 10, 1]} />
        <Lightformer
          intensity={1.2}
          color="#4fd8ff"
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[20, 2, 1]}
        />
        <Lightformer
          intensity={1.2}
          color="#61ff9a"
          position={[5, -1, 1]}
          rotation-y={-Math.PI / 2}
          scale={[20, 2, 1]}
        />
      </Environment>
    </Canvas>
  );
}
