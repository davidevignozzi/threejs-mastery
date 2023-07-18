import { extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';

const Practise1ShaderMaterial = shaderMaterial(
  /**
   * Uniforms
   */
  {},

  /**
   * Vertex Shader
   */
  /* glsl */
  `
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);  
      }
    `,

  /**
   * Fragment Shader
   */
  /* glsl */
  `
      void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
      }
    `
);

extend({ Practise1ShaderMaterial });

export default Practise1ShaderMaterial;
