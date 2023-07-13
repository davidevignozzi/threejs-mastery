import { OrbitControls } from '@react-three/drei';

export const Experience = () => {
  return (
    <>
      {/* CAMERA */}
      <OrbitControls
        position={[40, 10, -40]}
        lookAt={[0, 0, 0]}
        enableDamping
        autoRotate
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
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <circleGeometry args={[30, 50]} />
        <meshPhongMaterial color={0xf0f0f0} />
      </mesh>

      {/* BOX */}
      <mesh castShadow>
        <boxGeometry args={[10, 10, 10]} />
        <meshPhongMaterial color={0x049ef4} />
      </mesh>
    </>
  );
};
