import React from 'react';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import { Box, useGLTF } from '@react-three/drei';
import Lights from './Lights';

const Ground = ({ positionZ = 0, material }) => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box args={[6, 0.25, 8]} position={[0, 0, positionZ * 8]} material={material} receiveShadow />
    </RigidBody>
  );
};

const Wall = ({ positionZ = 0, material }) => {
  return (
    <RigidBody type="fixed">
      <Box
        args={[0.25, 4, 8]}
        position={[2.875, 2.125, positionZ * 8]}
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

export default Room;
