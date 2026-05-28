'use client';

import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

// ─── GLSL ─────────────────────────────────────────────────────────────────────

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;

  varying vec2  vUv;
  varying float vDepth;

  // Simple pseudo-random
  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    vUv = uv;

    // Radial depth: centre bulges forward
    vec2  c      = uv - 0.5;
    float radial = 1.0 - smoothstep(0.0, 0.55, length(c));
    vDepth = radial;

    // Animated micro-wave
    float wave =
      sin(uv.x * 9.0 + uTime * 0.55) *
      cos(uv.y * 7.0 + uTime * 0.42) * 0.014;

    vec3 pos = position;

    // Z bulge driven by depth + wave
    pos.z += (radial * 0.28 + wave);

    // Mouse-driven XY shift (deeper layers move more)
    pos.x += uMouse.x * radial * 0.12;
    pos.y += uMouse.y * radial * 0.09;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float     uTime;
  uniform vec2      uMouse;

  varying vec2  vUv;
  varying float vDepth;

  void main() {
    // Subtle chromatic aberration from mouse
    float ab = 0.0022 * length(uMouse);
    vec2  dir = normalize(uMouse + 0.001) * ab;

    float r = texture2D(uTexture, vUv + dir        ).r;
    float g = texture2D(uTexture, vUv              ).g;
    float b = texture2D(uTexture, vUv - dir        ).b;

    vec4 col = vec4(r, g, b, 1.0);

    // Vignette
    vec2  cv  = vUv - 0.5;
    float vig = 1.0 - dot(cv, cv) * 1.8;
    col.rgb  *= max(vig, 0.0);

    // Slight warm highlight on depth peaks
    col.rgb += vDepth * vec3(0.04, 0.03, 0.01);

    gl_FragColor = col;
  }
`;

// ─── Particle field ────────────────────────────────────────────────────────────

const particleVert = /* glsl */ `
  uniform float uTime;
  attribute float aSize;
  attribute float aSpeed;
  varying float   vAlpha;

  void main() {
    vec3 pos = position;

    // Each particle drifts gently
    pos.x += sin(uTime * aSpeed + pos.y * 2.8) * 0.06;
    pos.y += cos(uTime * aSpeed * 0.7 + pos.x * 3.1) * 0.04;
    pos.z += sin(uTime * aSpeed * 0.5 + pos.z * 2.0) * 0.05;

    vAlpha = 0.18 + 0.18 * sin(uTime * aSpeed + pos.x);

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = aSize * (280.0 / -mv.z);
    gl_Position  = projectionMatrix * mv;
  }
`;

const particleFrag = /* glsl */ `
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(0.04, 0.04, 0.04, a);
  }
`;

// ─── Particle mesh ─────────────────────────────────────────────────────────────

function Particles({ count = 1800 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!);

  const [positions, sizes, speeds] = useMemo(() => {
    const pos   = new Float32Array(count * 3);
    const sz    = new Float32Array(count);
    const sp    = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.4 + Math.random() * 2.2;          // shell around photo
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.5;
      sz[i]  = 0.8 + Math.random() * 1.6;
      sp[i]  = 0.25 + Math.random() * 0.6;
    }
    return [pos, sz, sp];
  }, [count]);

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize"    args={[sizes,     1]} />
        <bufferAttribute attach="attributes-aSpeed"   args={[speeds,    1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVert}
        fragmentShader={particleFrag}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─── Photo plane ───────────────────────────────────────────────────────────────

function PhotoPlane({ src }: { src: string }) {
  const meshRef    = useRef<THREE.Mesh>(null!);
  const groupRef   = useRef<THREE.Group>(null!);
  const mouseRef   = useRef(new THREE.Vector2(0, 0));
  const targetRef  = useRef(new THREE.Vector2(0, 0));
  const { gl, viewport } = useThree();

  const texture = useLoader(TextureLoader, src);

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.set(
        (e.clientX / window.innerWidth  - 0.5) * 2,
       -(e.clientY / window.innerHeight - 0.5) * 2,
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const uniforms = useMemo(() => ({
    uTexture: { value: texture },
    uTime:    { value: 0 },
    uMouse:   { value: new THREE.Vector2(0, 0) },
  }), [texture]);

  const geometry = useMemo(() => new THREE.PlaneGeometry(1, 1, 100, 100), []);

  useFrame(({ clock }) => {
    mouseRef.current.lerp(targetRef.current, 0.045);
    uniforms.uTime.value  = clock.elapsedTime;
    uniforms.uMouse.value.copy(mouseRef.current);

    if (!groupRef.current) return;

    // ── Slow auto-revolve on Y (the "spinning man" effect) ──────────────────
    groupRef.current.rotation.y = clock.elapsedTime * 0.18;

    // ── Mouse-driven tilt layered on top (X + slight Z roll) ───────────────
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * 0.22,
      0.04,
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
       mouseRef.current.x * 0.06,
      0.04,
    );

    // ── Subtle breathe: scale pulses ────────────────────────────────────────
    const breathe = 1 + Math.sin(clock.elapsedTime * 0.4) * 0.012;
    groupRef.current.scale.setScalar(breathe);
  });

  // Fit photo inside viewport maintaining 3:4 portrait ratio
  const maxW = Math.min(viewport.width  * 0.52, 5.8);
  const maxH = Math.min(viewport.height * 0.82, 7.2);
  const w = Math.min(maxW, maxH * 0.75);
  const h = w * (4 / 3);

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef} geometry={geometry} scale={[w, h, 1]}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

// ─── Scene ─────────────────────────────────────────────────────────────────────

function Scene() {
  return (
    <>
      <Suspense fallback={null}>
        <PhotoPlane src="/aaruhya.jpg" />
      </Suspense>
      <Particles count={1600} />
    </>
  );
}

// ─── Export ────────────────────────────────────────────────────────────────────

export function HeroPhotoCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 52 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  );
}
