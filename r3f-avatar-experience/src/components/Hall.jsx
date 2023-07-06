import React from 'react';
import * as THREE from 'three';
import BooleanRoom from './rooms/BooleanRoom';
import StartRoom from './rooms/StartRoom';
import EverisRoom from './rooms/EverisRoom';
import ThreeJsJourneyRoom from './rooms/ThreeJsJourneyRoom';

const Hall = () => {
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#b69f80' });
  return (
    <group>
      <StartRoom />
      <BooleanRoom groundMaterial={groundMaterial} />
      <EverisRoom groundMaterial={groundMaterial} />
      <ThreeJsJourneyRoom groundMaterial={groundMaterial} />
    </group>
  );
};

export default Hall;
