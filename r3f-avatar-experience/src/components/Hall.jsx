import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Lights from './Lights';

const groundMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

const Ground = ({ positionZ = 0, material = groundMaterial }) => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box args={[6, 0.5, 8]} position={[0, 0, positionZ * 8]} material={material} receiveShadow />
    </RigidBody>
  );
};

const Wall = ({ positionZ = 0, material = wallMaterial }) => {
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

const Room = ({
  positionZ = 0,
  roomGroundMaterial = groundMaterial,
  roomWallMaterial = wallMaterial
}) => {
  return (
    <>
      <Ground positionZ={positionZ} material={roomGroundMaterial} />
      <Wall positionZ={positionZ} material={roomWallMaterial} />
    </>
  );
};

const Hall = () => {
  const experiences = [
    { roomMaterial: new THREE.MeshStandardMaterial({ color: 'red' }) },
    { roomMaterial: new THREE.MeshStandardMaterial({ color: 'blue' }) }
  ];

  return (
    <>
      <Lights />
      {experiences.map((room, i) => {
        return (
          <Room
            key={i}
            positionZ={i}
            roomWallMaterial={room.roomMaterial}
            roomGroundMaterial={room.roomMaterial}
          />
        );
      })}
    </>
  );
};

export default Hall;
