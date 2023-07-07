import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const ThreeJsJourneyRoom = ({ groundMaterial }) => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('./models/rooms/threeJsJourneyRoom.glb');

  // Destructured
  const wall = nodes.Wall;
  const ground = nodes.Ground;

  /**
   * To separate letters and wrap it into RigidBody
   */
  const letters = useLetters(nodes);

  /**
   * Materials
   */
  const wallMaterial = materials.ThreeJsJourneyWall;
  const textMaterial = new THREE.MeshStandardMaterial({ color: '#6C64EB' });

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

      {/* THREEJS JOURNEY 3D Text */}
      <group>
        {letters.map((letter, i) => {
          return (
            <RigidBody key={i}>
              <mesh
                geometry={letter.geometry}
                position={letter.position}
                rotation={letter.rotation}
                scale={letter.scale}
                material={textMaterial}
              />
            </RigidBody>
          );
        })}
      </group>
    </group>
  );
};

export default ThreeJsJourneyRoom;
