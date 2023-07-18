import { OrbitControls } from '@react-three/drei';
import ShadersPractise1 from './practise1/ShadersPractise1';

export const Experience = () => {
  return (
    <>
      <OrbitControls />
      <ambientLight intensity={1} />

      <ShadersPractise1 />
    </>
  );
};
