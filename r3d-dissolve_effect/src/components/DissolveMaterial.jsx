/**
 * Imported from https://twitter.com/0xca0a?s=20
 * https://twitter.com/0xca0a/status/1678071371274809346?s=20
 *
 */

import * as THREE from 'three';
import * as React from 'react';
import CSM from 'three-custom-shader-material';
import { patchShaders } from 'gl-noise';

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
  }
`;

const fragmentShader = patchShaders(/* glsl */ `
  varying vec2 vUv;

  uniform float uThickness;
  uniform vec3 uColor;   

  void main() {
    gln_tFBMOpts opts = gln_tFBMOpts(1.0, 0.3, 2.0, 5.0, 1.0, 5, false, false);
    float noise = gln_sfbm(vUv, opts);
    noise = gln_normalize(noise);

    float progress = 0.5;

    float alpha = step(1.0 - progress, noise);
    float border = step((1.0 - progress) - uThickness, noise) - alpha;
    
    csm_DiffuseColor.a = alpha + border;
    csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, uColor, border);
  }
`);

const o = new THREE.Object3D();
o.position.set(-2, 1, 0);
o.scale.setScalar(0.5);
o.updateMatrixWorld();

const uniforms = {
  uMatrix: { value: o.matrixWorld },
  uFeather: { value: 6 },
  uThickness: { value: 0.1 },
  uColor: { value: new THREE.Color('#eb5a13').multiplyScalar(20) }
};

export function DissolveMaterial({
  baseMaterial,
  thickness = 0.1,
  feather = 6,
  color = '#eb5a13',
  intensity = 50
}) {
  React.useEffect(() => {
    uniforms.uFeather.value = feather;
    uniforms.uThickness.value = thickness;
    uniforms.uColor.value.set(color).multiplyScalar(intensity);
  }, [feather, thickness, color, intensity]);

  return (
    <>
      <CSM
        baseMaterial={baseMaterial}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        toneMapped={false}
        transparent
      />
    </>
  );
}
