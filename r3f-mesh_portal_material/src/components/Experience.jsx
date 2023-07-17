import * as THREE from 'three';
import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  useTexture
} from '@react-three/drei';
import { Fish } from './Fish';
import { Dragon_Evolved } from './Dragon_Evolved';
import { Cactoro } from './Cactoro';

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <MonsterStage texture={'textures/anime_water_world.jpg'}>
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/anime_erupting_volcano_world.jpg'}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
      >
        <Dragon_Evolved scale={0.5} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/anime_cactus_forest_world.jpg'}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
      >
        <Cactoro scale={0.45} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, ...props }) => {
  /**
   * Texture
   */
  const map = useTexture(texture);

  return (
    <group {...props}>
      <RoundedBox args={[2, 3, 0.1]}>
        <MeshPortalMaterial side={THREE.DoubleSide}>
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
