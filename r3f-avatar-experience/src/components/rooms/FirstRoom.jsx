import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';

const FirstRoom = () => {
  const firstRoom = useGLTF('/models/RoomStart.glb');
  return (
    <RigidBody type="fixed" friction={1}>
      <primitive object={firstRoom.scene} />
    </RigidBody>
  );
};

export default FirstRoom;
