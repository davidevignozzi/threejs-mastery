import { OrbitControls } from '@react-three/drei';

import { Avatar } from './Avatar';
import AvatarController from './AvatarController';

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      <group position-y={-1}>
        <AvatarController />
      </group>

      <ambientLight intensity={1} />
    </>
  );
};
