import React from 'react';
import * as THREE from 'three';
import BooleanRoom from './rooms/BooleanRoom';
import StartRoom from './rooms/StartRoom';
import EverisRoom from './rooms/EverisRoom';

const Hall = () => {
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#b69f80' });
  return (
    <group>
      <StartRoom groundMaterial={groundMaterial} />
      <BooleanRoom groundMaterial={groundMaterial} />
      <EverisRoom groundMaterial={groundMaterial} />
    </group>
  );
};

export default Hall;
