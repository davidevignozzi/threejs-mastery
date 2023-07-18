import * as THREE from 'three';
import Practise1ShaderMaterial from './practise1ShaderMaterial';

const ShadersPractise1 = () => {
  return (
    <group>
      <mesh>
        <planeGeometry args={[1, 1, 64, 64]} />
        <practise1ShaderMaterial
          side={THREE.DoubleSide}
          transparet
          // wireframe
        />
      </mesh>
    </group>
  );
};

export default ShadersPractise1;
