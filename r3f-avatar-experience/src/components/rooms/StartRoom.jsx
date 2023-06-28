import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const StartRoom = () => {
  /**
   * Models
   */
  const startRoomModel = useGLTF('/models/rooms/startRoom.glb');

  // Destructured
  const startRoom = startRoomModel.nodes;
  const wall = startRoom.Wall;
  const ground = startRoom.Ground;
  const h2Mesh = startRoom.h2;
  const h2_1Mesh = startRoom.h2_1;

  /**
   * Materials
   */
  const materials = startRoomModel.materials;
  const wallMaterial = startRoomModel.materials.wallMaterial;
  const groundMaterial = startRoomModel.materials.groundMaterial;
  const h1Material = materials.h1Material;
  const h2Material = materials.textMaterial;

  /**
   * To separate letters and wrap it into RigidBody
   */
  const letters = useLetters(startRoom);

  return (
    <group>
      <RigidBody type="fixed" friction={1}>
        {/* WALL */}
        <mesh
          geometry={wall.geometry}
          position={wall.position}
          scale={wall.scale}
          rotation={wall.rotation}
          material={wallMaterial}
        />

        {/* GROUND */}
        <mesh
          geometry={ground.geometry}
          position={ground.position}
          scale={ground.scale}
          rotation={ground.rotation}
          material={groundMaterial}
        />
      </RigidBody>

      {/* Davide Vignozzi 3DText */}
      {letters.map((letter, i) => {
        return (
          <RigidBody key={i}>
            <mesh
              geometry={letter.geometry}
              position={letter.position}
              rotation={letter.rotation}
              scale={letter.scale}
              material={h1Material}
            />
          </RigidBody>
        );
      })}

      {/* Creative Dev 3DText */}
      {/* CREATIVE */}
      <RigidBody>
        <mesh
          geometry={h2Mesh.geometry}
          position={h2Mesh.position}
          rotation={h2Mesh.rotation}
          scale={h2Mesh.scale}
          material={h2Material}
        />
      </RigidBody>
      {/* DEV */}
      <RigidBody>
        <mesh
          geometry={h2_1Mesh.geometry}
          position={h2_1Mesh.position}
          rotation={h2_1Mesh.rotation}
          scale={h2_1Mesh.scale}
          material={h2Material}
        />
      </RigidBody>
    </group>
  );
};

export default StartRoom;
