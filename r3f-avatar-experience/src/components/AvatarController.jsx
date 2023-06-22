import React, { useEffect, useRef } from 'react';
import { Avatar } from './Avatar';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

/**
 * Force Power
 */
const MOVEMENT_SPEED = 0.1;
const MAX_VEL = 3;

const AvatarController = () => {
  const rigidBody = useRef();
  const avatar = useRef();
  const isOnFloor = useRef(true);

  /**
   * Keyboard Controls
   */
  const forwardPressed = useKeyboardControls((state) => state.forward);
  const leftPressed = useKeyboardControls((state) => state.left);
  const backPressed = useKeyboardControls((state) => state.back);
  const rightPressed = useKeyboardControls((state) => state.right);

  /**
   * Apply Forces
   */
  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 };

    /**
     * Linear velocity
     *
     * if the user press a key for too long
     * will encrease the speed too much. So I
     * resolved this issure giving to the rigid
     * body a linear velocity that will be
     * controlled when the user press a key.
     *
     */
    const linvel = rigidBody.current.linvel();

    /**
     * When it's true will calculate the
     * angle the avatar is hading to
     *
     */
    let changeRotation = false;

    /**
     * W ⬆
     */
    if (forwardPressed && linvel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      changeRotation = true;
    }

    /**
     * A ⬅
     */
    if (leftPressed && linvel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      changeRotation = true;
    }

    /**
     * S ⬇
     */
    if (backPressed && linvel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    /**
     * D ➡
     */
    if (rightPressed && linvel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      changeRotation = true;
    }

    /**
     * Apply Impulse
     */
    rigidBody.current.applyImpulse(impulse, true);

    /**
     * Calculate the current angle the avatar
     * is hading to and rotate accordingly
     *
     */
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      avatar.current.rotation.y = angle;
    }
  });

  return (
    <group>
      <RigidBody
        ref={rigidBody}
        colliders={false}
        enabledRotations={[false, false, false]}
        onCollisionEnter={() => {
          isOnFloor.current = true;
        }}
        onCollisionExit={() => {
          isOnFloor.current = false;
        }}
      >
        <CapsuleCollider args={[0.675, 0.3]} position={[0.05, 0.975, 0]} />
        <group ref={avatar}>
          <Avatar />
        </group>
      </RigidBody>
    </group>
  );
};

export default AvatarController;
