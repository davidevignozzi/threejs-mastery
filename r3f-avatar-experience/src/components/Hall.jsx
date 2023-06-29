import React from 'react';
import * as THREE from 'three';
import BooleanRoom from './rooms/BooleanRoom';
import StartRoom from './rooms/StartRoom';

const Hall = () => {
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#b69f80' });
  return (
    <group>
      <StartRoom groundMaterial={groundMaterial} />
      <BooleanRoom groundMaterial={groundMaterial} />
    </group>
  );
};

export default Hall;
