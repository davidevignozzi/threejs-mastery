import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import {
  Environment,
  Grid,
  OrbitControls,
  useCursor
} from '@react-three/drei';
import { useAtom } from 'jotai';
import { useGrid } from '../hooks/useGrid';
import {
  charactersAtom,
  mapAtom,
  socket,
  userAtom
} from './SocketManager';
import {
  buildModeAtom,
  shopModeAtom,
  draggedItemAtom,
  draggedItemRotationAtom
} from './UI';
import Item from './Item';
import { AnimatedWoman } from './AnimatedWoman';
import Shop from './Shop';

const Experience = () => {
  const { vector3ToGrid, gridToVector3 } = useGrid();

  const [characters] = useAtom(charactersAtom);
  const [map] = useAtom(mapAtom);
  const [user] = useAtom(userAtom);

  /**
   * For build & shop mode
   */
  const [buildMode, setBuildMode] = useAtom(buildModeAtom);
  const [shopMode, setShopMode] = useAtom(shopModeAtom);
  // ⤵ will be the index of the item we are currently dragging
  const [draggedItem, setDraggedItem] = useAtom(draggedItemAtom);
  const [draggedItemRotation, setDraggedItemRotation] = useAtom(
    draggedItemRotationAtom
  );
  const [dragPosition, setDragPosition] = useState([0, 0]);
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
            delete newItems[draggedItem].tmp;
            newItems[draggedItem].gridPosition = vector3ToGrid(e.point);
            newItems[draggedItem].rotation = draggedItemRotation;
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
      draggedItemRotation === 1 || draggedItemRotation == 3
        ? item.size[1]
        : item.size[0];

    const height =
      draggedItemRotation === 1 || draggedItemRotation == 3
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
  }, [dragPosition, draggedItem, items, draggedItemRotation]);

  /**
   * Camera
   */
  const controls = useRef();
  const state = useThree((state) => state);

  /**
   * camera position in build mode
   */
  useEffect(() => {
    if (buildMode) {
      setItems(map?.items || []);
      state.camera.position.set(18, 9, 18);
      controls.current.target.set(5, 0, 5);
    } else {
      socket.emit('itemsUpdate', items);
    }
  }, [buildMode]);

  /**
   * camera position in shop mode
   */
  useEffect(() => {
    if (shopMode) {
      state.camera.position.set(0, 3, 8);
      controls.current.target.set(0, 0, 0);
    } else {
      state.camera.position.set(18, 9, 18);
      controls.current.target.set(5, 0, 5);
    }
  }, [shopMode]);

  const onItemSelected = (item) => {
    setShopMode(false);
    setItems((prev) => [
      ...prev,
      {
        ...item,
        gridPosition: [0, 0],
        tmp: true
      }
    ]);
    setDraggedItem(items.length);
    setDraggedItemRotation(0);
  };

  useEffect(() => {
    if (draggedItem === null) {
      setItems((prev) => prev.filter((item) => !item.tmp));
    }
  }, [draggedItem]);

  return (
    <>
      {/* LIGHTS */}
      <Environment preset="sunset" />
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[-4, 4, -4]}
        castShadow
        intensity={0.35}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera
          attach={'shadow-camera'}
          args={[-map.size[0], map.size[1], 10, -10]}
          far={map.size[0] + map.size[1]}
        />
      </directionalLight>

      {/* CAMERA */}
      <OrbitControls
        ref={controls}
        enableZoom={!shopMode}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
        screenSpacePanning={false}
      />

      {/* SHOP */}
      {shopMode && <Shop onItemSelected={onItemSelected} />}

      {/* FLOOR */}
      {!shopMode && (
        <mesh
          rotation-x={-Math.PI / 2}
          position-x={map.size[0] / 2}
          position-y={-0.001}
          position-z={map.size[1] / 2}
          receiveShadow
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
      )}

      {/* GRID */}
      {buildMode && !shopMode && (
        <Grid infiniteGrid fadeDistance={50} fadeStrength={5} />
      )}

      {/* ITEMS */}
      {!shopMode &&
        (buildMode ? items : map.items).map((item, idx) => {
          return (
            <Item
              key={`${item.name}-${idx}`}
              item={item}
              onClick={() => {
                if (buildMode) {
                  setDraggedItem((prev) => (prev === null ? idx : prev));
                  setDraggedItemRotation(item.rotation || 0);
                }
              }}
              isDragging={draggedItem === idx}
              dragPosition={dragPosition}
              dragRotation={draggedItemRotation}
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
