import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import Practise1ShaderMaterial from './practise1ShaderMaterial';

const ShadersPractise1 = () => {
  const planeRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    const geometry = planeRef?.current?.geometry;

    // ? -- Attributes are values that change between each vertex
    const attributes = geometry?.attributes;

    const count = attributes?.position?.count;
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      randoms[i] = Math.random();
    }

    geometry?.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1));
  }, []);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    /**
     * Update material
     */
    materialRef.current.uniforms.uTime.value = elapsedTime;
  });

  return (
    <group>
      <mesh ref={planeRef} scale-y={2 / 3}>
        <planeGeometry args={[1, 1, 64, 64]} />
        <practise1ShaderMaterial
          ref={materialRef}
          side={THREE.DoubleSide}
          transparet
          // wireframe
        />
      </mesh>
    </group>
  );
};

export default ShadersPractise1;
