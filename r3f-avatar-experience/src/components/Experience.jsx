import { OrbitControls } from '@react-three/drei';

import { Avatar } from './Avatar';
import AvatarController from './AvatarController';

import Ground from './Ground';

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      <group position-y={0.5}>
        <AvatarController />
      </group>

      <Ground />

      <ambientLight intensity={1} />
    </>
  );
};
