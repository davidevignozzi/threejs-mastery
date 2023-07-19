import { Environment, OrbitControls } from '@react-three/drei';
import AnimationFactory from './AnimationFactory';

export const Experience = () => {
  return (
    <>
      <OrbitControls enabled={false} />
      <ambientLight intensity={1} />
      <Environment preset="sunset" />
      <AnimationFactory />
    </>
  );
};
