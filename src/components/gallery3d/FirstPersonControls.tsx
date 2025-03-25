import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PointerLockControls } from '@react-three/drei';

interface FirstPersonControlsProps {
  enabled: boolean;
}

const FirstPersonControls: React.FC<FirstPersonControlsProps> = ({ enabled }) => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const moveForward = useRef(false);
  const moveBackward = useRef(false);
  const moveLeft = useRef(false);
  const moveRight = useRef(false);
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  
  // Set up key controls
  useEffect(() => {
    if (!enabled) return;
    
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveForward.current = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveLeft.current = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveBackward.current = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveRight.current = true;
          break;
      }
    };
    
    const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
          moveForward.current = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          moveLeft.current = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          moveBackward.current = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          moveRight.current = false;
          break;
      }
    };
    
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    
    // Lock controls on click
    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('click', () => {
        if (controlsRef.current) {
          controlsRef.current.lock();
        }
      });
    }
    
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [enabled]);
  
  // Update movement on each frame
  useFrame(() => {
    if (!enabled || !controlsRef.current?.isLocked) return;
    
    // Slow down movement
    velocity.current.x -= velocity.current.x * 10.0 * 0.016;
    velocity.current.z -= velocity.current.z * 10.0 * 0.016;
    
    // Set direction based on key presses
    direction.current.z = Number(moveForward.current) - Number(moveBackward.current);
    direction.current.x = Number(moveRight.current) - Number(moveLeft.current);
    direction.current.normalize();
    
    // Update velocity based on direction
    const speed = 2.0;
    if (moveForward.current || moveBackward.current) {
      velocity.current.z -= direction.current.z * speed * 0.016;
    }
    if (moveLeft.current || moveRight.current) {
      velocity.current.x -= direction.current.x * speed * 0.016;
    }
    
    // Move the camera
    if (controlsRef.current) {
      controlsRef.current.moveRight(-velocity.current.x);
      controlsRef.current.moveForward(-velocity.current.z);
    }
    
    // Ensure camera stays at eye level
    camera.position.y = 1.6;
    
    // Prevent going through walls (simple boundary check)
    if (camera.position.x < -5.5) camera.position.x = -5.5;
    if (camera.position.x > 5.5) camera.position.x = 5.5;
    if (camera.position.z < -5.5) camera.position.z = -5.5;
    if (camera.position.z > 5.5) camera.position.z = 5.5;
  });
  
  return enabled ? <PointerLockControls ref={controlsRef} /> : null;
};

export default FirstPersonControls;
