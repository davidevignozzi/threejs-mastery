import React from 'react';
import * as THREE from 'three';
import Room from './Room';

const experiences = [
  // Boolean
  {
    name: 'boolean',
    type: 'education',
    roomWallMaterial: new THREE.MeshStandardMaterial({ color: '#ffffff' }),
    roomGroundMaterial: new THREE.MeshStandardMaterial({ color: '#f0f0f0' }),
    lightColor: '#d990b8'
  },

  // Everis
  {
    name: 'everis',
    type: 'job',
    roomWallMaterial: new THREE.MeshStandardMaterial({ color: '#ffffff' }),
    roomGroundMaterial: new THREE.MeshStandardMaterial({ color: '#f0f0f0' }),
    lightColor: '#d990b8'
  }
];

const Hall = () => {
  return (
    <>
      {experiences.map((room, i) => {
        return (
          <Room
            key={i}
            positionZ={i}
            roomWallMaterial={room.roomWallMaterial}
            roomGroundMaterial={room.roomGroundMaterial}
            lightColor={room.lightColor}
          />
        );
      })}
    </>
  );
};

export default Hall;
