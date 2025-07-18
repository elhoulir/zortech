// CrystalBackground.tsx
// Immersive, interactive crystal background for hero/section. Uses react-three-fiber. Crystal rotates and reacts to mouse movement. Premium lighting and bloom.
"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls } from '@react-three/drei';

function Crystal({ mouse, scroll }: { mouse: { x: number; y: number }; scroll: number }) {
  const mesh = useRef<any>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Rotate based on time, mouse, and scroll
      mesh.current.rotation.y = clock.getElapsedTime() * 0.18 + mouse.x * 0.5;
      mesh.current.rotation.x = 0.4 + mouse.y * 0.3 + Math.sin(clock.getElapsedTime() * 0.3) * 0.08;
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.18 + scroll * 0.2;
      const scale = 2.2 + Math.sin(clock.getElapsedTime() * 0.8) * 0.04;
      mesh.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, 0]} castShadow receiveShadow>
      <icosahedronGeometry args={[1.2, 0]} />
      <meshPhysicalMaterial
        color="#50b4ff"
        metalness={0.3}
        roughness={0.08}
        transmission={0.92}
        thickness={2.0}
        clearcoat={0.8}
        clearcoatRoughness={0.08}
        ior={1.48}
        reflectivity={0.7}
        opacity={0.97}
        transparent={true}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

export default function CrystalBackground() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scroll, setScroll] = useState(0);

  // Mouse move handler for parallax
  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    setMouse({ x, y });
  }
  // Scroll handler for subtle scroll-based animation
  function handleScroll() {
    setScroll(window.scrollY / window.innerHeight);
  }
  // Attach scroll listener
  if (typeof window !== 'undefined') {
    window.onscroll = handleScroll;
  }

  return (
    <div
      className="fixed inset-0 z-0 w-full h-full pointer-events-none"
      style={{ background: 'radial-gradient(circle at 60% 40%, #181c2a 0%, #0a101a 60%, #000 100%)' }}
      onPointerMove={handlePointerMove}
    >
      <Canvas camera={{ position: [0, 0, 7], fov: 60 }} gl={{ alpha: true }} shadows>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.1} castShadow />
        <directionalLight position={[-6, 2, 2]} intensity={0.7} color="#50b4ff" />
        <Crystal mouse={mouse} scroll={scroll} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.8} intensity={0.32} />
        </EffectComposer>
        {/* Optionally, allow user to rotate for fun: */}
        {/* <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} /> */}
      </Canvas>
    </div>
  );
} 