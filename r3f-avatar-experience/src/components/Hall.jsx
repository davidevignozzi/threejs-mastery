import React from 'react';
import BooleanRoom from './rooms/BooleanRoom';
import StartRoom from './rooms/StartRoom';

const Hall = () => {
  return (
    <group>
      <StartRoom />
      <BooleanRoom />
    </group>
  );
};

export default Hall;
