import * as THREE from 'three';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { DissolveMaterial } from './DissolveMaterial';
import { useControls } from 'leva';
import { useState } from 'react';

const boxMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });
const sphereMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

export const Experience = () => {
  const { itemDisplayed } = useControls({
    itemDisplayed: {
      value: 'box',
      options: ['box', 'sphere']
    }
  });

  // Will impact the visibility of the mesh, the rendering of the mesh
  const [visibleItem, setVisibleItem] = useState(itemDisplayed);

  // Will impact the value of the progresion of the DissolveMaterial
  const onFadeOut = () => {
    setVisibleItem(itemDisplayed);
  };

  return (
    <>
      <OrbitControls />

      {
        /**
         * Box
         */
        visibleItem === 'box' && (
          <mesh>
            <boxGeometry />
            <DissolveMaterial
              baseMaterial={boxMaterial}
              visible={itemDisplayed === 'box'}
              onFadeOut={onFadeOut}
            />
          </mesh>
        )
      }

      {
        /**
         * Sphere
         */
        visibleItem === 'sphere' && (
          <mesh scale={0.5}>
            <sphereGeometry />
            <DissolveMaterial
              baseMaterial={sphereMaterial}
              visible={itemDisplayed === 'sphere'}
              onFadeOut={onFadeOut}
            />
          </mesh>
        )
      }

      {/* Lights */}
      <Environment preset="sunset" />

      {/* Shadow */}
      <ContactShadows position-y={-1} />
    </>
  );
};
