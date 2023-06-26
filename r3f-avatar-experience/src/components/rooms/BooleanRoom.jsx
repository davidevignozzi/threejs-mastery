import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const BooleanRoom = () => {
  const room = useGLTF('./models/rooms/booleanRoom.glb');
  const text = useGLTF('./models/rooms/booleanText.glb');
  const duck = useGLTF('./models/rooms/duck.glb');

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
        <primitive object={room.scene} />
      </RigidBody>

      {/* DUCK */}
      <RigidBody
        type="dynamic"
        friction={0}
        mass={0.0001}
        gravityScale={0.1}
        position={[
          duck.nodes.Duck.position.x,
          duck.nodes.Duck.position.y + 0.005,
          duck.nodes.Duck.position.z
        ]}
      >
        <mesh
          geometry={duck.nodes.Duck.geometry}
          scale={duck.nodes.Duck.scale}
          rotation={duck.nodes.Duck.rotation}
          material={duck.materials.rubber_duck_toy}
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
