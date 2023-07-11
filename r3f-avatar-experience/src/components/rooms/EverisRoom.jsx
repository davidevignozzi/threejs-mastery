import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const EverisRoom = ({ groundMaterial, hitSound }) => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('./models/rooms/everisRoom.glb');

  // Destructured
  const wall = nodes.Wall;
  const ground = nodes.Ground;
  const desk = nodes.Desk;

  /**
   * To separate letters and wrap it into RigidBody
   */
  const letters = useLetters(nodes);

  /**
   * Materials
   */
  const wallMaterial = materials.EverisWall;
  const textMaterial = new THREE.MeshStandardMaterial({ color: '#9EAC31' });

  /**
   * When user collide with letters play the hit sound
   */
  const collisionSound = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

  return (
    <group>
      {/* ROOM */}
      <RigidBody type="fixed" friction={1}>
        {/* WALL */}
        <mesh
          geometry={wall.geometry}
          position={wall.position}
          scale={wall.scale}
          rotation={wall.rotation}
          material={wallMaterial}
        />

        {/* GROUND */}
        <mesh
          geometry={ground.geometry}
          position={ground.position}
          scale={ground.scale}
          rotation={ground.rotation}
          material={groundMaterial}
        />
      </RigidBody>

      {/* Everis 3D Text */}
      <group>
        {letters.map((letter, i) => {
          return (
            <RigidBody key={i} onCollisionEnter={collisionSound}>
              <mesh
                geometry={letter.geometry}
                position={letter.position}
                rotation={letter.rotation}
                scale={letter.scale}
                material={textMaterial}
              />
            </RigidBody>
          );
        })}
      </group>

      <RigidBody type="fixed">
        <CuboidCollider
          args={[1.5, 0.7, 1]}
          position={[desk.position.x, desk.position.y - 0.5, desk.position.z + 0.3]}
        />
      </RigidBody>
      <primitive object={desk} />
    </group>
  );
};

export default EverisRoom;

useGLTF.preload('./models/rooms/everisRoom.glb');
