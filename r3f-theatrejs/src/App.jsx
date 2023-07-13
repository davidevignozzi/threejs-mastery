import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
// Theatre
import { getProject } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';
import state from './state.json';

function App() {
  const sheet = getProject('Explore Theatre.js', { state: state }).sheet('Demo');

  //Animation;
  useEffect(() => {
    sheet.project.ready.then(() =>
      sheet.sequence.play({ iterationCount: Infinity, range: [0, 2] })
    );
  }, []);

  return (
    <Canvas shadows gl={{ preserveDrawingBuffer: true }}>
      <color attach="background" args={['#ececec']} />

      <SheetProvider sheet={sheet}>
        <Experience sheet={sheet} />
      </SheetProvider>
    </Canvas>
  );
}

export default App;
