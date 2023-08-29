import * as THREE from 'three';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor
} from '@react-three/drei';
import { useAtom } from 'jotai';
import { charactersAtom, socket } from './SocketManager';
import { AnimatedWoman } from './AnimatedWoman';
import { useState } from 'react';
import Item from './Item';

const Experience = () => {
  const [characters] = useAtom(charactersAtom);

  /**
   * Overing floor => cursor pointer
   */
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />
      <OrbitControls />

      {/* FLOOR */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-y={-0.001}
        onClick={(e) => socket.emit('move', [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* ITEMS */}
      <Item name={'Chair'} />
      <Item name={'Couch Small'} />
      <Item name={'Shelf Tall'} />
      <Item name={'Table'} />

      {/* CHARACTERS */}
      {characters.map((character) => {
        return (
          <AnimatedWoman
            key={character.id}
            // position={character.position}
            position={
              new THREE.Vector3(
                character.position[0],
                character.position[1], // always 0
                character.position[2]
              )
            }
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.bottomColor}
          />
        );
      })}
    </>
  );
};

export default Experience;
