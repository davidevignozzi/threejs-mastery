import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import AvatarController from './AvatarController';
import Hall from './Hall';

export const Experience = () => {
  return (
    <>
      {/* <OrbitControls /> */}

      {/* Light */}
      <Environment>
        <Lightformer
          position={[-3, 1, -1]}
          form="circle"
          scale={5}
          // color="#e4d4ca"
          // color="#ffffff"
          color="#fdebdf"
          intensity={2}
          castShadow
        />
      </Environment>

      <group position-y={-1}>
        <Hall />

        <AvatarController />
      </group>
    </>
  );
};
