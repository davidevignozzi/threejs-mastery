import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const BooleanRoom = () => {
  /**
   * Models
   */
  const room = useGLTF('./models/rooms/booleanRoom.glb');
  const text = useGLTF('./models/rooms/booleanText.glb');
  const duckModel = useGLTF('./models/rooms/duck.glb');

  // Destructured
  const wall = room.nodes.booleanWall;
  const ground = room.nodes.ground;
  const duck = duckModel.nodes.duck;

  /**
   * Materials
   */
  const duckMaterial = duckModel.materials.duckMaterial;
  const wallMaterial = room.materials.booleanWall;
  const groundMaterial = room.materials.groundMaterial;

  /**
   * Here I will push each letter in model
   */
  const letters = [];

  // Populate the array
  for (let key in text.nodes) {
    if (key.startsWith('text')) {
      let letter = text.nodes[key];
      letters.push(letter);
    }
  }

  return (
    <>
      <RigidBody type="fixed" friction={1}>
        <mesh
          geometry={wall.geometry}
          position={wall.position}
          scale={wall.scale}
          rotation={wall.rotation}
          material={wallMaterial}
        />
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
        friction={0}
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
      {letters.map((letter, i) => {
        return (
          <RigidBody key={i} rotation={[0, 0, 0]}>
            <mesh
              receiveShadow
              geometry={letter.geometry}
              position={[letter.position.x, letter.position.y, letter.position.z]}
              rotation={[letter.rotation.x, letter.rotation.y, letter.rotation.z]}
              material={text.materials.textmaterial}
            />
          </RigidBody>
        );
      })}
    </>
  );
};

export default BooleanRoom;
