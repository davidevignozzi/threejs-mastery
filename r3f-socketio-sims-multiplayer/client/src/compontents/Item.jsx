import { useGLTF } from '@react-three/drei';

const Item = ({ name }) => {
  const { scene } = useGLTF(`models/items/${name}.glb`);
  return <primitive object={scene} />;
};

export default Item;
