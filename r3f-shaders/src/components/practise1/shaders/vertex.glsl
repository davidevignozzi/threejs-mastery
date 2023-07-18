// ? modelMatrix apply transformation realtive to the mesh (postion,rotation, scale)

// ? viewMatrix apply transformations realtive to the camera (position, rotation, field of view, near, far)

// ? projectionMatrix transform the coordinates into the clip space coordinates

// ? viewMatrix and the modelMatrix are combined into a modelViewMatrix 

// ? -- Attributes are values that change between each vertex
attribute float aRandom;

void main() {

    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // * Flag effect -- Start
    // modelPosition.z += sin(modelPosition.x * 10.0) * 0.1;
    modelPosition.z += aRandom * 0.1;
    // * Flag effect -- End

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 

    gl_Position = projectionPosition;
}
   