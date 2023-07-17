import * as THREE from 'three';
import { Environment, OrbitControls, useTexture } from '@react-three/drei';

export const Experience = () => {
  /**
   * Textures
   */
  const map = useTexture('textures/anime_water_world.jpg');

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />

      <mesh>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>
  );
};
