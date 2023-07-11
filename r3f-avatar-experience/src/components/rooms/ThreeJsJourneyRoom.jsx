import * as THREE from 'three';
import { Box, useGLTF } from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import useLetters from '../../utils/useLetters';

const ThreeJsJourneyRoom = ({ groundMaterial, hitSound }) => {
  /**
   * Models
   */
  const { nodes, materials } = useGLTF('./models/rooms/threeJsJourneyRoom.glb');

  // Destructured
  const wall = nodes.Wall;
  const ground = nodes.Ground;
  const car = nodes.BrunoSimonCar;

  /**
   * To separate letters and wrap it into RigidBody
   */
  const letters = useLetters(nodes);

  /**
   * Materials
   */
  const wallMaterial = materials.ThreeJsJourneyWall;
  const textMaterial = new THREE.MeshStandardMaterial({ color: '#6C64EB' });

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

      {/* THREEJS JOURNEY 3D Text */}
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

      <RigidBody position-y={0.6} colliders={false}>
        {/* Bruno Simon Car */}
        {car.children.map((carMesh) => {
          return (
            <mesh
              key={carMesh.uuid}
              geometry={carMesh.geometry}
              position={[car.position.x, car.position.y - 0.5, car.position.z]}
              rotation={car.rotation}
              scale={car.scale}
              material={carMesh.material}
            />
          );
        })}
      </RigidBody>

      {/* Collider */}
      <CuboidCollider
        args={[0.6, 0.75, 1]}
        position={[car.position.x, car.position.y, car.position.z]}
        rotation={car.rotation}
      />
    </group>
  );
};

export default ThreeJsJourneyRoom;

useGLTF.preload('./models/rooms/threeJsJourneyRoom.glb');
