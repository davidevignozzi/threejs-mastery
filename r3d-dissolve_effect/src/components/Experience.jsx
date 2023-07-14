import * as THREE from 'three';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { DissolveMaterial } from './DissolveMaterial';

const boxMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      {/* Cube */}
      <mesh>
        <boxGeometry />
        <DissolveMaterial baseMaterial={boxMaterial} />
      </mesh>

      {/* Lights */}
      <Environment preset="sunset" />

      {/* Shadow */}
      <ContactShadows position-y={-1} />
    </>
  );
};
