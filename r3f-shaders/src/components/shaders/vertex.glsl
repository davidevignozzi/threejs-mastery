// ? modelMatrix apply transformation realtive to the mesh (postion,rotation, scale)

// ? viewMatrix apply transformations realtive to the camera (position, rotation, field of view, near, far)

// ? projectionMatrix transform the coordinates into the clip space coordinates

// ? viewMatrix and the modelMatrix are combined into a modelViewMatrix 

// ? -- Uniforms -- are a way to send data from the JavaScript to the shader.
uniform vec2 uFrequency;
uniform float uTime;

// ? -- Attributes -- values that change between each vertex
attribute float aRandom;

// ? -- Varying -- We can send data from the vertex shader to the fragment shader using varying.
// varying float vRandom;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // * Flag effect -- Start
    // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    modelPosition.z += sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    modelPosition.z += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
    // * Flag effect -- End

    // modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 

    gl_Position = projectionPosition;

    // ? put the aRandom value in vRandom to pass it to the fragment shader
    // vRandom = aRandom;
}
   