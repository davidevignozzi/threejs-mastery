import { useEffect, useMemo, useState } from 'react';
import { useCursor, useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import { SkeletonUtils } from 'three-stdlib';
import { mapAtom } from './SocketManager';
import { useGrid } from '../hooks/useGrid';
import { buildModeAtom } from './UI';

const Item = ({
  item,
  onClick,
  isDragging,
  dragPosition,
  dragRotation,
  canDrop
}) => {
  const { name, gridPosition, size, rotation: itemRotation } = item;

  const { gridToVector3 } = useGrid();

  const [map] = useAtom(mapAtom);
  const [buildMode] = useAtom(buildModeAtom);

  // For cursor
  const [hover, setHover] = useState(false);

  const { scene } = useGLTF(`models/items/${name}.glb`);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  // Rotation
  const rotation = isDragging ? dragRotation : itemRotation;

  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];

  /**
   * cursor logic
   */
  useCursor(buildMode ? hover : undefined);

  /**
   * Shadows
   */
  useEffect(() => {
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  return (
    <group
      position={gridToVector3(
        isDragging ? dragPosition || gridPosition : gridPosition,
        width,
        height
      )}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={onClick}
    >
      <primitive
        object={clone}
        rotation-y={((rotation || 0) * Math.PI) / 2}
      />

      {isDragging && (
        <mesh>
          <boxGeometry
            args={[
              width / map.gridDivision,
              0.2,
              height / map.gridDivision
            ]}
          />
          <meshBasicMaterial
            color={canDrop ? 'green' : 'red'}
            opacity={0.3}
            transparent
          />
        </mesh>
      )}
    </group>
  );
};

export default Item;
