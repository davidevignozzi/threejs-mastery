import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';

const Practise1ShaderMaterial = shaderMaterial(
  /**
   * Uniforms
   */
  {},

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
