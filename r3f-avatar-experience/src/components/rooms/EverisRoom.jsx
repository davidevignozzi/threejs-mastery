import React from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const EverisRoom = (props) => {
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
  const groundMaterial = props.groundMaterial;
  const textMaterial = new THREE.MeshStandardMaterial({ color: '#9EAC31' });

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
            <RigidBody key={i}>
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

      <RigidBody>
        <CuboidCollider
          args={[1.5, 0.7, 1]}
          position={[desk.position.x, desk.position.y, desk.position.z + 0.3]}
        />
      </RigidBody>
      <primitive object={desk} />
    </group>
  );
};

export default EverisRoom;
