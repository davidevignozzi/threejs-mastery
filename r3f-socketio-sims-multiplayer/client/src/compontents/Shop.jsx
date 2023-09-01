import { useMemo, useRef } from 'react';
import { useAtom } from 'jotai';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useScroll } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useGrid } from '../hooks/useGrid';
import { itemsAtom, mapAtom } from './SocketManager';

const ShopItem = ({ item, ...props }) => {
  const { name, size } = item;

  const { scene } = useGLTF(`models/items/${name}.glb`);

  // Skinned meshes cannot be re-used in threejs without cloning them
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const { gridToVector3 } = useGrid();

  return (
    <group {...props}>
      <group position={gridToVector3([0, 0], size[0], size[1])}>
        <primitive object={clone} />
      </group>
    </group>
  );
};

const Shop = ({ onItemSelected }) => {
  const [items] = useAtom(itemsAtom);
  const [map] = useAtom(mapAtom);

  const shopContainer = useRef();
  const maxX = useRef(0);

  /**
   * Items
   */
  const shopItems = useMemo(() => {
    let x = 0;

    return Object.values(items).map(
      (item, index) => {
        const xPosition = x;
        x += item.size[0] / map.gridDivision + 1;
        maxX.current = x;

        return (
          <ShopItem
            key={index}
            position-x={xPosition}
            item={item}
            onClick={() => {
              onItemSelected(item);
            }}
          />
        );
      },
      [items]
    );
  });

  /**
   * Scroll
   */
  const scrollData = useScroll();
  useFrame(() => {
    shopContainer.current.position.x = -scrollData.offset * maxX.current;
  });

  return <group ref={shopContainer}>{shopItems}</group>;
};

export default Shop;
