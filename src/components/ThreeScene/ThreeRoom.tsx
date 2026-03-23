'use client';

import React, { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Plane } from '@react-three/drei';
import { useStore } from '@/store/useStore';
import type { Drawer, Item } from '@/store/useStore';

// Deterministic pseudo-random from string id
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// Warm, earthy spine colors
const SPINE_COLORS = [
  '#7A5C3A', '#5C4028', '#8B6B45', '#6B4F38',
  '#A07848', '#4E3820', '#926040', '#704535',
  '#C8A96E', '#5A4030', '#8A6038', '#3E2C18',
  '#B8945A', '#624838', '#9C7050',
];

function ItemSpine({
  item,
  index,
  total,
  shelfWidth,
}: {
  item: Item;
  index: number;
  total: number;
  shelfWidth: number;
}) {
  const [hovered, setHovered] = useState(false);
  const h = hash(item.id);

  const spineW = 0.055 + (h % 20) * 0.002;
  const spineH = 0.22 + (h % 15) * 0.012;
  const spineD = 0.15 + (h % 8) * 0.01;
  const tilt = ((h % 20) - 10) * 0.012;

  const usableWidth = shelfWidth - 0.3;
  const spacing = total > 1 ? usableWidth / (total - 1) : 0;
  const startX = -(usableWidth / 2);
  const x = total === 1 ? 0 : startX + index * spacing;

  const baseColor = SPINE_COLORS[h % SPINE_COLORS.length];

  return (
    <group
      position={[x, 0.03 + spineH / 2, 0]}
      rotation={[0, 0, tilt]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Box args={[spineW, spineH, spineD]} castShadow>
        <meshStandardMaterial
          color={hovered ? '#C8A96E' : baseColor}
          roughness={0.75}
          metalness={0.05}
        />
      </Box>
    </group>
  );
}

function ShelfUnit({
  drawer,
  items,
  position,
  onSelect,
}: {
  drawer: Drawer;
  items: Item[];
  position: [number, number, number];
  onSelect: (id: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const shelfWidth = 3.8;
  const maxVisible = 40;
  const visible = items.slice(0, maxVisible);

  return (
    <group position={position}>
      {/* Shelf plank */}
      <Box
        args={[shelfWidth, 0.05, 0.28]}
        position={[0, 0, 0]}
        receiveShadow
        onClick={() => onSelect(drawer.id)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? '#3A2E1A' : '#221A0E'}
          roughness={0.88}
          metalness={0.05}
          emissive={hovered ? '#110800' : '#000000'}
        />
      </Box>

      {/* Drawer label — left side */}
      <Text
        position={[-shelfWidth / 2 - 0.08, 0.18, 0.1]}
        fontSize={0.1}
        color={hovered ? '#C8A96E' : '#4A4030'}
        anchorX="right"
        anchorY="middle"
        maxWidth={1.5}
      >
        {drawer.name}
      </Text>

      {/* Item count — right side */}
      {items.length > 0 && (
        <Text
          position={[shelfWidth / 2 + 0.08, 0.18, 0.1]}
          fontSize={0.09}
          color="#3A3020"
          anchorX="left"
          anchorY="middle"
        >
          {`${items.length}`}
        </Text>
      )}

      {/* Empty shelf hint */}
      {items.length === 0 && (
        <Text
          position={[0, 0.15, 0.1]}
          fontSize={0.08}
          color="#2A2418"
          anchorX="center"
          anchorY="middle"
        >
          비어 있음
        </Text>
      )}

      {/* Items on shelf */}
      {visible.map((item, i) => (
        <ItemSpine
          key={item.id}
          item={item}
          index={i}
          total={visible.length}
          shelfWidth={shelfWidth - 0.5}
        />
      ))}

      {/* Hover highlight overlay */}
      {hovered && (
        <Box args={[shelfWidth, 0.45, 0.32]} position={[0, 0.18, 0]}>
          <meshStandardMaterial color="#C8A96E" transparent opacity={0.04} />
        </Box>
      )}
    </group>
  );
}

function RoomScene({
  roomId,
  onDrawerClick,
}: {
  roomId: string;
  onDrawerClick: (id: string) => void;
}) {
  const { drawers, items } = useStore();
  const roomDrawers = drawers.filter((d) => d.roomId === roomId);

  const shelfSpacing = 0.62;
  const totalHeight = roomDrawers.length * shelfSpacing;
  const caseY = totalHeight / 2 - 0.8;
  const caseH = totalHeight + 0.5;

  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.55} color="#F0E4C8" />
      <pointLight position={[0, 6, 3]} intensity={1.4} color="#FFE8C0" castShadow />
      <pointLight position={[-4, 3, 1]} intensity={0.3} color="#C8A96E" />
      <pointLight position={[4, 3, 1]} intensity={0.3} color="#C8A96E" />

      {/* Floor */}
      <Plane
        args={[20, 14]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#0C0B09" roughness={0.97} />
      </Plane>

      {/* Back wall */}
      <Plane args={[12, 10]} position={[0, 2.5, -5.5]} receiveShadow>
        <meshStandardMaterial color="#100F0C" roughness={0.92} />
      </Plane>

      {/* Side walls */}
      <Plane
        args={[12, 10]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-6, 2.5, -0.5]}
        receiveShadow
      >
        <meshStandardMaterial color="#0E0D0A" roughness={0.92} />
      </Plane>
      <Plane
        args={[12, 10]}
        rotation={[0, -Math.PI / 2, 0]}
        position={[6, 2.5, -0.5]}
        receiveShadow
      >
        <meshStandardMaterial color="#0E0D0A" roughness={0.92} />
      </Plane>

      {/* Bookcase back panel */}
      <Box args={[4.4, caseH, 0.04]} position={[0, caseY, -5.1]}>
        <meshStandardMaterial color="#1A1610" roughness={0.95} />
      </Box>

      {/* Bookcase side panels */}
      <Box args={[0.06, caseH, 0.34]} position={[-2.23, caseY, -4.93]}>
        <meshStandardMaterial color="#241D10" roughness={0.9} />
      </Box>
      <Box args={[0.06, caseH, 0.34]} position={[2.23, caseY, -4.93]}>
        <meshStandardMaterial color="#241D10" roughness={0.9} />
      </Box>

      {/* Shelves */}
      {roomDrawers.map((drawer, i) => {
        const drawerItems = items.filter((it) => it.drawerId === drawer.id);
        const y = i * shelfSpacing - 0.8;
        return (
          <ShelfUnit
            key={drawer.id}
            drawer={drawer}
            items={drawerItems}
            position={[0, y, -4.93]}
            onSelect={onDrawerClick}
          />
        );
      })}

      {/* Empty room prompt */}
      {roomDrawers.length === 0 && (
        <Text
          position={[0, 0.5, -3]}
          fontSize={0.18}
          color="#2E2820"
          anchorX="center"
          anchorY="middle"
        >
          서랍을 추가하면 여기에 나타납니다
        </Text>
      )}
    </group>
  );
}

export default function ThreeRoom({
  roomId,
  onDrawerClick,
}: {
  roomId: string;
  onDrawerClick: (drawerId: string) => void;
}) {
  return (
    <div
      className="w-full h-full"
      style={{ background: '#0F0E0C', minHeight: '100%' }}
    >
      <Canvas
        shadows
        camera={{ position: [0, 1.5, 7], fov: 48 }}
        gl={{ antialias: true }}
      >
        <OrbitControls
          enableDamping
          dampingFactor={0.06}
          minDistance={3}
          maxDistance={14}
          maxPolarAngle={Math.PI / 2.05}
          rotateSpeed={0.45}
          target={[0, 0.5, -2.5]}
        />
        <RoomScene roomId={roomId} onDrawerClick={onDrawerClick} />
      </Canvas>
    </div>
  );
}
