import React, { useRef } from 'react';
import * as THREE from 'three';
import { useHelper } from '@react-three/drei';

const Lights = ({ positionZ = 0, color }) => {
  const light = useRef();
  useHelper(light, THREE.DirectionalLightHelper, 'red');

  const targetLight = new THREE.Object3D();
  targetLight.position.x = 0;
  targetLight.position.y = 0.5;
  targetLight.position.z = positionZ * 8;

  return (
    <>
      <directionalLight
        ref={light}
        position={[-2.5, 2, 5 + positionZ * 8]}
        target={targetLight}
        intensity={1}
        castShadow
        color={color}
      />
    </>
  );
};

export default Lights;
