import React from 'react';
import * as THREE from 'three';
import Room from './Room';
import { Text3D, useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const Hall = () => {
  /**
   * Models
   */
  const firstRoom = useGLTF('/models/RoomStart.glb');
  // const booleanRoom = useGLTF('/models/RoomBoolean.glb');
  const booleanRoom = useGLTF('/models/booleanRoom.glb');

  /**
   * Array of Experiences
   */
  const experiences = [
    // Boolean
    {
      position: 1,
      model: booleanRoom,
      lightColor: '#d990b8'
    }
  ];

  return (
    <>
      {/* First Cube => Start */}
      <RigidBody type="fixed" friction={1}>
        <primitive object={firstRoom.scene} />
      </RigidBody>

      {experiences.map((room) => {
        return (
          <Room
            key={room.position}
            positionZ={room.position}
            model={booleanRoom}
            lightColor={room.lightColor}
          />
        );
      })}
    </>
  );
};

export default Hall;
