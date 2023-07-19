import { OrbitControls } from '@react-three/drei';
import ShadersPractise from './ShadersPractise1';

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />

      <ShadersPractise />
    </>
  );
};
