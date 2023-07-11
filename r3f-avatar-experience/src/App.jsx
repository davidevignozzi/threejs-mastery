import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Suspense, useMemo } from 'react';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, Loader } from '@react-three/drei';
import { usePhases } from './stores/store';
import Start from './components/Start';

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
   * Handle Phase
   */
  const phase = usePhases((state) => state.phase);

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
    <>
      <KeyboardControls map={controlsMap}>
        <Canvas shadows camera={{ position: [-15, 7, -10], fov: 30 }}>
          <color attach="background" args={['#ececec']} />
          <Suspense fallback={null}>
            <Physics
            // debug
            >
              {phase === 'isStarted' ? <Experience /> : <Start />}
            </Physics>
          </Suspense>
        </Canvas>
        <Loader />
      </KeyboardControls>
    </>
  );
}

export default App;
