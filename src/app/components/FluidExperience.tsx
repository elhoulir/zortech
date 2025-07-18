// src/components/FluidExperience.tsx
"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { ShaderMaterial, Vector2, Mesh } from 'three';
import { Icosahedron, Stars } from '@react-three/drei';
import { gsap } from 'gsap';

const fragmentShader = `
  uniform vec2 u_mouse;
  uniform float u_time;
  varying vec2 vUv;

  // 2D Noise function by Inigo Quilez
  float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  // Fractional Brownian Motion to create layers of noise
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 st = vUv;
    st *= 2.0; 

    float fbm_noise = fbm(st + vec2(u_time * 0.1, u_time * 0.1));

    // Darker, more atmospheric color palette
    vec3 color1 = vec3(0.01, 0.0, 0.05);  // Deep, dark purple
    vec3 color2 = vec3(0.05, 0.05, 0.2);   // Dark navy blue
    vec3 color3 = vec3(0.5, 0.1, 0.3);   // Muted magenta for accents

    vec3 color = mix(color1, color2, smoothstep(0.3, 0.4, fbm_noise));
    color = mix(color, color3, smoothstep(0.5, 0.6, fbm_noise));
    
    float vignette = 1.0 - length(vUv - 0.5) * 1.2;
    color *= vignette;
    
    float mouse_glow = 1.0 - distance(vUv, u_mouse);
    color += smoothstep(0.8, 1.0, mouse_glow) * 0.1; // Reduced glow intensity

    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function InteractiveObject() {
    const meshRef = useRef<Mesh>(null!);

    // Intro Animation
    useEffect(() => {
        if (meshRef.current) {
            gsap.set(meshRef.current.scale, { x: 0, y: 0, z: 0 });
            gsap.set(meshRef.current.rotation, { x: Math.PI, y: Math.PI });

            gsap.to(meshRef.current.scale, {
                x: 1, y: 1, z: 1,
                duration: 1.5,
                ease: 'power3.out',
                delay: 0.5,
            });
            gsap.to(meshRef.current.rotation, {
                x: 0, y: 0,
                duration: 2,
                ease: 'power3.out',
                delay: 0.5,
            });
        }
    }, []);

    // Continuous floating animation
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
        }
    });

    return (
        <Icosahedron ref={meshRef} args={[0.6, 0]}>
            <meshPhysicalMaterial
                roughness={0}
                transmission={1}
                thickness={1.5}
            />
        </Icosahedron>
    );
}

export default function FluidExperience() {
    const materialRef = useRef<ShaderMaterial>(null!);
    const { viewport } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.u_mouse.value.x = (state.mouse.x + 1) / 2;
            materialRef.current.uniforms.u_mouse.value.y = (state.mouse.y + 1) / 2;
            materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime();
        }
    });

    return (
        <>
            <Stars radius={200} depth={50} count={5000} factor={7} saturation={0} fade speed={1} />
            <mesh>
                <planeGeometry args={[viewport.width, viewport.height]} />
                <shaderMaterial
                    ref={materialRef}
                    fragmentShader={fragmentShader}
                    vertexShader={vertexShader}
                    uniforms={{
                        u_mouse: { value: new Vector2(0.5, 0.5) },
                        u_time: { value: 0.0 },
                    }}
                />
            </mesh>

            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <InteractiveObject />
        </>
    );
}