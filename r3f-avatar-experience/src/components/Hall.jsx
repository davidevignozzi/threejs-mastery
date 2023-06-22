import React from 'react';
import * as THREE from 'three';
import { Box, Environment, Lightformer } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Lights from './Lights';

/**
 * Lights
 * 1. Environment
 * 2. Each Room will have a Light
 */

const Ground = ({ positionZ = 0, material }) => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box args={[6, 0.5, 8]} position={[0, 0, positionZ * 8]} material={material} receiveShadow />
    </RigidBody>
  );
};

const Wall = ({ positionZ = 0, material }) => {
  return (
    <RigidBody type="fixed">
      <Box
        args={[0.5, 4, 8]}
        position={[2.75, 2.25, positionZ * 8]}
        material={material}
        castShadow
      />
    </RigidBody>
  );
};

const Room = ({ positionZ = 0, roomGroundMaterial, roomWallMaterial, lightColor }) => {
  return (
    <>
      <Ground positionZ={positionZ} material={roomGroundMaterial} />
      <Wall positionZ={positionZ} material={roomWallMaterial} />

      {/* Light */}
      <Lights positionZ={positionZ} color={lightColor} />
    </>
  );
};

const Hall = () => {
  const experiences = [
    {
      roomWallMaterial: new THREE.MeshStandardMaterial({ color: 'red' }),
      roomGroundMaterial: new THREE.MeshStandardMaterial({ color: 'red' }),
      lightColor: 'blue'
    },
    {
      roomWallMaterial: new THREE.MeshStandardMaterial({ color: 'blue' }),
      roomGroundMaterial: new THREE.MeshStandardMaterial({ color: 'blue' }),
      lightColor: 'red'
    }
  ];

  return (
    <>
      {/* Light */}
      <Environment>
        <Lightformer
          position={[-3, 1, -1]}
          form="circle"
          scale={5}
          color="white"
          intensity={2}
          castShadow
        />
      </Environment>

      {experiences.map((room, i) => {
        return (
          <Room
            key={i}
            positionZ={i}
            roomWallMaterial={room.roomWallMaterial}
            roomGroundMaterial={room.roomGroundMaterial}
            lightColor={room.lightColor}
          />
        );
      })}
    </>
  );
};

export default Hall;
