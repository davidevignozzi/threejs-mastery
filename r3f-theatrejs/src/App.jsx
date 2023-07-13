import { PCFSoftShadowMap } from 'three';
import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
// Theatre
import { getProject } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';

function App() {
  const project = getProject('BouncingBox');

  const sheet = project.sheet('AnimationScene');

  return (
    <Canvas
      shadows
      gl={{
        preserveDrawingBuffer: true,
        antialias: true,
        shadowMap: { enabled: true, autoUpdate: true, type: PCFSoftShadowMap }
      }}
      camera={{ position: [40, 10, 40] }}
    >
      <color attach="background" args={[0x292929]} />

      <SheetProvider sheet={sheet}>
        <Experience sheet={sheet} />
      </SheetProvider>
    </Canvas>
  );
}

export default App;
