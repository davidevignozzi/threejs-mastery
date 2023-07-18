// ? -- Uniforms -- are a way to send data from the JavaScript to the shader.
uniform vec3 uColor;

// ? -- Varying -- We can send data from the vertex shader to the fragment shader using varying.
// varying float vRandom;

void main() {
    // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    // gl_FragColor = vec4(0.5, vRandom, 1.0, 1.0);

    gl_FragColor = vec4(uColor, 1.0);

}