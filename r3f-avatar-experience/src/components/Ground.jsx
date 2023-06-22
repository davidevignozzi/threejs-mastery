import { Box } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React from 'react';

const Ground = () => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box position={[0, 0, 0]} args={[10, 1, 10]} receiveShadow>
        <meshStandardMaterial color="white" />
      </Box>
    </RigidBody>
  );
};

export default Ground;
