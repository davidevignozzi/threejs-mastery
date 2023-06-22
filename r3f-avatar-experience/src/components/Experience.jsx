import { Environment, Lightformer, OrbitControls, useHelper } from '@react-three/drei';

import { Avatar } from './Avatar';
import AvatarController from './AvatarController';

import Ground from './Ground';
import { useRef } from 'react';
import { DirectionalLightHelper } from 'three';

export const Experience = () => {
  const dirLight = useRef();
  useHelper(dirLight, DirectionalLightHelper, 'red');
  return (
    <>
      <OrbitControls />

      <group position-y={0.5}>
        <AvatarController />
      </group>

      <Ground />

      {/* Lights */}
      {/* <ambientLight intensity={0.2} /> */}
      <Environment>
        <Lightformer position={[-3, 1, -1]} scale={5} color="white" intensity={2} form="circle" />
      </Environment>

      <directionalLight
        ref={dirLight}
        position={[-2.5, 2, 5]}
        intensity={1}
        castShadow
        color={'#e3b887'}
      />
    </>
  );
};
