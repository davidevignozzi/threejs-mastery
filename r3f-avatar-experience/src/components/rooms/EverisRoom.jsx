import React from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const EverisRoom = (props) => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('./models/rooms/everisRoom.glb');

  // Destructured
  const wall = nodes.wall;
  const ground = nodes.ground;

  /**
   * Materials
   */
  const groundMaterial = props.groundMaterial;

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
        {/* {letters.map((letter, i) => {
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
        })} */}
      </group>
    </group>
  );
};

export default EverisRoom;
