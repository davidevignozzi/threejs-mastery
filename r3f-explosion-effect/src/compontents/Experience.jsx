import { Environment, Float, OrbitControls } from '@react-three/drei';
import Heart from './Heart';

const Experience = () => {
  return (
    <>
      <OrbitControls enableZoom={false} />

      <Environment preset="sunset" background blur={0.4} />

      <Float floatIntensity={1} speed={2}>
        <Heart scale={0.25} />
      </Float>
    </>
  );
};

export default Experience;
