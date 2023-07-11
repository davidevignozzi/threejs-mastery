import { Environment, Lightformer, OrbitControls } from '@react-three/drei';
import AvatarController from './AvatarController';
import Hall from './Hall';
import { usePhases } from '../stores/store';

export const Experience = () => {
  const phase = usePhases((state) => state.phase);

  return (
    phase === 'isStarted' && (
      <>
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
    )
  );
};
