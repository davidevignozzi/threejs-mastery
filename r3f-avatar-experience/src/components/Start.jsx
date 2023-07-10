import React from 'react';
import { usePhases } from '../stores/store';
import { Html } from '@react-three/drei';

const Start = () => {
  const state = usePhases((state) => state);

  return (
    <Html fullscreen>
      <div className="start">
        <div className="container-start">
          <h1>Want to see my journey as creative front end developer</h1>
          <button className="button-start" onClick={() => state.isStarted()}>
            Start
          </button>
        </div>
      </div>
    </Html>
  );
};

export default Start;
