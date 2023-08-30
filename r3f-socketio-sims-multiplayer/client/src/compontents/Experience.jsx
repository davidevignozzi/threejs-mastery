import { useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useCursor } from '@react-three/drei';
import { useAtom } from 'jotai';
import { useGrid } from '../hooks/useGrid';
import {
  charactersAtom,
  mapAtom,
  socket,
  userAtom
} from './SocketManager';
import Item from './Item';
import { AnimatedWoman } from './AnimatedWoman';

const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [user] = useAtom(userAtom);

  const { vector3ToGrid } = useGrid();

  /**
   * Overing floor => cursor pointer
   */
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  const scene = useThree((state) => state.scene);

  /**
   * To move the character
   */
  const onCharacterMove = (e) => {
    const character = scene.getObjectByName(`character-${user}`);
    if (!character) {
      return;
    }

    socket.emit(
      'move',
      vector3ToGrid(character.position),
      vector3ToGrid(e.point)
    );
  };

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
        onClick={onCharacterMove}
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
