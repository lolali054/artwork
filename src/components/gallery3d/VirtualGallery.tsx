import React, { Suspense, useState, useEffect, useRef, memo } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Text, useTexture } from '@react-three/drei';
import { Painting } from '@/lib/data';
import * as THREE from 'three';
import { ChevronLeft, ChevronRight, Info, X } from 'lucide-react';

interface VirtualGalleryProps {
  paintings: Painting[];
}

const VirtualGallery: React.FC<VirtualGalleryProps> = ({ paintings }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPainting, setSelectedPainting] = useState<Painting | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleGoToPreviousPainting = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + paintings.length) % paintings.length);
  };

  const handleGoToNextPainting = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % paintings.length);
  };

  const handlePaintingSelect = () => {
    setSelectedPainting(paintings[currentIndex]);
  };

  const handleCloseDetail = () => {
    setSelectedPainting(null);
  };

  return (
    <div className="w-full h-screen relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-t-gallery-500 border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-medium text-white">Chargement de la galerie...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Cadre d'information sur la gauche */}
          <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-black bg-opacity-80 p-6 flex flex-col justify-center z-10 border-r border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-6">{paintings[currentIndex].title}</h2>
            <p className="text-gray-200 leading-relaxed">{paintings[currentIndex].description}</p>
          </div>
          
          <Canvas shadows camera={{ position: [0, 2.3, 4], fov: 55 }}>
            <Suspense fallback={null}>
              <color attach="background" args={['#000000']} />
              <fog attach="fog" args={['#000000', 10, 20]} />
              <ambientLight intensity={0.6} />
              
              <GalleryScene 
                painting={paintings[currentIndex]} 
                onSelect={handlePaintingSelect} 
              />
              
              <OrbitControls 
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 2.3}
                maxPolarAngle={Math.PI / 1.9}
                minAzimuthAngle={-Math.PI / 10}
                maxAzimuthAngle={Math.PI / 10}
                target={[0, 2.2, -0.7]}
              />
            </Suspense>
          </Canvas>
          
          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-4 z-10 ml-[25%]">
            <button 
              onClick={handleGoToPreviousPainting}
              className="bg-white/20 hover:bg-white/40 p-3 rounded-full shadow-lg transition-colors"
              aria-label="Peinture précédente"
            >
              <ChevronLeft size={24} className="text-white" />
            </button>
            
            <div className="bg-white/20 px-4 py-2 rounded-full shadow-md flex items-center">
              <p className="text-sm font-medium text-white">
                {currentIndex + 1} / {paintings.length}
              </p>
            </div>
            
            <button 
              onClick={handleGoToNextPainting}
              className="bg-white/20 hover:bg-white/40 p-3 rounded-full shadow-lg transition-colors"
              aria-label="Peinture suivante"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
          
          {/* Painting Detail Overlay */}
          {selectedPainting && (
            <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-serif">{selectedPainting.title}</h2>
                      <p className="text-gray-600">{selectedPainting.artist}, {selectedPainting.year}</p>
                    </div>
                    <button 
                      onClick={handleCloseDetail}
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
                      aria-label="Fermer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img 
                        src={selectedPainting.imageUrl} 
                        alt={selectedPainting.title} 
                        className="w-full object-contain rounded-lg"
                      />
                    </div>
                    <div>
                      <div className="mb-4">
                        <h3 className="text-lg font-medium mb-2">Description</h3>
                        <p className="text-gray-700">{selectedPainting.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Dimensions</h3>
                          <p>{selectedPainting.dimensions}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Technique</h3>
                          <p>{selectedPainting.medium}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Prix</h3>
                          <p className="font-medium text-gallery-700">
                            {selectedPainting.sold 
                              ? 'Vendu' 
                              : `${selectedPainting.price.toLocaleString()} €`}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Disponibilité</h3>
                          <p>{selectedPainting.sold ? 'Non disponible' : 'Disponible'}</p>
                        </div>
                      </div>
                      
                      {!selectedPainting.sold && (
                        <button 
                          className="mt-6 w-full bg-gallery-500 hover:bg-gallery-600 text-white py-2 px-4 rounded-md font-medium transition-colors"
                        >
                          Ajouter à ma sélection
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Component for the 3D gallery scene with wall and painting
const GalleryScene: React.FC<{ 
  painting: Painting; 
  onSelect: () => void;
}> = ({ painting, onSelect }) => {
  // Load textures
  const wallTexture = useLoader(THREE.TextureLoader, '/src/texture/wall.jpg');
  const floorTexture = useLoader(THREE.TextureLoader, '/src/texture/wood_cabinet_worn_long_diff_4k.jpg');
  const ceilingTexture = useLoader(THREE.TextureLoader, '/src/texture/ceiling.jpg');
  
  // Apply texture settings
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 1);
  
  floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
  floorTexture.repeat.set(4, 4);
  
  ceilingTexture.wrapS = ceilingTexture.wrapT = THREE.RepeatWrapping;
  ceilingTexture.repeat.set(4, 4);
  
  return (
    <group>
      {/* Main wall with painting */}
      <Wall position={[0, 0, -1]} painting={painting} onSelect={onSelect} />
      
      {/* Side walls */}
      <mesh position={[-5, 2.25, -1]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      
      <mesh position={[5, 2.25, -1]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={floorTexture} />
      </mesh>
      
      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.5, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial map={ceilingTexture} color="#444444" />
      </mesh>
      
      {/* Spotlights */}
      <spotLight 
        position={[0, 3.8, 2]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={2.5} 
        castShadow 
        target-position={[0, 2.2, -1]}
      />
      
      <spotLight 
        position={[-3, 3.5, 0]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={1.2} 
        castShadow 
      />
      
      <spotLight 
        position={[3, 3.5, 0]} 
        angle={0.3} 
        penumbra={0.5} 
        intensity={1.2} 
        castShadow 
      />
      
      {/* Ajout de lumières directionnelles pour améliorer l'éclairage global */}
      <directionalLight 
        position={[0, 3, 5]} 
        intensity={0.8} 
        castShadow 
      />
      
      {/* Lumière spécifique pour le tableau */}
      <pointLight 
        position={[0, 2, 1]} 
        intensity={1.0} 
        distance={5} 
        decay={2}
      />
    </group>
  );
};

// Component for the wall with painting
const Wall = memo<{
  position: [number, number, number];
  painting: Painting; 
  onSelect: () => void;
}>(({ position, painting, onSelect }) => {
  const wallTexture = useLoader(THREE.TextureLoader, '/src/texture/wall.jpg');
  const artworkTexture = useLoader(THREE.TextureLoader, painting.imageUrl);
  const [hovered, setHovered] = useState(false);
  const frameRef = useRef<THREE.Group>(null);
  const wallRef = useRef<THREE.Mesh>(null);
  const { clock } = useThree();
  
  // Calculate aspect ratio for the frame
  const [aspectRatio, setAspectRatio] = useState(1.5);
  
  useEffect(() => {
    // Create a temporary image to get the aspect ratio
    const img = new Image();
    img.onload = () => {
      setAspectRatio(img.width / img.height);
    };
    img.src = painting.imageUrl;
    
    // Add hover animation to frame
    if (frameRef.current) {
      const initialY = frameRef.current.position.y;
      const initialRotation = frameRef.current.rotation.y;
      
      return () => {
        if (frameRef.current) {
          frameRef.current.position.y = initialY;
          frameRef.current.rotation.y = initialRotation;
        }
      };
    }
  }, [painting.imageUrl]);
  
  // Frame dimensions
  const frameWidth = 2.4;
  const frameHeight = frameWidth / aspectRatio;
  const frameDepth = 0.05;
  const frameBorderWidth = 0.05;
  
  // Apply texture settings
  wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(3, 2);
  
  // Animation
  useFrame(() => {
    if (frameRef.current) {
      // Subtle floating animation
      frameRef.current.position.y = 2 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02;
      
      // Subtle rotation when hovered
      if (hovered) {
        frameRef.current.rotation.y = THREE.MathUtils.lerp(
          frameRef.current.rotation.y,
          Math.sin(clock.getElapsedTime() * 2) * 0.03,
          0.1
        );
        
        // Highlight effect
        if (frameRef.current.children[0] instanceof THREE.Mesh) {
          const frameMesh = frameRef.current.children[0] as THREE.Mesh;
          const material = frameMesh.material as THREE.MeshStandardMaterial;
          material.emissive.set('#331800');
          material.emissiveIntensity = 0.2 + Math.sin(clock.getElapsedTime() * 3) * 0.1;
        }
      } else {
        frameRef.current.rotation.y = THREE.MathUtils.lerp(
          frameRef.current.rotation.y,
          0,
          0.1
        );
        
        // Reset highlight
        if (frameRef.current.children[0] instanceof THREE.Mesh) {
          const frameMesh = frameRef.current.children[0] as THREE.Mesh;
          const material = frameMesh.material as THREE.MeshStandardMaterial;
          material.emissive.set('#000000');
          material.emissiveIntensity = 0;
        }
      }
    }
    
    // Wall subtle movement
    if (wallRef.current) {
      wallRef.current.position.z = position[2] + Math.sin(clock.getElapsedTime() * 0.2) * 0.03;
    }
  });
  
  return (
    <group position={position}>
      {/* Wall */}
      <mesh ref={wallRef} position={[0, 2.25, 0]} receiveShadow>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial map={wallTexture} />
      </mesh>
      
      {/* Frame with painting */}
      <group 
        ref={frameRef}
        position={[0, 2.3, 0.1]} 
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onSelect}
      >
        {/* Lumière spécifique pour le tableau */}
        <pointLight
          position={[0, 0, 1]}
          intensity={1.5}
          distance={3}
          color="#ffffff"
        />
        
        {/* Painting - position ajustée */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[frameWidth, frameHeight]} />
          <meshStandardMaterial 
            map={artworkTexture} 
            emissive={hovered ? "#ffffff" : "#000000"}
            emissiveIntensity={hovered ? 0.2 : 0}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Cadre élégant avec plusieurs couches - créant un effet de profondeur */}
        {/* Couche extérieure dorée */}
        <mesh castShadow position={[0, 0, 0]}>
          <boxGeometry 
            args={[
              frameWidth + frameBorderWidth * 2.5, 
              frameHeight + frameBorderWidth * 2.5, 
              frameDepth
            ]} 
          />
          <meshStandardMaterial 
            color="#D4AF37"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        
        {/* Couche intermédiaire sombre - légèrement en relief */}
        <mesh castShadow position={[0, 0, 0.005]}>
          <boxGeometry 
            args={[
              frameWidth + frameBorderWidth * 1.8, 
              frameHeight + frameBorderWidth * 1.8, 
              frameDepth * 1.2
            ]} 
          />
          <meshStandardMaterial 
            color="#1A1A1A"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
        
        {/* Couche intérieure dorée avec détails - encore plus en relief */}
        <mesh castShadow position={[0, 0, 0.01]}>
          <boxGeometry 
            args={[
              frameWidth + frameBorderWidth * 1.2, 
              frameHeight + frameBorderWidth * 1.2, 
              frameDepth * 1.4
            ]} 
          />
          <meshStandardMaterial 
            color="#BF9B30"
            roughness={0.4}
            metalness={0.7}
            emissive="#3A2F0B"
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>
        
        {/* Bordure intérieure - pour créer l'effet d'encadrement */}
        <mesh castShadow position={[0, 0, 0.015]}>
          <boxGeometry 
            args={[
              frameWidth - frameBorderWidth * 0.1, 
              frameHeight - frameBorderWidth * 0.1, 
              frameDepth * 0.5
            ]} 
          />
          <meshStandardMaterial 
            color="#1A1A1A"
            roughness={0.8}
            metalness={0.2}
          />
        </mesh>
        
        {/* Hover instruction */}
        {hovered && (
          <group position={[0, frameHeight/2 + 0.2, 0.1]}>
            <mesh position={[0, 0, -0.01]}>
              <planeGeometry args={[1.5, 0.3]} />
              <meshBasicMaterial color="#ffffff" opacity={0.2} transparent />
            </mesh>
            <Text
              position={[0, 0, 0]}
              fontSize={0.1}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              Cliquez pour plus d'informations
            </Text>
          </group>
        )}
      </group>
    </group>
  );
});

export default VirtualGallery;
