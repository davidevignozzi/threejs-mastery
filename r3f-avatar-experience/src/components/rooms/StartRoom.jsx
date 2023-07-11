import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const StartRoom = ({ hitSound }) => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('/models/rooms/startRoom.glb');
  const paintings = useGLTF('/models/paintings.glb');

  // Destructured
  const wall = nodes.Wall;
  const ground = nodes.Ground;
  const h2Mesh = nodes.h2;
  const h2_1Mesh = nodes.h2_1;

  /**
   * Materials
   */
  const wallMaterial = materials.wallMaterial;
  const groundMaterial = materials.groundMaterial;
  const h1Material = materials.h1Material;
  const h2Material = materials.h2Material;

  /**
   * To separate letters and wrap it into RigidBody
   */
  const letters = useLetters(nodes);

  /**
   * When user collide with letters play the hit sound
   */
  const collisionSound = () => {
    hitSound.currentTime = 0;
    hitSound.volume = Math.random();
    hitSound.play();
  };

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
      <group>
        {letters.map((letter, i) => {
          return (
            <RigidBody key={i} onCollisionEnter={collisionSound}>
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
      </group>

      {/* Creative Dev 3DText */}
      <group>
        {/* CREATIVE */}
        <RigidBody onCollisionEnter={collisionSound}>
          <mesh
            geometry={h2Mesh.geometry}
            position={h2Mesh.position}
            rotation={h2Mesh.rotation}
            scale={h2Mesh.scale}
            material={h2Material}
          />
        </RigidBody>

        {/* DEV */}
        <RigidBody onCollisionEnter={collisionSound}>
          <mesh
            geometry={h2_1Mesh.geometry}
            position={h2_1Mesh.position}
            rotation={h2_1Mesh.rotation}
            scale={h2_1Mesh.scale}
            material={h2Material}
          />
        </RigidBody>
      </group>

      {/* Paintings */}
      <primitive object={paintings.scene} />
    </group>
  );
};

export default StartRoom;

useGLTF.preload('./models/rooms/startRoom.glb');
useGLTF.preload('./models/paintings.glb');
