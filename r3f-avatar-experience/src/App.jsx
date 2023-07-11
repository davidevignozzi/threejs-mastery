import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { KeyboardControls, Loader, useProgress } from '@react-three/drei';
import { usePhases } from './stores/store';
import Start from './components/Start';
import { Experience } from './components/Experience';

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
  const zustandState = usePhases((state) => state);
  const phase = usePhases((state) => state.phase);

  /**
   * Handle Loading
   */
  const { progress } = useProgress();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (progress === 100) {
      setIsLoaded(true);
    }
  }, [progress]);

  useEffect(() => {
    if (isLoaded) {
      zustandState.isReady();
    }
  }, [isLoaded]);

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
              {phase === 'isStarted' && <Experience />}
              {phase === 'isReady' && <Start />}
            </Physics>
          </Suspense>
        </Canvas>
        <Loader />
      </KeyboardControls>
    </>
  );
}

export default App;
