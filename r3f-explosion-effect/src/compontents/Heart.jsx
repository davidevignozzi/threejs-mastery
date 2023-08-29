/**
 * Auto-generated by: https://github.com/pmndrs/gltfjsx
 * Heart by Quaternius (https://poly.pizza/m/1yCRUwFnwX)
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGLTF, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useExplode } from '../hooks/useExplode';

const Heart = (props) => {
  const { nodes, materials } = useGLTF('/models/heart.glb');
  const group = useRef();

  useExplode(group, { distance: 3, enableRotation: false });

  return (
    <group {...props} ref={group}>
      <mesh
        name="Heart_Full_cell"
        geometry={nodes.Heart_Full_cell.geometry}
        material={materials.Red}
        position={[0.711, 0.816, -0.801]}
      />
      <mesh
        name="Heart_Full_cell001"
        geometry={nodes.Heart_Full_cell001.geometry}
        material={materials.Red}
        position={[0.004, -0.676, 0.948]}
      />
      <mesh
        name="Heart_Full_cell002"
        geometry={nodes.Heart_Full_cell002.geometry}
        material={materials.Red}
        position={[-0.789, 1.086, 0.537]}
      />
      <mesh
        name="Heart_Full_cell003"
        geometry={nodes.Heart_Full_cell003.geometry}
        material={materials.Red}
        position={[-1.642, -0.337, 0.469]}
      />
      <mesh
        name="Heart_Full_cell004"
        geometry={nodes.Heart_Full_cell004.geometry}
        material={materials.Red}
        position={[-1.324, 0.783, 0.844]}
      />
      <mesh
        name="Heart_Full_cell005"
        geometry={nodes.Heart_Full_cell005.geometry}
        material={materials.Red}
        position={[-1.346, 0.829, -0.96]}
      />
      <mesh
        name="Heart_Full_cell006"
        geometry={nodes.Heart_Full_cell006.geometry}
        material={materials.Red}
        position={[1.695, -0.318, 0.508]}
      />
      <mesh
        name="Heart_Full_cell007"
        geometry={nodes.Heart_Full_cell007.geometry}
        material={materials.Red}
        position={[0.983, 0.191, 0.703]}
      />
      <mesh
        name="Heart_Full_cell008"
        geometry={nodes.Heart_Full_cell008.geometry}
        material={materials.Red}
        position={[-1.932, 0.132, 0.285]}
      />
      <mesh
        name="Heart_Full_cell009"
        geometry={nodes.Heart_Full_cell009.geometry}
        material={materials.Red}
        position={[0.015, -1.085, -0.448]}
      />
      <mesh
        name="Heart_Full_cell010"
        geometry={nodes.Heart_Full_cell010.geometry}
        material={materials.Red}
        position={[0.202, -1.868, 0.551]}
      />
      <mesh
        name="Heart_Full_cell011"
        geometry={nodes.Heart_Full_cell011.geometry}
        material={materials.Red}
        position={[-0.92, -1.054, 0.456]}
      />
      <mesh
        name="Heart_Full_cell012"
        geometry={nodes.Heart_Full_cell012.geometry}
        material={materials.Red}
        position={[-0.917, -0.395, 0.843]}
      />
      <mesh
        name="Heart_Full_cell013"
        geometry={nodes.Heart_Full_cell013.geometry}
        material={materials.Red}
        position={[0.594, -1.294, 0.817]}
      />
      <mesh
        name="Heart_Full_cell014"
        geometry={nodes.Heart_Full_cell014.geometry}
        material={materials.Red}
        position={[1.621, 0.96, 0.529]}
      />
      <mesh
        name="Heart_Full_cell015"
        geometry={nodes.Heart_Full_cell015.geometry}
        material={materials.Red}
        position={[1.103, -0.405, 0.843]}
      />
      <mesh
        name="Heart_Full_cell016"
        geometry={nodes.Heart_Full_cell016.geometry}
        material={materials.Red}
        position={[1.089, -0.972, -0.613]}
      />
      <mesh
        name="Heart_Full_cell017"
        geometry={nodes.Heart_Full_cell017.geometry}
        material={materials.Red}
        position={[-1.547, 1.169, -0.385]}
      />
      <mesh
        name="Heart_Full_cell018"
        geometry={nodes.Heart_Full_cell018.geometry}
        material={materials.Red}
        position={[1.62, 0.217, -0.832]}
      />
      <mesh
        name="Heart_Full_cell019"
        geometry={nodes.Heart_Full_cell019.geometry}
        material={materials.Red}
        position={[-0.17, -1.714, -0.404]}
      />
      <mesh
        name="Heart_Full_cell020"
        geometry={nodes.Heart_Full_cell020.geometry}
        material={materials.Red}
        position={[0.851, 0.759, 0.691]}
      />
      <mesh
        name="Heart_Full_cell021"
        geometry={nodes.Heart_Full_cell021.geometry}
        material={materials.Red}
        position={[-0.355, -1.617, 0.245]}
      />
      <mesh
        name="Heart_Full_cell022"
        geometry={nodes.Heart_Full_cell022.geometry}
        material={materials.Red}
        position={[1.577, -0.278, -0.45]}
      />
      <mesh
        name="Heart_Full_cell023"
        geometry={nodes.Heart_Full_cell023.geometry}
        material={materials.Red}
        position={[-0.72, 0.63, -0.809]}
      />
      <mesh
        name="Heart_Full_cell024"
        geometry={nodes.Heart_Full_cell024.geometry}
        material={materials.Red}
        position={[0.704, 1.092, 0.006]}
      />
      <mesh
        name="Heart_Full_cell025"
        geometry={nodes.Heart_Full_cell025.geometry}
        material={materials.Red}
        position={[0.464, -0.575, 0.879]}
      />
      <mesh
        name="Heart_Full_cell026"
        geometry={nodes.Heart_Full_cell026.geometry}
        material={materials.Red}
        position={[-0.005, 0.181, -0.857]}
      />
      <mesh
        name="Heart_Full_cell027"
        geometry={nodes.Heart_Full_cell027.geometry}
        material={materials.Red}
        position={[0.066, 0.054, 0.663]}
      />
      <mesh
        name="Heart_Full_cell028"
        geometry={nodes.Heart_Full_cell028.geometry}
        material={materials.Red}
        position={[1.435, -0.628, -0.042]}
      />
      <mesh
        name="Heart_Full_cell029"
        geometry={nodes.Heart_Full_cell029.geometry}
        material={materials.Red}
        position={[1.762, 1.01, -0.011]}
      />
      <mesh
        name="Heart_Full_cell030"
        geometry={nodes.Heart_Full_cell030.geometry}
        material={materials.Red}
        position={[-0.059, 0.586, 0.324]}
      />
      <mesh
        name="Heart_Full_cell031"
        geometry={nodes.Heart_Full_cell031.geometry}
        material={materials.Red}
        position={[0.736, -0.288, -0.502]}
      />
      <mesh
        name="Heart_Full_cell032"
        geometry={nodes.Heart_Full_cell032.geometry}
        material={materials.Red}
        position={[-1.911, 0.246, -0.452]}
      />
      <mesh
        name="Heart_Full_cell033"
        geometry={nodes.Heart_Full_cell033.geometry}
        material={materials.Red}
        position={[-1.548, 1.17, 0.335]}
      />
      <mesh
        name="Heart_Full_cell034"
        geometry={nodes.Heart_Full_cell034.geometry}
        material={materials.Red}
        position={[-0.014, 0.79, -0.523]}
      />
      <mesh
        name="Heart_Full_cell035"
        geometry={nodes.Heart_Full_cell035.geometry}
        material={materials.Red}
        position={[1.785, 0.913, -0.589]}
      />
      <mesh
        name="Heart_Full_cell036"
        geometry={nodes.Heart_Full_cell036.geometry}
        material={materials.Red}
        position={[1.586, 0.248, 0.759]}
      />
      <mesh
        name="Heart_Full_cell037"
        geometry={nodes.Heart_Full_cell037.geometry}
        material={materials.Red}
        position={[2.076, 0.225, -0.366]}
      />
      <mesh
        name="Heart_Full_cell038"
        geometry={nodes.Heart_Full_cell038.geometry}
        material={materials.Red}
        position={[1.288, 0.948, -0.77]}
      />
      <mesh
        name="Heart_Full_cell039"
        geometry={nodes.Heart_Full_cell039.geometry}
        material={materials.Red}
        position={[-0.039, -0.523, -0.467]}
      />
      <mesh
        name="Heart_Full_cell040"
        geometry={nodes.Heart_Full_cell040.geometry}
        material={materials.Red}
        position={[-0.759, -0.251, -0.506]}
      />
      <mesh
        name="Heart_Full_cell041"
        geometry={nodes.Heart_Full_cell041.geometry}
        material={materials.Red}
        position={[-1.684, -0.229, -0.404]}
      />
      <mesh
        name="Heart_Full_cell042"
        geometry={nodes.Heart_Full_cell042.geometry}
        material={materials.Red}
        position={[-0.488, 0.891, -0.046]}
      />
      <mesh
        name="Heart_Full_cell043"
        geometry={nodes.Heart_Full_cell043.geometry}
        material={materials.Red}
        position={[1.074, -0.845, 0.567]}
      />
      <mesh
        name="Heart_Full_cell044"
        geometry={nodes.Heart_Full_cell044.geometry}
        material={materials.Red}
        position={[0.596, -1.27, 0.121]}
      />
      <mesh
        name="Heart_Full_cell045"
        geometry={nodes.Heart_Full_cell045.geometry}
        material={materials.Red}
        position={[-1.053, -1.103, -0.408]}
      />
      <mesh
        name="Heart_Full_cell046"
        geometry={nodes.Heart_Full_cell046.geometry}
        material={materials.Red}
        position={[0.424, -1.675, -0.338]}
      />
      <mesh
        name="Heart_Full_cell047"
        geometry={nodes.Heart_Full_cell047.geometry}
        material={materials.Red}
        position={[-1.826, 0.545, -0.689]}
      />
      <mesh
        name="Heart_Full_cell048"
        geometry={nodes.Heart_Full_cell048.geometry}
        material={materials.Red}
        position={[-1.801, 0.494, 0.627]}
      />
      <mesh
        name="Heart_Full_cell049"
        geometry={nodes.Heart_Full_cell049.geometry}
        material={materials.Red}
        position={[-0.809, 1.139, -0.646]}
      />
      <mesh
        name="Heart_Full_cell050"
        geometry={nodes.Heart_Full_cell050.geometry}
        material={materials.Red}
        position={[-0.73, 0.628, 0.645]}
      />
      <mesh
        name="Heart_Full_cell051"
        geometry={nodes.Heart_Full_cell051.geometry}
        material={materials.Red}
        position={[-0.169, -1.258, 0.884]}
      />
      <mesh
        name="Heart_Full_cell052"
        geometry={nodes.Heart_Full_cell052.geometry}
        material={materials.Red}
        position={[-0.386, -0.545, 0.915]}
      />
      <mesh
        name="Heart_Full_cell053"
        geometry={nodes.Heart_Full_cell053.geometry}
        material={materials.Red}
        position={[-1.064, 0.137, 0.726]}
      />
      <mesh
        name="Heart_Full_cell054"
        geometry={nodes.Heart_Full_cell054.geometry}
        material={materials.Red}
        position={[-1.115, 0.193, -0.943]}
      />
      <mesh
        name="Heart_Full_cell055"
        geometry={nodes.Heart_Full_cell055.geometry}
        material={materials.Red}
        position={[1.756, -0.173, -0.021]}
      />
      <mesh
        name="Heart_Full_cell056"
        geometry={nodes.Heart_Full_cell056.geometry}
        material={materials.Red}
        position={[2.094, 0.196, 0.322]}
      />
      <mesh
        name="Heart_Full_cell057"
        geometry={nodes.Heart_Full_cell057.geometry}
        material={materials.Red}
        position={[1.311, -0.325, -0.793]}
      />
      <mesh
        name="Heart_Full_cell058"
        geometry={nodes.Heart_Full_cell058.geometry}
        material={materials.Red}
        position={[1.014, 0.198, -0.907]}
      />
      <mesh
        name="Heart_Full_cell059"
        geometry={nodes.Heart_Full_cell059.geometry}
        material={materials.Red}
        position={[0.058, -1.96, 0.009]}
      />
      <mesh
        name="Heart_Full_cell060"
        geometry={nodes.Heart_Full_cell060.geometry}
        material={materials.Red}
        position={[-1.442, -0.14, -0.92]}
      />
      <mesh
        name="origin"
        geometry={nodes.origin.geometry}
        material={materials.Red}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      />
    </group>
  );
};

useGLTF.preload('/models/heart.glb');

export default Heart;