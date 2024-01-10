import { PCFSoftShadowMap } from 'three';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
// Theatre
import { getProject } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';
// JSON States
import boxState from './assets/states/boxState.json';
import { useEffect } from 'react';

function App() {
  const project = getProject('BouncingBox', { state: boxState });

  const sheet = project.sheet('AnimationScene');

  /**
   * Box Animations
   */
  useEffect(() => {
    sheet.project.ready.then(() =>
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] })
    );
  }, []);

  return (
    <Canvas
      shadows
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        shadowMap: { enabled: true, autoUpdate: true, type: PCFSoftShadowMap }
      }}
      camera={{ position: [-70, 20, 70] }}
    >
      <color attach="background" args={[0x292929]} />

      <SheetProvider sheet={sheet}>
        <Experience sheet={sheet} />
      </SheetProvider>
    </Canvas>
  );
}

export default App;
