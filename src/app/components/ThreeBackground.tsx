"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { useScroll } from "framer-motion";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

function getColorFromScroll(scroll: number) {
  // 0: blue, 0.33: purple, 0.66: pink, 1: orange
  if (scroll < 0.33) {
    // Blue to Purple
    const t = scroll / 0.33;
    return `hsl(${220 + 40 * t}, 80%, 60%)`;
  } else if (scroll < 0.66) {
    // Purple to Pink
    const t = (scroll - 0.33) / 0.33;
    return `hsl(${260 + 40 * t}, 80%, 60%)`;
  } else {
    // Pink to Orange
    const t = (scroll - 0.66) / 0.34;
    return `hsl(${300 + 60 * t}, 80%, 60%)`;
  }
}

function InteractiveIcosahedron({ scroll, pulsing, onClick, baseScale = 1.8 }: { scroll: number; pulsing: boolean; onClick: () => void; baseScale?: number }) {
  const mesh = useRef<any>(null);
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = scroll * Math.PI * 2;
      mesh.current.rotation.x = 0.2 + scroll * Math.PI;
      mesh.current.position.y = Math.sin(clock.getElapsedTime() * 0.7) * 0.22;
      const scale = pulsing ? baseScale + 0.2 + Math.sin(clock.getElapsedTime() * 4) * 0.08 : baseScale;
      mesh.current.scale.set(scale, scale, scale);
    }
  });
  return (
    <mesh
      ref={mesh}
      position={[0, 0, 0]}
      onClick={onClick}
      castShadow
      receiveShadow
    >
      <icosahedronGeometry args={[1.2, 0]} />
      <meshPhysicalMaterial
        color={getColorFromScroll(scroll)}
        metalness={0.2}
        roughness={0.05}
        transmission={0.95}
        thickness={1.5}
        clearcoat={0.7}
        clearcoatRoughness={0.1}
        ior={1.45}
        reflectivity={0.6}
        emissive={pulsing ? "#50b4ff" : "#1a2233"}
        emissiveIntensity={pulsing ? 0.5 : 0.18}
        opacity={0.95}
        transparent={true}
      />
    </mesh>
  );
}

function SoftShadowPlane() {
  return (
    <mesh
      position={[0, -1.5, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[6, 6]} />
      <shadowMaterial opacity={0.18} />
    </mesh>
  );
}

export default function ThreeBackground() {
  const [pulsing, setPulsing] = useState(false);
  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState(0);
  // Remove visible state and scroll-based visibility logic
  const [baseScale, setBaseScale] = useState(1.8);
  const [cameraZ, setCameraZ] = useState(6);

  // Animate scroll progress
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScroll(v));
    return () => unsub();
  }, [scrollYProgress]);

  // Responsive scale and camera
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) { // mobile
        setBaseScale(1.1);
        setCameraZ(8);
      } else if (window.innerWidth < 1024) { // tablet
        setBaseScale(1.4);
        setCameraZ(7);
      } else { // desktop
        setBaseScale(1.8);
        setCameraZ(6);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 w-full h-full flex items-center justify-center">
      {/* Vast, vacuum-like background with strong vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #181c2a 0%, #0a101a 60%, #000 100%)",
          filter: "blur(12px)",
          boxShadow: "0 0 0 100vw #000c inset",
        }}
      />
      {/* Optional faint starfield for cosmic depth */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/images/noise.png")',
          opacity: 0.08,
          mixBlendMode: 'screen',
        }}
      />
      {/* Remove opacity/visibility logic, always render Canvas */}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-700">
        <Canvas camera={{ position: [0, 0, cameraZ + 3], fov: 60 }} gl={{ alpha: true }} shadows>
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
          {/* Blue rim light from the left/back */}
          <directionalLight position={[-6, 2, 2]} intensity={0.7} color="#50b4ff" />
          <SoftShadowPlane />
          <InteractiveIcosahedron scroll={scroll} pulsing={pulsing} onClick={() => setPulsing((p) => !p)} baseScale={baseScale * 0.8} />
          {/* Gentle bloom/glow effect */}
          <EffectComposer>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.8} intensity={0.25} />
          </EffectComposer>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        </Canvas>
      </div>
    </div>
  );
} 