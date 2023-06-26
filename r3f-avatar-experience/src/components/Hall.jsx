import React from 'react';
import BooleanRoom from './rooms/BooleanRoom';
import FirstRoom from './rooms/FirstRoom';

const Hall = () => {
  return (
    <group>
      <FirstRoom />
      <BooleanRoom />
    </group>
  );
};

export default Hall;
