import {
  ContactShadows,
  Environment,
  OrbitControls
} from '@react-three/drei';
import { useAtom } from 'jotai';
import { charactersAtom } from './SocketManager';
import { AnimatedWoman } from './AnimatedWoman';

const Experience = () => {
  const [characters] = useAtom(charactersAtom);

  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.3} />
      <ContactShadows blur={2} />
      <OrbitControls />

      {characters.map((character) => {
        return (
          <AnimatedWoman
            key={character.id}
            position={character.position}
            hairColor={character.hairColor}
            topColor={character.topColor}
            bottomColor={character.bottomColor}
          />
        );
      })}
    </>
  );
};

export default Experience;
