import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const Practise1ShaderMaterial = shaderMaterial(
  /**
   * Uniforms
   */
  {
    uTime: 0,
    uFrequency: new THREE.Vector2(10, 5),
    uColor: new THREE.Color('orange')
  },

  /**
   * Vertex Shader
   */
  vertexShader,

  /**
   * Fragment Shader
   */
  fragmentShader
);

extend({ Practise1ShaderMaterial });

export default Practise1ShaderMaterial;
