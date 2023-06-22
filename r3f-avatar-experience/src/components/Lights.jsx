import React from 'react';
import { Environment, Lightformer } from '@react-three/drei';

const Lights = () => {
  return (
    <>
      <Environment>
        <Lightformer
          position={[-3, 1, -1]}
          form="circle"
          scale={5}
          color="white"
          intensity={2}
          castShadow
        />
      </Environment>

      <directionalLight position={[-2.5, 2, 5]} intensity={1} castShadow color={'#e3b887'} />
    </>
  );
};

export default Lights;
