import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const BooleanRoom = () => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('./models/rooms/booleanRoom.glb');
  console.log('🚀 ~ BooleanRoom ~ materials:', materials);

  // Destructured
  const wall = nodes.booleanWall;
  const ground = nodes.ground;
  const duck = nodes.duck;

  /**
   * Materials
   */
  const wallMaterial = materials.booleanWall;
  const groundMaterial = materials.groundMaterial;
  const duckMaterial = materials.duckMaterial;
  const textMaterial = materials.textmaterial;

  /**
   * To separate letters and wrap it into RigidBody
   */
  const letters = useLetters(nodes);

  return (
    <group>
      {/* ROOM */}
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

      {/* DUCK */}
      <RigidBody
        type="dynamic"
        friction={0.5}
        mass={0.0001}
        gravityScale={0.1}
        position={[duck.position.x, duck.position.y + 0.005, duck.position.z]}
      >
        <mesh
          geometry={duck.geometry}
          scale={duck.scale}
          rotation={duck.rotation}
          material={duckMaterial}
        />
      </RigidBody>

      {/* Boolean 3D Text */}
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

export default BooleanRoom;
