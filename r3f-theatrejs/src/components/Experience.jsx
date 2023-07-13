import * as THREE from 'three';
import { editable as e, PerspectiveCamera } from '@theatre/r3f';

export const Experience = ({ sheet }) => {
  const cubePosition = new THREE.Vector3(0, 0, 0);

  return (
    <>
      {/* CAMERA */}
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[3, 3, -3]}
        fov={30}
        lookAt={cubePosition}
      />

      {/* LIGHTS */}
      <ambientLight />
      <e.pointLight theatreKey="Light" position={[10, 10, 10]} />

      {/* MESH */}
      <e.mesh theatreKey="Cube" position={cubePosition}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="orange" />
      </e.mesh>
    </>
  );
};
