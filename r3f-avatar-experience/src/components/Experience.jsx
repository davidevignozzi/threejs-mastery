import { OrbitControls } from '@react-three/drei';
import AvatarController from './AvatarController';
import Hall from './Hall';

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      <Hall />

      <group position-y={0.5}>
        <AvatarController />
      </group>
    </>
  );
};
