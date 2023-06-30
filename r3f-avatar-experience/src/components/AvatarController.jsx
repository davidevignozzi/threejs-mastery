import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { CapsuleCollider, RigidBody } from '@react-three/rapier';
import { Avatar } from './Avatar';
import { useAvatarStore } from '../stores/store';

/**
 * Force Power
 */
const MOVEMENT_SPEED = 0.1;
const MAX_VEL = 3;
const RUN_VEL = 0.8;

const AvatarController = () => {
  const rigidBody = useRef();
  const avatar = useRef();
  const isOnFloor = useRef(true);

  /**
   * State Management
   */
  const { avatarState, setAvatarState } = useAvatarStore((state) => ({
    avatar: state.avatarState,
    setAvatarState: state.setAvatarState
  }));

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
  useFrame((state) => {
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
    const linvel = rigidBody?.current?.linvel();

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
    rigidBody?.current?.applyImpulse(impulse, true);

    /**
     * Animation Handle
     */
    if (Math.abs(linvel.x) > RUN_VEL || Math.abs(linvel.z) > RUN_VEL) {
      if (avatarState !== 'Walk') {
        setAvatarState('Walk');
      }
    } else {
      if (avatarState !== 'Idle') {
        setAvatarState('Idle');
      }
    }

    /**
     * Calculate the current angle the avatar
     * is hading to and rotate accordingly
     *
     */
    if (changeRotation) {
      const angle = Math.atan2(linvel.x, linvel.z);
      avatar.current.rotation.y = angle;
    }

    /**
     * CAMERA FOLLOW
     */
    const avatarWorldPosition = avatar.current.getWorldPosition(new THREE.Vector3());
    const targetLookAt = new THREE.Vector3(avatarWorldPosition.x, 0.75, avatarWorldPosition.z);

    state.camera.position.x = avatarWorldPosition.x - 15;
    state.camera.position.z = avatarWorldPosition.z - 10;

    state.camera.lookAt(targetLookAt);
  });

  return (
    <group position-y={1}>
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
        <CapsuleCollider args={[0.675, 0.3]} position={[-2.05, 0.975, -2.75]} />
        <group position={[-2.05, 0, -2.75]} ref={avatar}>
          <Avatar />
        </group>
      </RigidBody>
    </group>
  );
};

export default AvatarController;
