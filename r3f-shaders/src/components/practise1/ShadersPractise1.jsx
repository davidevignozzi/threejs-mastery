import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

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

const ShadersPractise1 = () => {
  return (
    <group>
      <mesh>
        <planeGeometry />
        <practise1ShaderMaterial />
      </mesh>
    </group>
  );
};

export default ShadersPractise1;
