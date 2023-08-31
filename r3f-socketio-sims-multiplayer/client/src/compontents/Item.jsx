import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { useAtom } from 'jotai';
import { SkeletonUtils } from 'three-stdlib';
import { mapAtom } from './SocketManager';
import { useGrid } from '../hooks/useGrid';

const Item = ({ item, onClick, isDragging, dragPosition, canDrop }) => {
  const { name, gridPosition, size, rotation } = item;

  const { gridToVector3 } = useGrid();

  const [map] = useAtom(mapAtom);

  const { scene } = useGLTF(`models/items/${name}.glb`);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const width = rotation === 1 || rotation === 3 ? size[1] : size[0];
  const height = rotation === 1 || rotation === 3 ? size[0] : size[1];

  return (
    <group
      position={gridToVector3(
        isDragging ? dragPosition || gridPosition : gridPosition,
        width,
        height
      )}
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
