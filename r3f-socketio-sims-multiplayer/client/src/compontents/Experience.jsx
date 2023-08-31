import { useEffect, useState } from 'react';
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
  const { vector3ToGrid, gridToVector3 } = useGrid();

  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [user] = useAtom(userAtom);

  /**
   * For build mode
   */
  const [buildMode, setBuildMode] = useState(true);
  // ⤵ will be the index of the item we are currently dragging
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragPosition, setDragPosition] = useState(null);
  const [items, setItems] = useState(map.items);
  const [canDrop, setCanDrop] = useState(false);

  /**
   * Overing floor => cursor pointer
   */
  const [onFloor, setOnFloor] = useState(false);
  useCursor(onFloor);

  const scene = useThree((state) => state.scene);

  /**
   * Not in build mode
   * *Character move
   *
   * In build Move
   * *Handle the item drag and drop
   *
   */
  const onPlaneCliccked = (e) => {
    if (!buildMode) {
      // character move
      const character = scene.getObjectByName(`character-${user}`);
      if (!character) {
        return;
      }

      socket.emit(
        'move',
        vector3ToGrid(character.position),
        vector3ToGrid(e.point)
      );
    } else {
      // handle item drag and drop
      if (draggedItem !== null) {
        if (canDrop) {
          setItems((prev) => {
            const newItems = [...prev];
            newItems[draggedItem].gridPosition = vector3ToGrid(e.point);
            return newItems;
          });
        }
        setDraggedItem(null);
      }
    }
  };

  /**
   * Check if an item is droppable in build mode
   */
  useEffect(() => {
    /**
     * If we are not dragging an item return
     */
    if (!draggedItem) {
      return;
    }
    const item = items[draggedItem];
    const width =
      item.rotation === 1 || item.rotation == 3
        ? item.size[1]
        : item.size[0];

    const height =
      item.rotation === 1 || item.rotation == 3
        ? item.size[0]
        : item.size[1];

    let droppable = true;

    /**
     * is item in bounds ?
     */
    // width
    if (
      dragPosition[0] < 0 ||
      dragPosition[0] + width > map.size[0] * map.gridDivision
    ) {
      droppable = false;
    }
    // height
    if (
      dragPosition[1] < 0 ||
      dragPosition[1] + height > map.size[1] * map.gridDivision
    ) {
      droppable = false;
    }

    /**
     * is item colliding other items ?
     */
    if (!item.walkable && !item.wall) {
      items.forEach((otherItem, idx) => {
        // ignore self
        if (idx === draggedItem) {
          return;
        }

        // ignore wall and floor
        if (otherItem.walkable || otherItem.wall) {
          return;
        }

        // item overlap
        const otherWidth =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[1]
            : otherItem.size[0];
        const otherHeight =
          otherItem.rotation === 1 || otherItem.rotation === 3
            ? otherItem.size[0]
            : otherItem.size[1];

        if (
          dragPosition[0] < otherItem.gridPosition[0] + otherWidth &&
          dragPosition[0] + width > otherItem.gridPosition[0] &&
          dragPosition[1] < otherItem.gridPosition[1] + otherHeight &&
          dragPosition[1] + height > otherItem.gridPosition[1]
        ) {
          droppable = false;
        }
      });
    }

    setCanDrop(droppable);
  }, [dragPosition, draggedItem, items]);

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
        onPointerEnter={() => setOnFloor(true)}
        onPointerLeave={() => setOnFloor(false)}
        onPointerMove={(e) => {
          if (!buildMode) {
            return;
          }
          const newPosition = vector3ToGrid(e.point);
          if (
            !dragPosition ||
            newPosition[0] !== dragPosition[0] ||
            newPosition[1] !== dragPosition[1]
          ) {
            setDragPosition(newPosition);
          }
        }}
        onClick={onPlaneCliccked}
      >
        <planeGeometry args={map.size} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* ITEMS */}
      {(buildMode ? items : map.items).map((item, idx) => {
        return (
          <Item
            key={`${item.name}-${idx}`}
            item={item}
            onClick={() =>
              setDraggedItem((prev) => (prev === null ? idx : prev))
            }
            isDragging={draggedItem === idx}
            dragPosition={dragPosition}
            canDrop={canDrop}
          />
        );
      })}

      {/* CHARACTERS */}
      {!buildMode &&
        characters.map((character) => {
          return (
            <AnimatedWoman
              key={character.id}
              id={character.id}
              // position={character.position}
              path={character.path}
              position={gridToVector3(character.position)}
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
