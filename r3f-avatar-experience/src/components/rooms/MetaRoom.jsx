import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const MetaRoom = ({ groundMaterial, hitSound }) => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('./models/rooms/metaRoom.glb');
  const reactLogo = useGLTF('./models/reactLogo.gltf');

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
  const wallMaterial = materials.MetaWall;
  const textMaterial = new THREE.MeshStandardMaterial({ color: '#0668E1' });

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

      {/* Meta 3D Text */}
      <group>
        {letters.map((letter, i) => {
          return (
            <RigidBody key={i} onCollisionEnter={collisionSound}>
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

      {/* React Logo */}
      <RigidBody
        position={[ground.position.x + 1, 1, ground.position.z + 1]}
        rotation-y={Math.PI * 0.25}
      >
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={reactLogo.nodes.Cube.geometry}
            material={textMaterial}
            position={[0, 1.311, 0]}
            rotation={[0, Math.PI / 2, 0]}
            scale={0.266}
          >
            <mesh
              castShadow
              receiveShadow
              geometry={reactLogo.nodes.Torus001.geometry}
              material={textMaterial}
              position={[0.336, -0.081, 0.024]}
              rotation={[-0.16, 0, -Math.PI / 2]}
              scale={[3.754, 1.468, 3.005]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={reactLogo.nodes.Torus002.geometry}
              material={textMaterial}
              position={[-0.515, -0.104, 0.165]}
              rotation={[-1.179, 0, -Math.PI / 2]}
              scale={[3.754, 1.468, 3.005]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={reactLogo.nodes.Torus003.geometry}
              material={textMaterial}
              position={[-0.035, -0.107, 0.004]}
              rotation={[0.89, 0, -Math.PI / 2]}
              scale={[3.754, 1.468, 3.005]}
            />
          </mesh>
        </group>
      </RigidBody>
    </group>
  );
};

export default MetaRoom;

useGLTF.preload('./models/rooms/metaRoom.glb');
useGLTF.preload('./models/reactLogo.gltf');
