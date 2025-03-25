import React, { useState, useRef } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Text } from '@react-three/drei';
import { Painting } from '@/lib/data';
import * as THREE from 'three';

interface ArtworkFramesProps {
  paintings: Painting[];
  onSelectArtwork: (painting: Painting) => void;
}

const ArtworkFrames: React.FC<ArtworkFramesProps> = ({ paintings, onSelectArtwork }) => {
  return (
    <group>
      {paintings.map((painting, index) => (
        <ArtworkFrame 
          key={painting.id}
          painting={painting}
          position={calculatePosition(index, paintings.length)}
          onSelect={() => onSelectArtwork(painting)}
        />
      ))}
    </group>
  );
};

// Calculate position for each artwork on the walls
const calculatePosition = (index: number, totalPaintings: number): [number, number, number] => {
  // Distribute paintings evenly on walls
  // Back wall, left wall, right wall
  
  const paintingsPerWall = Math.ceil(totalPaintings / 3);
  const wallIndex = Math.floor(index / paintingsPerWall);
  const positionOnWall = index % paintingsPerWall;
  
  // Space between paintings
  const spacing = 3;
  
  switch (wallIndex) {
    case 0: // Back wall
      // x position: centered and distributed along the wall
      const backWallX = (positionOnWall - (paintingsPerWall - 1) / 2) * spacing;
      return [backWallX, 1.5, -5.9]; // y is height, z is fixed at back wall
    
    case 1: // Left wall
      // z position: distributed along the wall
      const leftWallZ = (positionOnWall - (paintingsPerWall - 1) / 2) * spacing;
      return [-5.9, 1.5, leftWallZ]; // x is fixed at left wall
    
    case 2: // Right wall
      // z position: distributed along the wall
      const rightWallZ = (positionOnWall - (paintingsPerWall - 1) / 2) * spacing;
      return [5.9, 1.5, rightWallZ]; // x is fixed at right wall
    
    default:
      return [0, 1.5, 0]; // fallback
  }
};

interface ArtworkFrameProps {
  painting: Painting;
  position: [number, number, number];
  onSelect: () => void;
}

const ArtworkFrame: React.FC<ArtworkFrameProps> = ({ painting, position, onSelect }) => {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();
  
  // Load the artwork texture
  const texture = useLoader(TextureLoader, painting.imageUrl);
  
  // Calculate aspect ratio for the frame
  const aspectRatio = texture.image ? texture.image.width / texture.image.height : 1;
  const frameWidth = 1.5; // Base width
  const frameHeight = frameWidth / aspectRatio;
  
  // Determine frame rotation based on position
  let rotation: [number, number, number] = [0, 0, 0];
  
  // If on left wall
  if (position[0] < -5) {
    rotation = [0, Math.PI / 2, 0];
  }
  // If on right wall
  else if (position[0] > 5) {
    rotation = [0, -Math.PI / 2, 0];
  }
  
  // Animation for hover effect
  useFrame(() => {
    if (meshRef.current) {
      if (hovered) {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1.05, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1.05, 0.1);
      } else {
        meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1);
        meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, 1, 0.1);
      }
    }
  });
  
  // Handle pointer events
  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  
  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  
  const handleClick = (e: any) => {
    e.stopPropagation();
    setClicked(!clicked);
    onSelect();
    
    // Make camera look at this artwork
    if (meshRef.current) {
      const artworkPosition = new THREE.Vector3();
      meshRef.current.getWorldPosition(artworkPosition);
      camera.lookAt(artworkPosition);
    }
  };
  
  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        {/* Frame border */}
        <boxGeometry args={[frameWidth + 0.1, frameHeight + 0.1, 0.05]} />
        <meshStandardMaterial color="#8B4513" roughness={0.5} metalness={0.2} />
        
        {/* Artwork */}
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          <meshBasicMaterial map={texture} />
        </mesh>
      </mesh>
      
      {/* Artwork title */}
      <Text
        position={[0, -frameHeight / 2 - 0.15, 0.05]}
        fontSize={0.08}
        color="#333333"
        anchorX="center"
        anchorY="top"
        maxWidth={frameWidth}
      >
        {painting.title}
      </Text>
      
      {/* Price tag */}
      <Text
        position={[0, -frameHeight / 2 - 0.25, 0.05]}
        fontSize={0.06}
        color="#666666"
        anchorX="center"
        anchorY="top"
      >
        {painting.sold ? "Vendu" : `${painting.price.toLocaleString()} $`}
      </Text>
      
      {/* "Sold" ribbon for sold paintings */}
      {painting.sold && (
        <mesh position={[frameWidth / 2 - 0.2, frameHeight / 2 - 0.2, 0.06]} rotation={[0, 0, -Math.PI / 4]}>
          <planeGeometry args={[0.5, 0.15]} />
          <meshBasicMaterial color="#FF0000" />
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.06}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            Vendu
          </Text>
        </mesh>
      )}
    </group>
  );
};

export default ArtworkFrames;
