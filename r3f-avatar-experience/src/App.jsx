import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Suspense, useMemo } from 'react';
import { Physics } from '@react-three/rapier';
import { KeyboardControls } from '@react-three/drei';

/**
 * Keyboard Controls
 */
export const Controls = {
  forward: 'forward',
  left: 'left',
  back: 'back',
  right: 'right'
};

function App() {
  /**
   * Keyboard Controls Map
   */
  const controlsMap = useMemo(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] }
    ],
    []
  );

  return (
    <KeyboardControls map={controlsMap}>
      <Canvas shadows camera={{ position: [-10, 7, -15], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
