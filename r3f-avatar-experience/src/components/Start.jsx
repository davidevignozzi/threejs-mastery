import React from 'react';
import { usePhases } from '../stores/store';
import { Html } from '@react-three/drei';

const Start = () => {
  const state = usePhases((state) => state);
  const phase = usePhases((state) => state.phase);

  const handlePhase = () => {
    state.isStarted();
    console.log(phase);
  };

  return (
    phase === 'isReady' && (
      <Html fullscreen>
        <div className="start">
          <div className="container-start">
            <h1>Want to see my journey as creative front end developer</h1>
            <button className="button-start" onClick={handlePhase}>
              Start
            </button>
          </div>
        </div>
      </Html>
    )
  );
};

export default Start;
