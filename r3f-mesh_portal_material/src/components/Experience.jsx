import * as THREE from 'three';
import {
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  RoundedBox,
  Text,
  useTexture
} from '@react-three/drei';
import { Fish } from './Fish';
import { Dragon_Evolved } from './Dragon_Evolved';
import { Cactoro } from './Cactoro';
import { useState } from 'react';

export const Experience = () => {
  const [active, setActive] = useState(null);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <MonsterStage
        texture={'textures/anime_water_world.jpg'}
        name={'Fish King'}
        color={'#38adcf'}
        active={active}
        setActive={setActive}
      >
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/anime_erupting_volcano_world.jpg'}
        name={'Dragon'}
        color={'#df8d52'}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
      >
        <Dragon_Evolved scale={0.5} position-y={-1} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/anime_cactus_forest_world.jpg'}
        name={'Cactoro'}
        color={'#32c944'}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
      >
        <Cactoro scale={0.45} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, name, color, active, setActive, ...props }) => {
  /**
   * Texture
   */
  const map = useTexture(texture);

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.4, 0.051]}
        anchorY={'bottom'}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox args={[2, 3, 0.1]} onDoubleClick={() => setActive(active === name ? null : name)}>
        <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0}>
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
