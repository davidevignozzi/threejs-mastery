import * as THREE from 'three';
import {
  ContactShadows,
  Environment,
  OrbitControls,
  useCursor
} from '@react-three/drei';
import { useAtom } from 'jotai';
import { charactersAtom, mapAtom, socket } from './SocketManager';
import { AnimatedWoman } from './AnimatedWoman';
import { useState } from 'react';
import Item from './Item';

const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  console.log('🚀 ~ Experience ~ map:', map.items);

  /**
   * Overing floor => cursor pointer
   */
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <OrbitControls />

      {/* FLOOR */}
      <mesh
        rotation-x={-Math.PI / 2}
        position-x={map.size[0] / 2}
        position-y={-0.001}
        position-z={map.size[1] / 2}
        onClick={(e) => socket.emit('move', [e.point.x, 0, e.point.z])}
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
      >
        <planeGeometry args={map.size} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* ITEMS */}
      {map.items.map((item, i) => {
        return <Item key={`${item.name}-${i}`} item={item} />;
      })}

      {/* <Item name={'Chair'} />
      <Item name={'Couch Small'} />
      <Item name={'Shelf Tall'} />
      <Item name={'Table'} /> */}

      {/* CHARACTERS */}
      {characters.map((character) => {
        return (
          <AnimatedWoman
            key={character.id}
            id={character.id}
            // position={character.position}
            position={
              new THREE.Vector3(
                character.position[0] / map.gridDivision +
                  1 / map.gridDivision / 2,
                0,
                character.position[1] / map.gridDivision +
                  1 / map.gridDivision / 2
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
