import { RigidBody } from '@react-three/rapier';
import Lights from './Lights';

const Room = ({ positionZ = 0, model, lightColor }) => {
  /**
   * Here I will push each letter in model
   */
  const letters = [];

  // Populate the array
  for (let key in model.nodes) {
    if (key.startsWith('text')) {
      let letter = model.nodes[key];
      letters.push(letter);
    }
  }

  console.log(letters);

  return (
    <>
      {/* Room */}
      <RigidBody
        type="fixed"
        position={[model.scene.position.x, model.scene.position.y, model.scene.position.z]}
      >
        <group>
          {/* 
            GROUND 
          */}
          <mesh
            castShadow
            receiveShadow
            geometry={model.nodes.ground.geometry}
            position={[
              model.nodes.ground.position.x,
              model.nodes.ground.position.y,
              model.nodes.ground.position.z
            ]}
            rotation={[Math.PI, 0, Math.PI]}
            material={model.materials.groundMaterial}
            scale={[3, 1, 4]}
          />

          {/* 
            WALL
          */}
          <mesh
            castShadow
            receiveShadow
            geometry={model.nodes.wall.geometry}
            position={[
              model.nodes.wall.position.x,
              model.nodes.wall.position.y,
              model.nodes.wall.position.z
            ]}
            rotation={[Math.PI, 0, Math.PI / 2]}
            material={model.nodes.wall.material}
            scale={[2.25, 1, 4]}
          />
        </group>
      </RigidBody>

      {letters.map((letter) => {
        return (
          <RigidBody rotation={[0, 0, 0]}>
            <mesh
              receiveShadow
              geometry={letter.geometry}
              position={[letter.position.x, letter.position.y, letter.position.z]}
              rotation={[letter.rotation.x, letter.rotation.y, letter.rotation.z]}
              material={model.materials.textmaterial}
            />
          </RigidBody>
        );
      })}

      <group>
        {/* 
          LOGO
        */}
        <mesh
          castShadow
          receiveShadow
          geometry={model.nodes.logo.geometry}
          material={model.materials.logo}
          position={[
            model.nodes.logo.position.x,
            model.nodes.logo.position.y,
            model.nodes.logo.position.z
          ]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.655}
        />

        {/* 
          TIMELINE
        */}
        <mesh
          castShadow
          receiveShadow
          geometry={model.nodes.timeline.geometry}
          material={model.materials.timeline}
          position={[
            model.nodes.timeline.position.x,
            model.nodes.timeline.position.y,
            model.nodes.timeline.position.z
          ]}
          rotation={[Math.PI / 2, 0, Math.PI / 2]}
          scale={0.305}
        />
      </group>
      {/* Light */}
      <Lights positionZ={positionZ} color={lightColor} />
    </>
  );
};

export default Room;
