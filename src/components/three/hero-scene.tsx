"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/**
 * Residência procedural minimalista ao entardecer.
 * Câmera em drift contínuo muito lento + parallax de ponteiro.
 * Nenhum asset externo — geometria e luz apenas.
 */

const pointer = { x: 0, y: 0 };

function CameraRig() {
  const camera = useThree((s) => s.camera);
  // alvo deslocado pra ESQUERDA da casa — a casa assenta no terço direito
  // do quadro e o texto respira sobre o chão/névoa à esquerda
  const look = useRef(new THREE.Vector3(-4.6, 1.5, 0));

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const t = clock.elapsedTime;

    // dolly em arco, extremamente lento e distante
    const baseX = 12.6 + Math.sin(t * 0.05) * 1.3;
    const baseY = 2.9 + Math.sin(t * 0.038) * 0.25;
    const baseZ = 13.2 + Math.cos(t * 0.045) * 1.0;

    // parallax do mouse (amortecido)
    const px = pointer.x * 0.6;
    const py = pointer.y * 0.32;

    const k = 1 - Math.exp(-2.2 * dt);
    camera.position.x += (baseX + px - camera.position.x) * k;
    camera.position.y += (baseY - py - camera.position.y) * k;
    camera.position.z += (baseZ - camera.position.z) * k;
    camera.lookAt(look.current);
  });

  return null;
}

function House() {
  return (
    <group position={[0, 0, 0]}>
      {/* volume inferior — vidro */}
      <mesh position={[0, 0.9, 0.4]}>
        <boxGeometry args={[7.2, 1.8, 4.6]} />
        <meshPhysicalMaterial
          color="#9fb4bb"
          roughness={0.06}
          metalness={0.1}
          transparent
          opacity={0.32}
          envMapIntensity={0.9}
        />
      </mesh>

      {/* interior aquecido (visível através do vidro) */}
      <mesh position={[0, 0.9, 0.4]}>
        <boxGeometry args={[6.9, 1.6, 4.3]} />
        <meshStandardMaterial color="#3a3229" emissive="#e8a668" emissiveIntensity={0.14} />
      </mesh>

      {/* laje intermediária */}
      <mesh position={[0, 1.86, 0.4]}>
        <boxGeometry args={[7.8, 0.14, 5.2]} />
        <meshStandardMaterial color="#dcd6ca" roughness={0.85} />
      </mesh>

      {/* volume superior — concreto, em balanço */}
      <mesh position={[-0.9, 2.72, 0.1]}>
        <boxGeometry args={[6.4, 1.6, 4.0]} />
        <meshStandardMaterial color="#d9d3c7" roughness={0.92} />
      </mesh>

      {/* rasgo de janela no volume superior — vidro escuro reflexivo */}
      <mesh position={[-0.9, 2.72, 2.12]}>
        <boxGeometry args={[5.2, 0.9, 0.02]} />
        <meshPhysicalMaterial
          color="#252a31"
          roughness={0.12}
          metalness={0.55}
          envMapIntensity={1.5}
          emissive="#d9985c"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* cobertura fina */}
      <mesh position={[-0.9, 3.58, 0.1]}>
        <boxGeometry args={[6.9, 0.1, 4.5]} />
        <meshStandardMaterial color="#c9c2b4" roughness={0.9} />
      </mesh>

      {/* friso de latão na borda da cobertura */}
      <mesh position={[-0.9, 3.52, 2.36]}>
        <boxGeometry args={[6.9, 0.05, 0.04]} />
        <meshStandardMaterial color="#ab9660" roughness={0.35} metalness={0.85} />
      </mesh>

      {/* parede de ripas de madeira */}
      <group position={[3.2, 0.9, -1.4]}>
        {Array.from({ length: 11 }).map((_, i) => (
          <mesh key={i} position={[0, 0, i * 0.34 - 1.7]}>
            <boxGeometry args={[0.09, 1.8, 0.16]} />
            <meshStandardMaterial color="#8f7355" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* muro baixo de pedra */}
      <mesh position={[-4.6, 0.5, 1.6]}>
        <boxGeometry args={[2.6, 1.0, 0.3]} />
        <meshStandardMaterial color="#b8b2a6" roughness={0.95} />
      </mesh>

    </group>
  );
}

function Stage() {
  return (
    <>
      <color attach="background" args={["#eceade"]} />
      <fog attach="fog" args={["#eceade", 14, 34]} />

      {/* sol de entardecer — sem Environment/PMREM (caro demais na
          inicialização; hemisphere + 2 direcionais dão o mesmo clima) */}
      <directionalLight position={[-7, 6, 4]} intensity={2.2} color="#ffd9ac" />
      <hemisphereLight args={["#dfe7f0", "#b8ac96", 0.65]} />
      <directionalLight position={[6, 4, -6]} intensity={0.5} color="#b9c8dd" />

      {/* piso */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial color="#dfdacd" roughness={0.96} />
      </mesh>

      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.42}
        scale={22}
        blur={2.6}
        far={5}
        resolution={512}
        frames={1}
      />

      <House />
      <CameraRig />
    </>
  );
}

export default function HeroScene() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [8.6, 2.3, 8.8], fov: 33 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={() => {
        window.dispatchEvent(new CustomEvent("av:ready"));
      }}
    >
      <Stage />
    </Canvas>
  );
}
