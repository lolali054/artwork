import React from 'react';
import { useTexture } from '@react-three/drei';

const GalleryRoom: React.FC = () => {
  // Load textures
  const floorTexture = useTexture('/src/texture/wood_cabinet_worn_long_diff_4k.jpg');
  const wallTexture = useTexture('/src/texture/wall.jpg');
  
  // Room dimensions
  const roomWidth = 12;
  const roomLength = 12;
  const roomHeight = 4;
  
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial 
          map={floorTexture} 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, roomHeight, 0]} receiveShadow>
        <planeGeometry args={[roomWidth, roomLength]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Back Wall */}
      <mesh position={[0, roomHeight / 2, -roomLength / 2]} receiveShadow>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial 
          map={wallTexture}
          color="#f8f8f8"
        />
      </mesh>
      
      {/* Front Wall with opening */}
      <group position={[0, roomHeight / 2, roomLength / 2]}>
        {/* Left section */}
        <mesh position={[-roomWidth / 4 - 1, 0, 0]} receiveShadow>
          <planeGeometry args={[roomWidth / 2 - 1, roomHeight]} />
          <meshStandardMaterial 
            map={wallTexture}
            color="#f8f8f8"
          />
        </mesh>
        
        {/* Right section */}
        <mesh position={[roomWidth / 4 + 1, 0, 0]} receiveShadow>
          <planeGeometry args={[roomWidth / 2 - 1, roomHeight]} />
          <meshStandardMaterial 
            map={wallTexture}
            color="#f8f8f8"
          />
        </mesh>
        
        {/* Top section */}
        <mesh position={[0, roomHeight / 4 + 0.5, 0]} receiveShadow>
          <planeGeometry args={[2, roomHeight / 2 - 1]} />
          <meshStandardMaterial 
            map={wallTexture}
            color="#f8f8f8"
          />
        </mesh>
      </group>
      
      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-roomWidth / 2, roomHeight / 2, 0]} receiveShadow>
        <planeGeometry args={[roomLength, roomHeight]} />
        <meshStandardMaterial 
          map={wallTexture}
          color="#f8f8f8"
        />
      </mesh>
      
      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[roomWidth / 2, roomHeight / 2, 0]} receiveShadow>
        <planeGeometry args={[roomLength, roomHeight]} />
        <meshStandardMaterial 
          map={wallTexture}
          color="#f8f8f8"
        />
      </mesh>
      
      {/* Baseboard trim */}
      <BaseBoardTrim roomWidth={roomWidth} roomLength={roomLength} />
      
      {/* Ceiling trim */}
      <CeilingTrim roomWidth={roomWidth} roomLength={roomLength} roomHeight={roomHeight} />
    </group>
  );
};

// Baseboard trim component
const BaseBoardTrim: React.FC<{ roomWidth: number, roomLength: number }> = ({ roomWidth, roomLength }) => {
  return (
    <group>
      {/* Back wall trim */}
      <mesh position={[0, 0.1, -roomLength / 2 + 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[roomWidth, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Left wall trim */}
      <mesh position={[-roomWidth / 2 + 0.05, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[roomLength, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Right wall trim */}
      <mesh position={[roomWidth / 2 - 0.05, 0.1, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[roomLength, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Front wall trim - left section */}
      <mesh position={[-roomWidth / 4 - 1, 0.1, roomLength / 2 - 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[roomWidth / 2 - 1, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Front wall trim - right section */}
      <mesh position={[roomWidth / 4 + 1, 0.1, roomLength / 2 - 0.05]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[roomWidth / 2 - 1, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
    </group>
  );
};

// Ceiling trim component
const CeilingTrim: React.FC<{ roomWidth: number, roomLength: number, roomHeight: number }> = ({ roomWidth, roomLength, roomHeight }) => {
  return (
    <group>
      {/* Back wall trim */}
      <mesh position={[0, roomHeight - 0.1, -roomLength / 2 + 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[roomWidth, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Left wall trim */}
      <mesh position={[-roomWidth / 2 + 0.05, roomHeight - 0.1, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[roomLength, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Right wall trim */}
      <mesh position={[roomWidth / 2 - 0.05, roomHeight - 0.1, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <boxGeometry args={[roomLength, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Front wall trim - left section */}
      <mesh position={[-roomWidth / 4 - 1, roomHeight - 0.1, roomLength / 2 - 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[roomWidth / 2 - 1, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
      
      {/* Front wall trim - right section */}
      <mesh position={[roomWidth / 4 + 1, roomHeight - 0.1, roomLength / 2 - 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[roomWidth / 2 - 1, 0.1, 0.2]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
    </group>
  );
};

export default GalleryRoom;
