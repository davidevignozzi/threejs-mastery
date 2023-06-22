import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import AvatarController from './AvatarController';
import Hall from './Hall';

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      {/* Light */}
      <Environment>
        <Lightformer
          position={[-3, 1, -1]}
          form="circle"
          scale={5}
          color="#e4d4ca"
          intensity={2}
          castShadow
        />
      </Environment>

      <Hall />

      <group position-y={0.5}>
        <AvatarController />
      </group>
    </>
  );
};
