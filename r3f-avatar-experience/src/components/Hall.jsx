import { useState } from 'react';
import * as THREE from 'three';
import BooleanRoom from './rooms/BooleanRoom';
import StartRoom from './rooms/StartRoom';
import EverisRoom from './rooms/EverisRoom';
import ThreeJsJourneyRoom from './rooms/ThreeJsJourneyRoom';
import MetaRoom from './rooms/MetaRoom';

const Hall = () => {
  const groundMaterial = new THREE.MeshStandardMaterial({ color: '#b69f80' });
  const [hitSound] = useState(() => new Audio('./sound/hit.mp3'));

  return (
    <group>
      <StartRoom hitSound={hitSound} />
      <BooleanRoom hitSound={hitSound} groundMaterial={groundMaterial} />
      <EverisRoom hitSound={hitSound} groundMaterial={groundMaterial} />
      <ThreeJsJourneyRoom hitSound={hitSound} groundMaterial={groundMaterial} />
      <MetaRoom hitSound={hitSound} groundMaterial={groundMaterial} />
    </group>
  );
};

export default Hall;
