import React from 'react';
import * as THREE from 'three';
import { Box } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import Lights from './Lights';

const groundMaterial = new THREE.MeshStandardMaterial({ color: 'white' });
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'slategrey' });

const Ground = () => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box args={[6, 0.5, 8]} position={[0, 0, 0]} material={groundMaterial} receiveShadow />
    </RigidBody>
  );
};

const Wall = () => {
  return (
    <RigidBody type="fixed">
      <Box args={[0.5, 4, 8]} position={[2.75, 2.25, 0]} material={wallMaterial} castShadow />
    </RigidBody>
  );
};

const Hall = () => {
  return (
    <>
      <Lights />
      <Ground />
      <Wall />
    </>
  );
};

export default Hall;
