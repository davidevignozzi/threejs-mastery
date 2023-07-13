import { editable as e, PerspectiveCamera } from '@theatre/r3f';

export const Experience = () => {
  return (
    <>
      <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />
      <ambientLight />
      <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
      <e.mesh theatreKey="Cube">
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
    </>
  );
};
