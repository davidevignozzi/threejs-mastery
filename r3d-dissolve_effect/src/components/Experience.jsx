import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';

export const Experience = () => {
  return (
    <>
      <OrbitControls />

      {/* Cube */}
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Lights */}
      <Environment preset="sunset" />

      {/* Shadow */}
      <ContactShadows position-y={-1} />
    </>
  );
};
