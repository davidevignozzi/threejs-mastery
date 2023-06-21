import React, { useEffect } from 'react';
import { Avatar } from './Avatar';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';

const AvatarController = () => {
  return (
    <group>
      <RigidBody colliders={false}>
        <CapsuleCollider args={[0.675, 0.3]} position={[0.05, 0.975, 0]} />
        <Avatar />
      </RigidBody>
    </group>
  );
};

export default AvatarController;
