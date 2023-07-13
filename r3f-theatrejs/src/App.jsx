import { Canvas, useFrame } from '@react-three/fiber';
import { Experience } from './components/Experience';
// Theatre
import { getProject, val } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';

function App() {
  const sheet = getProject('Explore Theatre.js').sheet('Demo');

  return (
    <Canvas shadows>
      <color attach="background" args={['#ececec']} />

      <SheetProvider sheet={sheet}>
        <Experience />
      </SheetProvider>
    </Canvas>
  );
}

export default App;
