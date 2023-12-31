/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function AnimationFactory(props) {
  const group = useRef();
  const runnerRef = useRef();
  const { nodes, animations } = useGLTF('/FactoryAnimation.glb');
  const { actions } = useAnimations(animations, group);
  console.log('🚀 ~ AnimationFactory ~ actions:', actions);

  useEffect(() => {
    actions.CubeAction.play();
    // actions.RunnerAnimation.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Plane" />
        <mesh
          ref={runnerRef}
          name="runner"
          castShadow
          receiveShadow
          geometry={nodes.runner.geometry}
          material={nodes.runner.material}
          scale={[0.314, 0.59, 0.515]}
        />
        <mesh
          name="runnerIntern"
          castShadow
          receiveShadow
          geometry={nodes.runnerIntern.geometry}
          material={nodes.runnerIntern.material}
        />
        <mesh
          name="runnerCreatingBox"
          castShadow
          receiveShadow
          geometry={nodes.runnerCreatingBox.geometry}
          material={nodes.runnerCreatingBox.material}
          position={[-3.383, 0, 0]}
        />
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[-4.598, 1.581, 0]}
        />
        <mesh
          name="ground"
          castShadow
          receiveShadow
          geometry={nodes.ground.geometry}
          material={nodes.ground.material}
          position={[0, -0.079, 0]}
        />
      </group>
    </group>
  );
}

useGLTF.preload('/FactoryAnimation.glb');
