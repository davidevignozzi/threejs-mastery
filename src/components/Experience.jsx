import { OrbitControls } from '@react-three/drei';
import { editable as e } from '@theatre/r3f';

export const Experience = ({ sheet }) => {
  return (
    <>
      {/* CAMERA */}
      <OrbitControls
        lookAt={[0, 10, 0]}
        enableDamping
        // autoRotate
        dampingFactor={0.1}
        minDistance={2.4}
      />

      {/* LIGHTS */}
      <ambientLight color={0xfefefe} intensity={0.2} />
      <directionalLight
        castShadow
        intensity={1}
        position={[20, 30, 20]}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-top={40}
        shadow-camera-right={40}
        shadow-camera-bottom={-40}
        shadow-camera-left={-40}
      />

      {/* FLOOR */}
      <mesh position={[0, -150, 0]} receiveShadow>
        <cylinderGeometry args={[30, 30, 300, 30]} />
        <meshPhongMaterial color={0xf0f0f0} />
      </mesh>

      {/* BOX */}
      <e.mesh castShadow theatreKey="Box">
        <boxGeometry args={[10, 10, 10]} />
        <meshPhongMaterial color={0x049ef4} />
      </e.mesh>
    </>
  );
};
