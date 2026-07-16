"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Residência procedural ao entardecer — pavilhão de vidro térreo com
 * volume de concreto em balanço, deck, piscina, vegetação e interior
 * habitado. Sombras reais (uma directional com shadow map) fazem o
 * trabalho pesado de credibilidade. Zero assets externos.
 */

const pointer = { x: 0, y: 0 };

/* ---------- materiais compartilhados (evita recriação) ---------- */
const M = {
  concrete: new THREE.MeshStandardMaterial({ color: "#d9d3c6", roughness: 0.92 }),
  concreteDark: new THREE.MeshStandardMaterial({ color: "#c7c0b1", roughness: 0.95 }),
  slab: new THREE.MeshStandardMaterial({ color: "#cfc9bb", roughness: 0.9 }),
  stone: new THREE.MeshStandardMaterial({ color: "#b5aea0", roughness: 0.96 }),
  frame: new THREE.MeshStandardMaterial({ color: "#26282b", roughness: 0.5, metalness: 0.4 }),
  glass: new THREE.MeshPhysicalMaterial({
    color: "#9fb6bd",
    roughness: 0.08,
    metalness: 0.1,
    transparent: true,
    opacity: 0.28,
  }),
  darkGlass: new THREE.MeshPhysicalMaterial({
    color: "#2b3138",
    roughness: 0.15,
    metalness: 0.5,
    emissive: new THREE.Color("#d9985c"),
    emissiveIntensity: 0.05,
  }),
  wood: new THREE.MeshStandardMaterial({ color: "#8a6f52", roughness: 0.8 }),
  woodDark: new THREE.MeshStandardMaterial({ color: "#6e5640", roughness: 0.85 }),
  deck: new THREE.MeshStandardMaterial({ color: "#967a5b", roughness: 0.88 }),
  brass: new THREE.MeshStandardMaterial({ color: "#ab9660", roughness: 0.35, metalness: 0.85 }),
  interiorWarm: new THREE.MeshStandardMaterial({
    color: "#4a3f33",
    emissive: new THREE.Color("#ffb877"),
    emissiveIntensity: 0.22,
  }),
  ledStrip: new THREE.MeshStandardMaterial({
    color: "#fff2dd",
    emissive: new THREE.Color("#ffd9a8"),
    emissiveIntensity: 1.4,
  }),
  water: new THREE.MeshStandardMaterial({ color: "#7fa2b0", roughness: 0.13, metalness: 0.08 }),
  leaf: new THREE.MeshStandardMaterial({ color: "#4a5741", roughness: 0.95 }),
  leafDark: new THREE.MeshStandardMaterial({ color: "#3b4634", roughness: 0.95 }),
  trunk: new THREE.MeshStandardMaterial({ color: "#5d4a38", roughness: 0.9 }),
  sofa: new THREE.MeshStandardMaterial({ color: "#cfc4b2", roughness: 0.9 }),
};

function Box({
  args,
  position,
  material,
  rotation,
  cast = true,
  receive = false,
}: {
  args: [number, number, number];
  position: [number, number, number];
  material: THREE.Material;
  rotation?: [number, number, number];
  cast?: boolean;
  receive?: boolean;
}) {
  return (
    <mesh
      position={position}
      rotation={rotation}
      material={material}
      castShadow={cast}
      receiveShadow={receive}
    >
      <boxGeometry args={args} />
    </mesh>
  );
}

/* ---------- pavilhão térreo de vidro ---------- */
function GlassPavilion() {
  const W = 8.2; // largura (x)
  const D = 4.6; // profundidade (z)
  const H = 2.05; // pé-direito
  const mullions = [];
  // caixilhos verticais na fachada frontal e posterior
  for (let i = 0; i <= 6; i++) {
    const x = -W / 2 + (i * W) / 6;
    mullions.push(
      <Box key={`f${i}`} args={[0.07, H, 0.07]} position={[x, H / 2 + 0.18, D / 2]} material={M.frame} />,
      <Box key={`b${i}`} args={[0.07, H, 0.07]} position={[x, H / 2 + 0.18, -D / 2]} material={M.frame} />
    );
  }

  return (
    <group>
      {/* base/plinto de pedra */}
      <Box args={[W + 0.7, 0.2, D + 0.7]} position={[0, 0.1, 0]} material={M.stone} receive />
      {/* piso interno de madeira */}
      <Box args={[W - 0.2, 0.04, D - 0.2]} position={[0, 0.22, 0]} material={M.wood} cast={false} receive />

      {/* vidro (4 faces) */}
      <Box args={[W, H, 0.04]} position={[0, H / 2 + 0.18, D / 2]} material={M.glass} cast={false} />
      <Box args={[W, H, 0.04]} position={[0, H / 2 + 0.18, -D / 2]} material={M.glass} cast={false} />
      <Box args={[0.04, H, D]} position={[-W / 2, H / 2 + 0.18, 0]} material={M.glass} cast={false} />
      <Box args={[0.04, H, D]} position={[W / 2, H / 2 + 0.18, 0]} material={M.glass} cast={false} />

      {/* caixilhos */}
      {mullions}
      {/* travessas horizontais (topo e base do vidro) */}
      <Box args={[W + 0.08, 0.09, 0.09]} position={[0, 0.24, D / 2]} material={M.frame} />
      <Box args={[W + 0.08, 0.09, 0.09]} position={[0, H + 0.14, D / 2]} material={M.frame} />
      <Box args={[W + 0.08, 0.09, 0.09]} position={[0, 0.24, -D / 2]} material={M.frame} />
      <Box args={[W + 0.08, 0.09, 0.09]} position={[0, H + 0.14, -D / 2]} material={M.frame} />

      {/* núcleo interno (parede de madeira ao fundo — TV/lareira) */}
      <Box args={[2.6, H - 0.1, 0.16]} position={[-1.6, H / 2 + 0.18, -1.5]} material={M.woodDark} />
      {/* sofá */}
      <Box args={[2.2, 0.34, 0.85]} position={[-1.4, 0.42, 0.35]} material={M.sofa} />
      <Box args={[2.2, 0.42, 0.22]} position={[-1.4, 0.62, -0.05]} material={M.sofa} />
      {/* mesa de jantar + pendente */}
      <Box args={[1.5, 0.06, 0.75]} position={[1.9, 0.72, -0.6]} material={M.woodDark} />
      <Box args={[0.08, 0.5, 0.08]} position={[1.9, 0.47, -0.6]} material={M.frame} />
      <Box args={[0.9, 0.05, 0.12]} position={[1.9, 1.95, -0.6]} material={M.ledStrip} cast={false} />
      {/* forro interno aquecido */}
      <Box args={[W - 0.3, 0.05, D - 0.3]} position={[0, H + 0.12, 0]} material={M.interiorWarm} cast={false} />

      {/* laje de transição */}
      <Box args={[W + 0.9, 0.16, D + 0.9]} position={[0, H + 0.28, 0]} material={M.slab} />
    </group>
  );
}

/* ---------- volume superior de concreto ---------- */
function UpperVolume() {
  const W = 6.0;
  const H = 1.75;
  const D = 4.1;
  const y0 = 2.41; // topo da laje de transição
  const x0 = -1.7; // balanço pra esquerda
  const winW = 4.2;

  const mullions = [];
  for (let i = 0; i <= 4; i++) {
    mullions.push(
      <Box
        key={i}
        args={[0.05, 0.85, 0.06]}
        position={[x0 - 0.5 + (i * winW) / 4 - winW / 2 + winW / 2, y0 + H / 2, 2.06 + x0 * 0]}
        material={M.frame}
      />
    );
  }

  return (
    <group>
      {/* corpo de concreto */}
      <Box args={[W, H, D]} position={[x0, y0 + H / 2, -0.2]} material={M.concrete} />

      {/* rasgo de janela — vidro escuro com caixilhos */}
      <Box args={[winW, 0.85, 0.06]} position={[x0 - 0.5, y0 + H / 2, 1.88]} material={M.darkGlass} cast={false} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Box
          key={i}
          args={[0.05, 0.85, 0.1]}
          position={[x0 - 0.5 - winW / 2 + (i * winW) / 4, y0 + H / 2, 1.88]}
          material={M.frame}
        />
      ))}
      {/* peitoril */}
      <Box args={[winW + 0.15, 0.07, 0.16]} position={[x0 - 0.5, y0 + H / 2 - 0.48, 1.9]} material={M.brass} />

      {/* ripado de madeira na face direita do volume */}
      {Array.from({ length: 9 }).map((_, i) => (
        <Box
          key={i}
          args={[0.07, H - 0.12, 0.12]}
          position={[x0 + W / 2 + 0.05, y0 + H / 2, -1.9 + i * 0.42]}
          material={M.wood}
        />
      ))}

      {/* cobertura com beiral generoso + testa */}
      <Box args={[W + 1.3, 0.1, D + 1.2]} position={[x0, y0 + H + 0.09, -0.2]} material={M.slab} />
      <Box args={[W + 1.3, 0.16, 0.08]} position={[x0, y0 + H + 0.06, -0.2 + (D + 1.2) / 2]} material={M.concreteDark} />
      {/* friso de latão na testa da cobertura */}
      <Box args={[W + 1.3, 0.045, 0.05]} position={[x0, y0 + H + 0.15, -0.2 + (D + 1.2) / 2 + 0.02]} material={M.brass} />

      {/* LED linear no soffit do balanço (lava o deck de luz quente) */}
      <Box
        args={[W - 0.6, 0.03, 0.06]}
        position={[x0, y0 - 0.04, 1.65]}
        material={M.ledStrip}
        cast={false}
      />
    </group>
  );
}

/* ---------- entrada: porta pivotante + escada + caminho ---------- */
function Entry() {
  return (
    <group position={[4.35, 0, 0.6]}>
      {/* parede cega lateral que recebe a porta */}
      <Box args={[0.14, 2.2, 1.7]} position={[0, 1.28, -0.5]} material={M.concreteDark} />
      {/* porta pivotante de madeira escura */}
      <Box args={[0.09, 1.95, 0.95]} position={[0.02, 1.15, 0.55]} material={M.woodDark} />
      {/* puxador de latão */}
      <Box args={[0.05, 0.6, 0.05]} position={[0.1, 1.15, 0.25]} material={M.brass} />
      {/* degraus de pedra */}
      <Box args={[1.4, 0.13, 0.5]} position={[0.5, 0.065, 1.35]} material={M.stone} receive />
      <Box args={[1.4, 0.13, 0.5]} position={[0.7, 0.045, 1.85]} material={M.stone} receive />
      {/* caminho de lajes até a "rua" */}
      {[0, 1, 2, 3].map((i) => (
        <Box
          key={i}
          args={[1.1, 0.05, 0.72]}
          position={[0.9 + i * 0.12, 0.025, 2.5 + i * 0.95]}
          material={M.stone}
          cast={false}
          receive
        />
      ))}
    </group>
  );
}

/* ---------- deck + piscina ---------- */
function PoolDeck() {
  return (
    <group position={[1.6, 0, 4.6]}>
      {/* deck de madeira em réguas */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Box
          key={i}
          args={[6.6, 0.05, 0.3]}
          position={[-0.4, 0.05, -1.2 + i * 0.37]}
          material={M.deck}
          cast={false}
          receive
        />
      ))}
      {/* borda de pedra clara da piscina */}
      <Box args={[4.6, 0.09, 2.15]} position={[-0.6, 0.055, 1.55]} material={M.stone} cast={false} receive />
      {/* água */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.6, 0.115, 1.55]} material={M.water} receiveShadow>
        <planeGeometry args={[4.25, 1.8]} />
      </mesh>
      {/* espreguiçadeiras */}
      <Box args={[0.55, 0.1, 1.35]} position={[2.3, 0.14, 1.3]} material={M.wood} />
      <Box args={[0.55, 0.28, 0.3]} position={[2.3, 0.23, 0.75]} material={M.wood} />
    </group>
  );
}

/* ---------- vegetação procedural ---------- */
function Tree({
  position,
  scale = 1,
  dark = false,
}: {
  position: [number, number, number];
  scale?: number;
  dark?: boolean;
}) {
  const leaf = dark ? M.leafDark : M.leaf;
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.9, 0]} material={M.trunk} castShadow>
        <cylinderGeometry args={[0.07, 0.11, 1.8, 6]} />
      </mesh>
      <mesh position={[0, 2.1, 0]} material={leaf} castShadow>
        <sphereGeometry args={[0.85, 12, 10]} />
      </mesh>
      <mesh position={[0.4, 2.6, 0.15]} material={leaf} castShadow>
        <sphereGeometry args={[0.55, 10, 8]} />
      </mesh>
      <mesh position={[-0.42, 2.5, -0.1]} material={leaf} castShadow>
        <sphereGeometry args={[0.48, 10, 8]} />
      </mesh>
    </group>
  );
}

function Landscape() {
  return (
    <group>
      {/* árvores — afastadas do eixo do título */}
      <Tree position={[-10.5, 0, 1.2]} scale={1.6} />
      <Tree position={[-12.2, 0, -2.6]} scale={2.0} dark />
      <Tree position={[8.2, 0, -3.0]} scale={1.3} dark />
      {/* cerca-viva ao fundo */}
      <Box args={[16, 1.1, 0.7]} position={[-0.5, 0.55, -5.4]} material={M.leafDark} />
      {/* arbustos baixos perto da entrada */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[5.9 + i * 0.75, 0.3, 3.4 + i * 0.5]} material={M.leaf} castShadow>
          <sphereGeometry args={[0.34 + (i % 2) * 0.08, 10, 8]} />
        </mesh>
      ))}
      {/* muro baixo de pedra à esquerda com jardineira */}
      <Box args={[3.4, 0.75, 0.32]} position={[-8.4, 0.375, 3.2]} material={M.stone} receive />
      <Box args={[3.2, 0.28, 0.26]} position={[-8.4, 0.85, 3.2]} material={M.leafDark} />
      {/* gramado (mancha sutil mais verde sob as árvores) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-9.5, 0.005, 0.2]} receiveShadow>
        <circleGeometry args={[5.2, 24]} />
        <meshStandardMaterial color="#b9b6a0" roughness={0.98} />
      </mesh>
    </group>
  );
}

/* ---------- câmera ---------- */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  const look = useRef(new THREE.Vector3(-7.0, 1.55, 0));

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 1 / 30);
    const t = clock.elapsedTime;

    const baseX = 15.8 + Math.sin(t * 0.05) * 1.4;
    const baseY = 3.2 + Math.sin(t * 0.038) * 0.28;
    const baseZ = 16.0 + Math.cos(t * 0.045) * 1.1;

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

function Stage() {
  return (
    <>
      <color attach="background" args={["#eae6da"]} />
      <fog attach="fog" args={["#eae6da", 16, 40]} />

      {/* sol baixo de entardecer com sombras reais */}
      <directionalLight
        position={[-9, 7, 6]}
        intensity={2.3}
        color="#ffd6a4"
        castShadow
        shadow-mapSize-width={768}
        shadow-mapSize-height={768}
        shadow-camera-left={-13}
        shadow-camera-right={13}
        shadow-camera-top={13}
        shadow-camera-bottom={-13}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-bias={-0.0004}
      />
      <hemisphereLight args={["#dfe7f0", "#b8ac96", 0.6]} />
      <directionalLight position={[7, 4, -6]} intensity={0.45} color="#b9c8dd" />
      {/* brilho quente vindo do interior, lavando o deck */}
      <pointLight position={[0, 1.4, 2.4]} intensity={6} distance={7} decay={2} color="#ffb877" />

      {/* terreno */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#ddd7c9" roughness={0.97} />
      </mesh>

      <GlassPavilion />
      <UpperVolume />
      <Entry />
      <PoolDeck />
      <Landscape />
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
      shadows
      camera={{ position: [13.4, 2.9, 13.6], fov: 33 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={() => {
        window.dispatchEvent(new CustomEvent("av:ready"));
      }}
    >
      <Stage />
    </Canvas>
  );
}
