import React, { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import { Box, Image, Text } from '@react-three/drei';
import Lights from './Lights';

const Ground = ({ positionZ = 0, material }) => {
  return (
    <RigidBody type="fixed" friction={1.5}>
      <Box args={[6, 0.25, 8]} position={[0, 0, positionZ * 8]} material={material} receiveShadow />
    </RigidBody>
  );
};

const Wall = ({ positionZ = 0, material, timeline, logo }) => {
  const wallRef = useRef();
  const imageRef = useRef();

  return (
    <RigidBody type="fixed">
      <Box
        ref={wallRef}
        args={[0.25, 4, 8]}
        position={[2.875, 2.125, positionZ * 8]}
        material={material}
        castShadow
      />

      {/* LOGO */}
      <Image
        ref={imageRef}
        url="/images/booleanLogo.png"
        opacity={1}
        position={[2.725, 3.275, positionZ * 8 - 1.5]}
        rotation={[0, Math.PI * -0.5, 0]}
        scale={[4, 0.9]}
        receiveShadow
        attach={wallRef.current}
      />

      {/* TIMELINE */}
      <Text
        position={[0, 0.1275, positionZ * 8 - 3.75]}
        rotation={[Math.PI / 2, Math.PI, 0]}
        attach={wallRef.current}
        fontSize={0.35}
        anchorX={2.675}
        color="#051531"
      >
        {timeline}
      </Text>
    </RigidBody>
  );
};

const Room = ({
  positionZ = 0,
  roomGroundMaterial,
  roomWallMaterial,
  lightColor,
  logo,
  timeline
}) => {
  console.log(logo);
  return (
    <>
      <Ground positionZ={positionZ} material={roomGroundMaterial} />
      <Wall positionZ={positionZ} material={roomWallMaterial} logo={logo} timeline={timeline} />

      {/* Light */}
      <Lights positionZ={positionZ} color={lightColor} />
    </>
  );
};

export default Room;
