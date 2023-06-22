import { Box } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React from 'react';

const Ground = () => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box position={[0, 0, 0]} args={[8, 0.5, 8]} receiveShadow>
        <meshStandardMaterial color="white" />
      </Box>
    </RigidBody>
  );
};

export default Ground;
